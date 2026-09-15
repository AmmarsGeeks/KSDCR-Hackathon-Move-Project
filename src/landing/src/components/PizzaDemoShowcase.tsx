import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { VisionCanvas } from './VisionCanvas';
import { PoseDetector } from '../lib/poseEngine';
import { ExerciseTracker, evaluateAttireOcclusion } from '../lib/exercises';
import type { ExerciseMetrics, OcclusionConfidence, PoseLandmarks } from '../lib/types';
import { soundFX } from '../lib/audioCoach';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ArrowRight, Sparkles, CheckCircle2, ChevronLeft } from 'lucide-react';

interface PizzaDemoShowcaseProps {
  lang?: 'en' | 'ar';
  onBack?: () => void;
}

export const PizzaDemoShowcase: React.FC<PizzaDemoShowcaseProps> = ({ lang = 'en', onBack }) => {
  const isAr = lang === 'ar';

  // Video & Playback State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [reps, setReps] = useState(0);
  const [stage, setStage] = useState<'rest' | 'apart' | 'together' | 'ready'>('rest');
  const [imageIndex, setImageIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Audio Coach state (Silma AI)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Real-time Pose & Occlusion
  const [landmarks, setLandmarks] = useState<PoseLandmarks | null>(null);
  const [occlusion, setOcclusion] = useState<OcclusionConfidence>({
    overallScore: 89,
    shoulderConfidence: 96,
    elbowConfidence: 92,
    wristConfidence: 94,
    hipConfidence: 80,
    kneeConfidence: 75,
    attireType: 'thobe_standard',
    isDegraded: false,
    compensating: true
  });

  const poseDetectorRef = useRef<PoseDetector | null>(null);
  const trackerRef = useRef<ExerciseTracker>(new ExerciseTracker('band_pull'));

  const TARGET_REPS = 10;
  const REP_INTERVAL = 3.2;

  useEffect(() => {
    trackerRef.current = new ExerciseTracker('band_pull');

    poseDetectorRef.current = new PoseDetector((lms, timestamp) => {
      setLandmarks(lms);
      trackerRef.current.process(lms, timestamp);
      const computedOcclusion = evaluateAttireOcclusion(lms, 'thobe_standard');
      setOcclusion(computedOcclusion);
    });

    return () => {
      if (poseDetectorRef.current) {
        poseDetectorRef.current.stop();
      }
    };
  }, []);

  // Handle Video Frame & Synchronize Interactive Game Mechanics
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const currentTime = video.currentTime;
    const progress = (currentTime / video.duration) * 100;
    setVideoProgress(progress);

    const computedReps = Math.min(Math.floor(currentTime / REP_INTERVAL), TARGET_REPS);

    const repPhase = (currentTime % REP_INTERVAL) / REP_INTERVAL;
    if (repPhase < 0.25) {
      setStage('rest');
    } else if (repPhase < 0.5) {
      setStage('apart');
    } else if (repPhase < 0.75) {
      setStage('together');
    } else {
      setStage('ready');
    }

    if (computedReps !== reps && computedReps > 0) {
      setReps(computedReps);
      soundFX.playRepChime();

      const newImgIdx = Math.min(Math.floor(computedReps / 2), 5);
      setImageIndex(newImgIdx);

      if (computedReps >= TARGET_REPS && !isCompleted) {
        setIsCompleted(true);
        soundFX.playCelebration();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  }, [reps, isCompleted]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = '/videos/pizza-demo.mp4';
      video.loop = true;
      video.ontimeupdate = handleTimeUpdate;
      video.play().catch(e => console.log('Auto-play prevented:', e));
      poseDetectorRef.current?.setVideoSource(video, false, 'band_pull');
    }
  }, [handleTimeUpdate]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
      setIsPlaying(true);
    }
    setReps(0);
    setImageIndex(0);
    setIsCompleted(false);
    setStage('rest');
  };

  const toggleAudioCoach = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/knead.wav');
      audioRef.current.onended = () => setIsPlayingAudio(false);
      audioRef.current.onerror = () => setIsPlayingAudio(false);
    }

    if (isPlayingAudio) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingAudio(false);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.warn('Audio play error:', err));
      setIsPlayingAudio(true);
    }
  };

  const progressPercentage = Math.min((reps / TARGET_REPS) * 100, 100);

  const mockMetrics: ExerciseMetrics = {
    reps,
    stage,
    currentAngle: stage === 'apart' ? 145 : 80,
    targetAngle: 140,
    romPercentage: Math.min((reps / TARGET_REPS) * 100, 100),
    tempoScore: 94,
    formFeedback: stage === 'apart' ? 'Perfect Extension!' : 'Keep elbows level',
    speedFeedback: 'Good Form!',
    isGoodForm: true,
    timeInRep: 2.1
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4">
      {/* Top Bar with Controls and Back Link */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
              title={isAr ? 'العودة للاستوديو' : 'Back to Studio'}
            >
              <ChevronLeft className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black tracking-wider uppercase text-emerald-400">
                {isAr ? 'عرض توضيحي مباشر: لعبة البيتزا التأهيلية' : 'LIVE SHOWCASE: PIZZA PURSUIT REHAB'}
              </span>
              <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono px-2 py-0.5 rounded-full">
                {isAr ? 'محاكاة حركية متزامنة 100%' : '100% Real-Time Motion Sync'}
              </span>
            </div>
            <h3 className="text-lg font-black text-white mt-0.5">
              {isAr ? 'المرحلة الأولى: عجن العجينة (تمارين سحب شريط المقاومة)' : 'Level 1: Knead the Dough (Resistance Band Pulls)'}
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleAudioCoach}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold font-mono flex items-center gap-2 transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-500 border-amber-400 text-black animate-pulse shadow-lg'
                : 'bg-emerald-950 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isAr ? 'التوجيه الصوتي (سيلما AI)' : 'Voice Coach (Silma AI)'}</span>
          </button>

          <button
            onClick={togglePlay}
            className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Demo' : 'Play Demo'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors cursor-pointer"
            title="Restart Session"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Retro Split Container matching PTplay Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-4 border-black bg-neutral-900 shadow-2xl overflow-hidden">
        {/* Left Container (60% width) - Interactive Pizza Image Graphics */}
        <div className="lg:col-span-7 bg-[rgba(5,150,105,0.08)] p-8 flex flex-col items-center justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-black min-h-[460px] relative">
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            <img
              key={imageIndex}
              src={`/images/knead${imageIndex}.png`}
              alt="Knead Pizza Dough"
              className="max-h-[380px] w-auto object-contain transition-transform duration-300 transform scale-100 hover:scale-105"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-black/80 px-4 py-1.5 border border-emerald-500/40">
              {isAr ? `المرحلة الحركية ${imageIndex + 1} من 6` : `Dough Transformation Stage ${imageIndex + 1} of 6`}
            </span>
          </div>

          {/* Video Timeline Progress */}
          <div className="absolute bottom-2 left-4 right-4 h-1.5 bg-black/50 overflow-hidden rounded">
            <div
              className="h-full bg-emerald-500 transition-all duration-200"
              style={{ width: `${videoProgress}%` }}
            />
          </div>
        </div>

        {/* Right Container (40% width) - Video Feed on Top, Instructions & Progress on Bottom */}
        <div className="lg:col-span-5 bg-[#090d16] flex flex-col justify-between">
          {/* Top Half: Real Video Feed with Live Skeletal Overlays */}
          <div className="h-[270px] border-b-4 border-black relative bg-black flex items-center justify-center p-2">
            <div className="w-full h-full relative border-2 border-emerald-600/60 overflow-hidden shadow-inner">
              <VisionCanvas
                landmarks={landmarks}
                metrics={mockMetrics}
                occlusion={occlusion}
                videoRef={videoRef}
                lang={lang}
                mirrored={false}
              />
            </div>
          </div>

          {/* Bottom Half: Instructions, Progress Bar, Next Level Button, Large Counter */}
          <div className="p-5 flex flex-col justify-between flex-1 gap-3">
            {/* Box 1: On-Screen Instructions */}
            <div className="bg-black/60 border-2 border-neutral-700 p-2.5 text-xs text-neutral-300 text-center leading-relaxed">
              <p>
                {isAr
                  ? 'اتبع التعليمات الظاهرة على الشاشة وراقب حركتك عبر الكاميرا. أكمل التكرارات للانتقال للمرحلة التالية.'
                  : 'follow the on-screen instructions and watch your video feedback. complete the exercise to advance.'}
              </p>
            </div>

            {/* Box 2: Specific Exercise Action */}
            <div className="bg-emerald-950/40 border-2 border-emerald-500/40 p-3 text-xs text-emerald-200 text-center font-bold leading-relaxed shadow-sm">
              <p>
                {isAr
                  ? 'لنبدأ بعجن العجينة! استخدم شريط المقاومة واسحب مرفقيك للخارج، واثبت لمدة ٣ ثوانٍ، ثم أعدهما معاً.'
                  : "let's start by kneading the dough! use a resistance band and pull your elbows apart, hold for 3 seconds, then bring them back together."}
              </p>
            </div>

            {/* Progress Bar Container matching PTplay */}
            <div className="space-y-1">
              <div className="w-full h-8 bg-neutral-800 border-2 border-black overflow-hidden relative shadow-inner">
                <div
                  className="h-full bg-[#059669] flex items-center justify-center text-xs font-black text-white transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                >
                  {reps} / {TARGET_REPS}
                </div>
              </div>
            </div>

            {/* Level Unlock Indicator */}
            {isCompleted ? (
              <div className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-black text-xs uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 animate-bounce">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? 'تم إتمام المرحلة بنجاح! أحسنت' : 'Stage Completed! Next Level Unlocked'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            ) : (
              <div className="text-center py-2 text-xs text-neutral-400 flex items-center justify-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>{isAr ? 'أكمل ١٠ تكرارات لفرد وتدوير العجينة' : 'Complete 10 reps to knead dough & advance'}</span>
              </div>
            )}

            {/* Large Counter Display */}
            <div className="flex justify-between items-center bg-black border-2 border-black p-3">
              <div>
                <div className="text-[10px] text-neutral-400 uppercase font-bold">
                  {isAr ? 'العداد' : 'Counter'}
                </div>
                <div className="text-3xl font-black text-white font-mono leading-none">
                  {reps}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-neutral-400 uppercase font-bold">
                  {isAr ? 'حالة الحركة' : 'STAGE'}
                </div>
                <div className="text-lg font-black text-emerald-400 uppercase">
                  {stage}
                </div>
              </div>

              <div className="text-right border-l border-neutral-800 pl-3">
                <div className="text-[10px] text-neutral-400 uppercase font-bold">
                  {isAr ? 'ثقة التتبع' : 'OCCLUSION'}
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
