import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { VisionCanvas } from './VisionCanvas';
import { PoseDetector } from '../lib/poseEngine';
import { ExerciseTracker, evaluateAttireOcclusion } from '../lib/exercises';
import type { ExerciseId, ExerciseMetrics, OcclusionConfidence, PoseLandmarks } from '../lib/types';
import { soundFX, speakFeedback } from '../lib/audioCoach';
import { Camera, Sparkles, RotateCcw, ArrowRight, Volume2, VolumeX } from 'lucide-react';

interface PizzaGameProps {
  lang?: 'en' | 'ar';
}

interface LevelConfig {
  id: number;
  slug: string;
  nameEn: string;
  nameAr: string;
  exerciseId: ExerciseId;
  simType: string;
  maxFrames: number;
  targetReps: number;
  instruction1En: string;
  instruction1Ar: string;
  instruction2En: string;
  instruction2Ar: string;
  audioSrc: string;
}

const LEVELS: LevelConfig[] = [
  {
    id: 0,
    slug: 'knead',
    nameEn: '1. Knead the Dough',
    nameAr: '١. عجن العجينة',
    exerciseId: 'band_pull',
    simType: 'band_pull',
    maxFrames: 5,
    targetReps: 10,
    instruction1En: 'follow the on-screen instructions and watch your video feedback. complete the exercise to advance.',
    instruction1Ar: 'اتبع التعليمات الظاهرة على الشاشة وراقب حركتك عبر الكاميرا. أكمل التكرارات للانتقال للمرحلة التالية.',
    instruction2En: "let's start by kneading the dough! use a resistance band and pull your elbows apart, hold for 3 seconds, then bring them back together.",
    instruction2Ar: 'لنبدأ بعجن العجينة! استخدم شريط المقاومة واسحب مرفقيك للخارج، واثبت لمدة ٣ ثوانٍ، ثم أعدهما معاً.',
    audioSrc: '/audio/knead.wav'
  },
  {
    id: 1,
    slug: 'roll',
    nameEn: '2. Toss & Roll',
    nameAr: '٢. فرد وتدوير العجينة',
    exerciseId: 'lat_raise',
    simType: 'lat_raise',
    maxFrames: 5,
    targetReps: 10,
    instruction1En: 'raise your arms to stretch the dough into a perfect circular crust.',
    instruction1Ar: 'ارفع ذراعيك جانبياً لتمديد وفرد العجينة بشكل دائري متناسق.',
    instruction2En: 'perform lateral raises! raise both arms out to the sides up to shoulder height, hold briefly, then lower with control.',
    instruction2Ar: 'قم بتمارين الرفع الجانبي! ارفع ذراعيك إلى مستوى الكتفين، واثبت قليلاً، ثم اخفضهما بتمهل.',
    audioSrc: '/audio/roll.wav'
  },
  {
    id: 2,
    slug: 'sauce',
    nameEn: '3. Spread the Sauce',
    nameAr: '٣. فرد صلصة الطماطم',
    exerciseId: 'lat_raise',
    simType: 'hooks',
    maxFrames: 5,
    targetReps: 10,
    instruction1En: 'spread the rich tomato sauce across the freshly tossed crust.',
    instruction1Ar: 'قم بتوزيع صلصة الطماطم الغنية بحركات دائرية ناعمة على كامل العجينة.',
    instruction2En: 'make wide, smooth circular stirring motions with your arms to spread the sauce evenly from center to edge.',
    instruction2Ar: 'حرك ذراعيك بحركات دائرية واسعة وسلسة لتوزيع الصلصة بالتساوي من المركز إلى الأطراف.',
    audioSrc: '/audio/sauce.wav'
  },
  {
    id: 3,
    slug: 'cheese',
    nameEn: '4. Sprinkle Mozzarella',
    nameAr: '٤. رش جبن الموزاريلا',
    exerciseId: 'bicep_curl_left',
    simType: 'bicep_curl_left',
    maxFrames: 5,
    targetReps: 10,
    instruction1En: 'time to add the fresh mozzarella cheese evenly over the sauce.',
    instruction1Ar: 'حان وقت نثر جبن الموزاريلا الطازج فوق الصلصة.',
    instruction2En: 'left arm bicep curls! curl your left arm up towards your shoulder to sprinkle cheese, then fully extend down.',
    instruction2Ar: 'ثني الذراع الأيسر! اثنِ ذراعك الأيسر نحو كتفك لرش الجبن، ثم مدّه للأسفل بالكامل.',
    audioSrc: '/audio/cheese.wav'
  },
  {
    id: 4,
    slug: 'toppings',
    nameEn: '5. Place the Toppings',
    nameAr: '٥. إضافة الحشوات والمكونات',
    exerciseId: 'bicep_curl_right',
    simType: 'bicep_curl_right',
    maxFrames: 5,
    targetReps: 10,
    instruction1En: 'decorate your pizza with mushrooms, peppers, and savory toppings.',
    instruction1Ar: 'زيّن البيتزا بالفطر والفلفل والمكونات اللذيذة.',
    instruction2En: 'right arm bicep curls! curl your right arm smoothly up to your shoulder to place each topping with precision.',
    instruction2Ar: 'ثني الذراع الأيمن! اثنِ ذراعك الأيمن بنعومة نحو كتفك لوضع كل مكون بدقة.',
    audioSrc: '/audio/toppings.wav'
  },
  {
    id: 5,
    slug: 'oven',
    nameEn: '6. Bake in the Brick Oven',
    nameAr: '٦. الخبز في الفرن الحجري',
    exerciseId: 'punch',
    simType: 'punch',
    maxFrames: 5,
    targetReps: 10,
    instruction1En: 'slide the prepared pizza onto the peel and into the glowing brick oven.',
    instruction1Ar: 'مرر مجداف البيتزا لداخل الفرن الحجري الساخن لخبزها.',
    instruction2En: 'forward punches! extend your arms straight forward in punch motions to push the pizza into the baking chamber.',
    instruction2Ar: 'المد واللكم الأمامي! ادفع ذراعيك للأمام بحركات مستقيمة لدفع البيتزا داخل الفرن.',
    audioSrc: '/audio/oven.wav'
  },
  {
    id: 6,
    slug: 'cut',
    nameEn: '7. Slice into Portions',
    nameAr: '٧. تقطيع البيتزا لشرائح',
    exerciseId: 'slice',
    simType: 'slice',
    maxFrames: 6,
    targetReps: 10,
    instruction1En: 'hot out of the oven! cut the pizza into crispy, equal triangular slices.',
    instruction1Ar: 'خرجت ساخنة ومقرمشة! حان وقت تقطيعها إلى شرائح متساوية.',
    instruction2En: 'overhead downward slices! raise your arms high and swing down firmly to cut through the crust.',
    instruction2Ar: 'التقطيع من الأعلى للأسفل! ارفع ذراعيك عالياً واهبط بهما بقوة لتقطيع القشرة المقرمشة.',
    audioSrc: '/audio/cut.wav'
  },
  {
    id: 7,
    slug: 'eat',
    nameEn: '8. Feast & Celebrate!',
    nameAr: '٨. تذوق واحتفل بالإنجاز!',
    exerciseId: 'bicep_curl_left',
    simType: 'bicep_curl_left',
    maxFrames: 9,
    targetReps: 10,
    instruction1En: 'delicious work! celebrate your therapy completion with every bite.',
    instruction1Ar: 'عمل مذهل ومثمر! احتفل بإتمام تمارينك التأهيلية بكل فخر.',
    instruction2En: 'lift each warm slice to your mouth with celebratory curls to finish your daily rehabilitation session!',
    instruction2Ar: 'ارفع الشرائح اللذيذة نحو فمك بتمارين الثني لتختتم جلستك اليومية بنجاح!',
    audioSrc: '/audio/eat.wav'
  }
];

export const PizzaGame: React.FC<PizzaGameProps> = ({ lang = 'en' }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [feedMode, setFeedMode] = useState<'camera' | 'simulation'>('camera');
  const [attireType, setAttireType] = useState<OcclusionConfidence['attireType']>('thobe_standard');

  const currentLevel = LEVELS[currentLevelIdx];

  const [landmarks, setLandmarks] = useState<PoseLandmarks | null>(null);
  const [metrics, setMetrics] = useState<ExerciseMetrics>({
    reps: 0,
    stage: 'rest',
    currentAngle: 90,
    targetAngle: 90,
    romPercentage: 0,
    tempoScore: 90,
    formFeedback: 'Get in position',
    speedFeedback: 'Get Ready',
    isGoodForm: true,
    timeInRep: 0
  });

  const [occlusion, setOcclusion] = useState<OcclusionConfidence>({
    overallScore: 88,
    shoulderConfidence: 94,
    elbowConfidence: 90,
    wristConfidence: 92,
    hipConfidence: 78,
    kneeConfidence: 74,
    attireType: 'thobe_standard',
    isDegraded: false,
    compensating: true
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const poseDetectorRef = useRef<PoseDetector | null>(null);
  const trackerRef = useRef<ExerciseTracker>(new ExerciseTracker(currentLevel.exerciseId));
  const lastRepsRef = useRef<number>(0);

  // Audio Coach state (Silma AI)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentAudioTrack, setCurrentAudioTrack] = useState<string>('');
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = useCallback((src: string) => {
    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new Audio();
    }
    const player = audioPlayerRef.current;
    player.pause();
    player.src = src;
    player.currentTime = 0;
    setCurrentAudioTrack(src);
    setIsPlayingAudio(true);

    player.onended = () => {
      setIsPlayingAudio(false);
      setCurrentAudioTrack('');
    };
    player.onerror = () => {
      setIsPlayingAudio(false);
      setCurrentAudioTrack('');
    };

    player.play().catch(err => {
      console.warn('Audio play error:', err);
      setIsPlayingAudio(false);
    });
  }, []);

  const toggleLevelAudio = useCallback(() => {
    if (isPlayingAudio && currentAudioTrack === currentLevel.audioSrc) {
      audioPlayerRef.current?.pause();
      setIsPlayingAudio(false);
      setCurrentAudioTrack('');
    } else {
      playAudio(currentLevel.audioSrc);
    }
  }, [isPlayingAudio, currentAudioTrack, currentLevel.audioSrc, playAudio]);

  const toggleIntroAudio = useCallback(() => {
    if (isPlayingAudio && currentAudioTrack === '/audio/intro.wav') {
      audioPlayerRef.current?.pause();
      setIsPlayingAudio(false);
      setCurrentAudioTrack('');
    } else {
      playAudio('/audio/intro.wav');
    }
  }, [isPlayingAudio, currentAudioTrack, playAudio]);

  // Clean up audio on unmount or level change
  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
    };
  }, [currentLevelIdx]);

  // Initialize Pose Detector
  useEffect(() => {
    trackerRef.current = new ExerciseTracker(currentLevel.exerciseId);
    lastRepsRef.current = 0;

    poseDetectorRef.current = new PoseDetector((lms, timestamp) => {
      setLandmarks(lms);
      const m = trackerRef.current.process(lms, timestamp);
      setMetrics(m);

      const occ = evaluateAttireOcclusion(lms, attireType);
      setOcclusion(occ);
    });

    return () => {
      if (poseDetectorRef.current) {
        poseDetectorRef.current.stop();
      }
    };
  }, [currentLevel.exerciseId, attireType]);

  // Feed control
  const startFeed = useCallback(async (mode: 'camera' | 'simulation') => {
    setFeedMode(mode);
    const video = videoRef.current;
    if (!video) return;

    if (mode === 'camera') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
        });
        video.srcObject = stream;
        video.play();
        poseDetectorRef.current?.setVideoSource(video, false, currentLevel.simType);
      } catch (err) {
        console.warn('Webcam permission not granted, falling back to AI Sim:', err);
        setFeedMode('simulation');
        video.srcObject = null;
        video.pause();
        poseDetectorRef.current?.setVideoSource(video, true, currentLevel.simType);
      }
    } else {
      if (video.srcObject) {
        (video.srcObject as MediaStream).getTracks().forEach(t => t.stop());
        video.srcObject = null;
      }
      video.pause();
      poseDetectorRef.current?.setVideoSource(video, true, currentLevel.simType);
    }
  }, [currentLevel.simType]);

  useEffect(() => {
    startFeed(feedMode);
  }, [startFeed, feedMode]);

  // Sound effects on rep count
  useEffect(() => {
    if (metrics.reps > lastRepsRef.current) {
      soundFX.playRepChime();
      if (metrics.reps >= currentLevel.targetReps) {
        soundFX.playCelebration();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        speakFeedback('Level complete! Click Next Level to advance.', 'اكتملت المرحلة! اضغط على المرحلة التالية للاستمرار.', lang);
      }
      lastRepsRef.current = metrics.reps;
    }
  }, [metrics.reps, currentLevel.targetReps, lang]);

  const handleNextLevel = () => {
    trackerRef.current.reset();
    setMetrics(prev => ({ ...prev, reps: 0, stage: 'rest', romPercentage: 0 }));
    lastRepsRef.current = 0;
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
    } else {
      setCurrentLevelIdx(0);
    }
  };

  const handleResetCounter = () => {
    trackerRef.current.reset();
    setMetrics(prev => ({ ...prev, reps: 0, stage: 'rest', romPercentage: 0 }));
    lastRepsRef.current = 0;
  };

  // Image progression logic: PTplay maps counter to image index (0 to maxFrames)
  const imageIndex = Math.min(
    currentLevel.maxFrames,
    Math.floor((metrics.reps / currentLevel.targetReps) * currentLevel.maxFrames)
  );
  const currentImageSrc = `/images/${currentLevel.slug}${imageIndex}.png`;
  const isLevelCompleted = metrics.reps >= currentLevel.targetReps;
  const progressPercentage = Math.min(100, Math.round((metrics.reps / currentLevel.targetReps) * 100));

  return (
    <div className="w-full bg-[#0d1522] border-4 border-black rounded-none shadow-[8px_8px_0px_#000000] text-white my-6 overflow-hidden font-mono">
      {/* Top Retro Navbar */}
      <div className="bg-[#059669] border-b-4 border-black px-6 py-3 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-black text-emerald-400 px-3 py-1 font-black text-sm tracking-widest border border-emerald-400">
            MOVE AI
          </div>
          <span className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider">
            {lang === 'ar' ? 'رحلة البيتزا العلاجية — بيتزا بيرسوت' : 'Pizza Pursuit Therapy Quest'}
          </span>
        </div>

        {/* Controls: Live Cam vs AI Sim + Attire Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Feed Switcher */}
          <div className="flex items-center bg-black/50 p-1 border-2 border-black">
            <button
              onClick={() => startFeed('camera')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold transition-all ${
                feedMode === 'camera'
                  ? 'bg-emerald-500 text-black shadow'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              Live Cam
            </button>
            <button
              onClick={() => startFeed('simulation')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold transition-all ${
                feedMode === 'simulation'
                  ? 'bg-emerald-500 text-black shadow'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Sim
            </button>
          </div>

          {/* Attire Selection */}
          <select
            value={attireType}
            onChange={(e) => setAttireType(e.target.value as OcclusionConfidence['attireType'])}
            className="bg-black text-emerald-300 border-2 border-black text-xs font-bold px-2 py-1.5 cursor-pointer"
          >
            <option value="thobe_standard">Saudi Thobe (الثوب)</option>
            <option value="abaya_flowing">Flowing Abaya (العباءة)</option>
            <option value="hijab_loose">Hijab (الحجاب)</option>
            <option value="standard_gym">Standard Gym Fit</option>
          </select>

          {/* Reset */}
          <button
            onClick={handleResetCounter}
            title="Reset Counter"
            className="bg-black text-white p-1.5 border-2 border-black hover:bg-neutral-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Level Selection Bar */}
      <div className="bg-[#090d16] border-b-2 border-black px-4 py-2 flex overflow-x-auto gap-2 text-xs">
        {LEVELS.map((lvl, idx) => (
          <button
            key={lvl.id}
            onClick={() => {
              setCurrentLevelIdx(idx);
              trackerRef.current.reset();
              setMetrics(prev => ({ ...prev, reps: 0, stage: 'rest' }));
              lastRepsRef.current = 0;
            }}
            className={`px-3 py-1 whitespace-nowrap font-bold border-2 transition-all ${
              currentLevelIdx === idx
                ? 'bg-[#059669] text-white border-black shadow-[2px_2px_0px_#000]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            {lang === 'ar' ? lvl.nameAr : lvl.nameEn}
          </button>
        ))}
      </div>

      {/* Main Split Body matching PTplay knead.html layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[550px]">
        {/* Left Container (60% width on desktop) - The Live Pizza Pixel Art Graphic */}
        <div className="lg:col-span-7 bg-[#0a121e] border-b-4 lg:border-b-0 lg:border-r-4 border-black p-6 flex flex-col items-center justify-center relative">
          <div className="w-full max-w-[500px] aspect-square flex items-center justify-center p-4 bg-black/30 border-4 border-black shadow-[6px_6px_0px_#000]">
            <img
              src={currentImageSrc}
              alt="Pizza Exercise Stage"
              className="max-w-full max-h-full object-contain pixelated"
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-black/60 px-3 py-1 border border-emerald-500/40">
              {lang === 'ar' ? currentLevel.nameAr : currentLevel.nameEn} — {lang === 'ar' ? `المرحلة ${imageIndex + 1} من ${currentLevel.maxFrames + 1}` : `Stage ${imageIndex + 1} of ${currentLevel.maxFrames + 1}`}
            </span>
          </div>
        </div>

        {/* Right Container (40% width) - Video Feed on Top, Instructions & Progress on Bottom */}
        <div className="lg:col-span-5 bg-[#090d16] flex flex-col justify-between">
          {/* Top Half: Video Feed with Skeleton & Angle HUD */}
          <div className="h-[260px] border-b-4 border-black relative bg-black flex items-center justify-center p-2">
            <div className="w-full h-full relative border-2 border-emerald-600/60 overflow-hidden shadow-inner">
              <VisionCanvas
                landmarks={landmarks}
                metrics={metrics}
                occlusion={occlusion}
                videoRef={videoRef}
                lang={lang}
              />
            </div>
          </div>

          {/* Bottom Half: Instructions, Progress Bar, Next Level Button, Counter */}
          <div className="p-5 flex flex-col justify-between flex-1 gap-3">
            {/* Box 1: On-Screen Instructions */}
            <div className="bg-black/60 border-2 border-neutral-700 p-2.5 text-xs text-neutral-300 text-center leading-relaxed">
              <p>{lang === 'ar' ? currentLevel.instruction1Ar : currentLevel.instruction1En}</p>
            </div>

            {/* Box 2: Specific Exercise Action */}
            <div className="bg-emerald-950/40 border-2 border-emerald-500/40 p-3 text-xs text-emerald-200 text-center font-bold leading-relaxed shadow-sm">
              <p>{lang === 'ar' ? currentLevel.instruction2Ar : currentLevel.instruction2En}</p>
            </div>

            {/* Audio Voice Coach (Silma AI) - Listen & Repeat Anytime */}
            <div className="flex gap-2">
              <button
                onClick={toggleLevelAudio}
                className={`flex-1 py-2.5 px-3 border-2 border-black flex items-center justify-center gap-2 text-xs font-bold font-mono transition-all cursor-pointer ${
                  isPlayingAudio && currentAudioTrack === currentLevel.audioSrc
                    ? 'bg-amber-400 text-black shadow-[2px_2px_0px_#000] animate-pulse'
                    : 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-[2px_2px_0px_#000]'
                }`}
                title={lang === 'ar' ? 'استمع لشرح تمرين المرحلة عبر نموذج سيلما' : 'Listen to exercise instructions via Silma TTS'}
              >
                {isPlayingAudio && currentAudioTrack === currentLevel.audioSrc ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
                <span>
                  {isPlayingAudio && currentAudioTrack === currentLevel.audioSrc
                    ? (lang === 'ar' ? 'إيقاف الصوت' : 'Stop Audio')
                    : (lang === 'ar' ? '🔊 استمع للشرح (سيلما)' : '🔊 Audio Coach (Silma)')}
                </span>
              </button>

              <button
                onClick={toggleIntroAudio}
                className={`px-3 py-2.5 border-2 border-black flex items-center justify-center gap-1.5 text-xs font-bold font-mono transition-all cursor-pointer ${
                  isPlayingAudio && currentAudioTrack === '/audio/intro.wav'
                    ? 'bg-amber-400 text-black shadow-[2px_2px_0px_#000] animate-pulse'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 shadow-[2px_2px_0px_#000]'
                }`}
                title={lang === 'ar' ? 'استمع للنبذة التعريفية للعبة' : 'Listen to game intro'}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'عن اللعبة' : 'About'}</span>
              </button>
            </div>

            {/* Progress Bar Container matching PTplay */}
            <div className="space-y-1">
              <div className="w-full h-8 bg-neutral-800 border-2 border-black overflow-hidden relative shadow-inner">
                <div
                  className="h-full bg-[#059669] flex items-center justify-center text-xs font-black text-white transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                >
                  {metrics.reps} / {currentLevel.targetReps}
                </div>
              </div>
            </div>

            {/* Next Level Button (Visible when completed) */}
            {isLevelCompleted ? (
              <button
                onClick={handleNextLevel}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-sm uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_#000] transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 animate-bounce cursor-pointer"
              >
                <span>{lang === 'ar' ? 'المرحلة التالية' : 'Next Level'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="text-center py-2 text-xs text-neutral-500 flex items-center justify-center gap-1.5 font-bold">
                <span>{lang === 'ar' ? 'أكمل التكرارات لفتح المرحلة التالية' : 'Complete reps to unlock next level'}</span>
              </div>
            )}

            {/* Large Counter Display */}
            <div className="flex justify-between items-center bg-black border-2 border-black p-3">
              <div>
                <div className="text-[10px] text-neutral-400 uppercase font-bold">
                  {lang === 'ar' ? 'العداد' : 'Counter'}
                </div>
                <div className="text-3xl font-black text-white font-mono leading-none">
                  {metrics.reps}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-neutral-400 uppercase font-bold">
                  {lang === 'ar' ? 'حالة الحركة' : 'STAGE'}
                </div>
                <div className="text-lg font-black text-emerald-400 uppercase">
                  {metrics.stage}
                </div>
              </div>

              <div className="text-right border-l border-neutral-800 pl-3">
                <div className="text-[10px] text-neutral-400 uppercase font-bold">
                  {lang === 'ar' ? 'ثقة التتبع' : 'OCCLUSION'}
                </div>
                <div className="text-sm font-black text-amber-400 font-mono">
                  {occlusion.overallScore}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
