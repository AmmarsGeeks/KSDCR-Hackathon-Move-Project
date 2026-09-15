import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VisionCanvas } from './VisionCanvas';
import { PracticeStudioView } from './PracticeStudioView';
import { AttireOcclusionHUD } from './AttireOcclusionHUD';
import { PoseDetector } from '../lib/poseEngine';
import { ExerciseTracker, evaluateAttireOcclusion } from '../lib/exercises';
import type { ExerciseMetrics, OcclusionConfidence, PoseLandmarks } from '../lib/types';
import { soundFX } from '../lib/audioCoach';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ChevronLeft, Activity } from 'lucide-react';

interface MovementDemoShowcaseProps {
  lang?: 'en' | 'ar';
  onBack?: () => void;
}

export const MovementDemoShowcase: React.FC<MovementDemoShowcaseProps> = ({ lang = 'en', onBack }) => {
  const isAr = lang === 'ar';

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [reps, setReps] = useState(0);
  const [stage, setStage] = useState<'up' | 'down' | 'rest' | 'ready'>('rest');
  const [currentAngle, setCurrentAngle] = useState(160);

  // Audio Coach (Silma AI)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [landmarks, setLandmarks] = useState<PoseLandmarks | null>(null);
  const [occlusion, setOcclusion] = useState<OcclusionConfidence>({
    overallScore: 88,
    shoulderConfidence: 95,
    elbowConfidence: 91,
    wristConfidence: 93,
    hipConfidence: 78,
    kneeConfidence: 74,
    attireType: 'thobe_standard',
    isDegraded: false,
    compensating: true
  });

  const poseDetectorRef = useRef<PoseDetector | null>(null);
  const trackerRef = useRef<ExerciseTracker>(new ExerciseTracker('bicep_curl_left'));

  const REP_INTERVAL = 3.8;

  useEffect(() => {
    trackerRef.current = new ExerciseTracker('bicep_curl_left');

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

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const currentTime = video.currentTime;
    const progress = (currentTime / video.duration) * 100;
    setVideoProgress(progress);

    // Calculate angle oscillation: from ~165° (extended) down to ~35° (flexed)
    const cycleTime = currentTime % REP_INTERVAL;
    const norm = cycleTime / REP_INTERVAL;
    const ang = 100 + 65 * Math.cos(norm * 2 * Math.PI);
    setCurrentAngle(Math.round(ang));

    if (norm < 0.25) {
      setStage('rest');
    } else if (norm < 0.5) {
      setStage('up');
    } else if (norm < 0.75) {
      setStage('down');
    } else {
      setStage('ready');
    }

    const computedReps = Math.floor(currentTime / REP_INTERVAL);
    if (computedReps !== reps && computedReps > 0) {
      setReps(computedReps);
      soundFX.playRepChime();
    }
  }, [reps]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = '/videos/movement-demo.mp4';
      video.loop = true;
      video.ontimeupdate = handleTimeUpdate;
      video.play().catch(e => console.log('Auto-play prevented:', e));
      poseDetectorRef.current?.setVideoSource(video, false, 'bicep_curl_left');
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
    setStage('rest');
  };

  const toggleAudioCoach = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/cheese.wav');
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

  const computedMetrics: ExerciseMetrics = {
    reps,
    stage,
    currentAngle,
    targetAngle: 45,
    romPercentage: Math.min(Math.round(((165 - currentAngle) / (165 - 35)) * 100), 100),
    tempoScore: 92,
    formFeedback: currentAngle < 50 ? 'Full Flexion Achieved' : 'Keep Elbow Pinned',
    speedFeedback: 'Good Form!',
    isGoodForm: true,
    timeInRep: 1.8
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Top Bar with Controls */}
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
                {isAr ? 'عرض مباشر: قياس الزوايا والحركة السريرية' : 'LIVE SHOWCASE: CLINICAL GONIOMETRY & MOTION ANALYSIS'}
              </span>
              <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono px-2 py-0.5 rounded-full">
                {isAr ? 'معيار IntelliRehabDS الطبي' : 'IntelliRehabDS Validated'}
              </span>
            </div>
            <h3 className="text-lg font-black text-white mt-0.5">
              {isAr ? 'ثني الذراع الأيسر وتتبع المدى الحركي للمفصل' : 'Left Elbow Flexion & Kinematic Trajectory Evaluation'}
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

      {/* Main Grid: Video Stream with Goniometer on Left, Clinical Metrics on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
        {/* Left: Video Feed with Skeleton & Real-Time Angles */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div className="w-full h-[460px] relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-inner bg-black">
            <VisionCanvas
              landmarks={landmarks}
              metrics={computedMetrics}
              occlusion={occlusion}
              videoRef={videoRef}
              lang={lang}
              mirrored={false}
            />

            {/* Video Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/60">
              <div
                className="h-full bg-emerald-500 transition-all duration-150"
                style={{ width: `${videoProgress}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Activity className="w-4 h-4" />
              <span>{isAr ? 'زاوية المفصل الحالية' : 'Current Joint Angle'}:</span>
              <span className="font-mono text-base text-white">{currentAngle}°</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400">
              <span>{isAr ? 'المدى المستهدف' : 'Target AROM'}:</span>
              <span className="font-mono text-emerald-300 font-bold">35° - 165°</span>
            </div>
          </div>
        </div>

        {/* Right: Clinical Trajectory Graph & Biofeedback */}
        <div className="lg:col-span-6 h-[510px]">
          <PracticeStudioView
            exerciseId="bicep_curl_left"
            metrics={computedMetrics}
            occlusion={occlusion}
            lang={lang}
          />
        </div>
      </div>

      {/* Cultural Occlusion Detail */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
        <AttireOcclusionHUD
          occlusion={occlusion}
          onSelectAttire={() => {}}
          lang={lang}
        />
      </div>
    </div>
  );
};
