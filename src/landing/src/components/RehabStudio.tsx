import React, { useState } from 'react';
import { PizzaGame } from './PizzaGame';
import { PizzaDemoShowcase } from './PizzaDemoShowcase';
import { MovementDemoShowcase } from './MovementDemoShowcase';
import { PracticeStudioView } from './PracticeStudioView';
import { AttireOcclusionHUD } from './AttireOcclusionHUD';
import { VisionCanvas } from './VisionCanvas';
import { ExerciseTracker, evaluateAttireOcclusion } from '../lib/exercises';
import type { ExerciseId, ExerciseMetrics, OcclusionConfidence, PoseLandmarks } from '../lib/types';
import { PoseDetector } from '../lib/poseEngine';
import {
  Sparkles, Activity, ShieldCheck, Pizza,
  Camera, ExternalLink, Video
} from 'lucide-react';

interface RehabStudioProps {
  lang?: 'en' | 'ar';
}

export const RehabStudio: React.FC<RehabStudioProps> = ({ lang = 'en' }) => {
  const [activeTab, setActiveTab] = useState<'pizza' | 'pizza_demo' | 'movement_demo' | 'clinical' | 'occlusion' | 'python'>('pizza');
  const [exerciseId, setExerciseId] = useState<ExerciseId>('bicep_curl_left');
  const [attireType, setAttireType] = useState<OcclusionConfidence['attireType']>('thobe_standard');
  const [feedSource, setFeedSource] = useState<'camera' | 'simulation'>('camera');

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
    overallScore: 84,
    shoulderConfidence: 94,
    elbowConfidence: 90,
    wristConfidence: 92,
    hipConfidence: 76,
    kneeConfidence: 72,
    attireType: 'thobe_standard',
    isDegraded: false,
    compensating: true
  });

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const poseDetectorRef = React.useRef<PoseDetector | null>(null);
  const trackerRef = React.useRef<ExerciseTracker>(new ExerciseTracker(exerciseId));

  React.useEffect(() => {
    trackerRef.current = new ExerciseTracker(exerciseId);

    poseDetectorRef.current = new PoseDetector((lms, timestamp) => {
      setLandmarks(lms);
      const computedMetrics = trackerRef.current.process(lms, timestamp);
      setMetrics(computedMetrics);

      const computedOcclusion = evaluateAttireOcclusion(lms, attireType);
      setOcclusion(computedOcclusion);
    });

    return () => {
      if (poseDetectorRef.current) {
        poseDetectorRef.current.stop();
      }
    };
  }, [exerciseId, attireType]);

  const startFeed = React.useCallback(async (source: 'camera' | 'simulation') => {
    setFeedSource(source);
    const video = videoRef.current;
    if (!video) return;

    if (source === 'camera') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
        });
        video.srcObject = stream;
        video.play();
        poseDetectorRef.current?.setVideoSource(video, false, exerciseId);
      } catch (err) {
        console.warn('Camera unavailable, switching to AI sim:', err);
        setFeedSource('simulation');
        video.srcObject = null;
        video.pause();
        poseDetectorRef.current?.setVideoSource(video, true, exerciseId);
      }
    } else {
      if (video.srcObject) {
        (video.srcObject as MediaStream).getTracks().forEach(t => t.stop());
        video.srcObject = null;
      }
      video.pause();
      poseDetectorRef.current?.setVideoSource(video, true, exerciseId);
    }
  }, [exerciseId]);

  React.useEffect(() => {
    if (activeTab !== 'pizza') {
      startFeed(feedSource);
    }
  }, [startFeed, feedSource, activeTab]);

  return (
    <div className="w-full my-6">
      {/* Studio Header & Tab Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-neutral-950 p-6 rounded-3xl border border-neutral-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
              {lang === 'ar' ? 'منصة التأهيل الحركي التفاعلية' : 'MOVE REHABILITATION SUITE'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {lang === 'ar' ? 'الاستوديو التفاعلي وتتبع الحركة الذكي' : 'Interactive Vision & Gamified Coaching Studio'}
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800 gap-1">
          <button
            onClick={() => setActiveTab('pizza')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pizza'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Pizza className="w-4 h-4" />
            {lang === 'ar' ? 'لعبة البيتزا' : 'Pizza Game'}
          </button>
          <button
            onClick={() => setActiveTab('pizza_demo')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pizza_demo'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4 text-amber-400" />
            {lang === 'ar' ? 'عرض فيديو البيتزا' : 'Pizza Video Demo'}
          </button>
          <button
            onClick={() => setActiveTab('movement_demo')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'movement_demo'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4 text-teal-400" />
            {lang === 'ar' ? 'عرض قياس الزوايا' : 'Angle Video Demo'}
          </button>
          <button
            onClick={() => setActiveTab('clinical')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'clinical'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            {lang === 'ar' ? 'الاستوديو السريري' : 'Practice Studio'}
          </button>
          <button
            onClick={() => setActiveTab('occlusion')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'occlusion'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            {lang === 'ar' ? 'الزي السعودي' : 'Attire Occlusion'}
          </button>
          <button
            onClick={() => setActiveTab('python')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'python'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            {lang === 'ar' ? 'سيرفر بايثون (:5001)' : 'Python Server (:5001)'}
          </button>
        </div>
      </div>

      {/* Main View Display */}
      {activeTab === 'pizza' && (
        <PizzaGame lang={lang} />
      )}

      {activeTab === 'pizza_demo' && (
        <PizzaDemoShowcase lang={lang} onBack={() => setActiveTab('pizza')} />
      )}

      {activeTab === 'movement_demo' && (
        <MovementDemoShowcase lang={lang} onBack={() => setActiveTab('clinical')} />
      )}

      {activeTab === 'clinical' && (
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-neutral-800 pb-4">
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'bicep_curl_left', nameEn: 'Left Bicep Curl', nameAr: 'ثني الذراع الأيسر' },
                { id: 'bicep_curl_right', nameEn: 'Right Bicep Curl', nameAr: 'ثني الذراع الأيمن' },
                { id: 'lat_raise', nameEn: 'Lateral Arm Raise', nameAr: 'رفع الذراع الجانبي' },
                { id: 'band_pull', nameEn: 'Chest Band Pull', nameAr: 'سحب شريط المقاومة' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setExerciseId(opt.id as ExerciseId)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    exerciseId === opt.id
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                  }`}
                >
                  {lang === 'ar' ? opt.nameAr : opt.nameEn}
                </button>
              ))}
            </div>

            <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
              <button
                onClick={() => startFeed('camera')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                  feedSource === 'camera' ? 'bg-emerald-600 text-white' : 'text-neutral-400'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                Live Cam
              </button>
              <button
                onClick={() => startFeed('simulation')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                  feedSource === 'simulation' ? 'bg-emerald-600 text-white' : 'text-neutral-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Sim
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 h-[420px]">
              <VisionCanvas
                landmarks={landmarks}
                metrics={metrics}
                occlusion={occlusion}
                videoRef={videoRef}
                lang={lang}
              />
            </div>
            <div className="lg:col-span-7 h-[420px]">
              <PracticeStudioView
                exerciseId={exerciseId}
                metrics={metrics}
                occlusion={occlusion}
                lang={lang}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'occlusion' && (
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
          <AttireOcclusionHUD
            occlusion={occlusion}
            onSelectAttire={setAttireType}
            lang={lang}
          />
        </div>
      )}

      {activeTab === 'python' && (
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'خادم بايثون المحلي (Flask + OpenCV + Silma AI)' : 'Local Python Engine (Flask + OpenCV + Silma AI)'}</span>
              </div>
              <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
                {lang === 'ar'
                  ? 'يعمل محلياً على منفذ 5001 عبر معالجة OpenCV المباشرة للكاميرا مع تعليق صوتي من سيلما AI. اضغط على الزر لفتح الصفحة في نافذة كاملة أو تفقد الشاشة المدمجة.'
                  : 'Runs on your device at port 5001 using direct native OpenCV webcam streaming and Silma AI speech. Launch in a dedicated window or use the embedded view below.'}
              </p>
            </div>
            <a
              href="http://localhost:5001/pizzagame"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>{lang === 'ar' ? 'فتح http://localhost:5001/pizzagame' : 'Launch http://localhost:5001/pizzagame'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="w-full h-[680px] border-2 border-neutral-800 rounded-2xl overflow-hidden bg-black relative shadow-2xl">
            <iframe
              src="http://localhost:5001/pizzagame"
              className="w-full h-full border-0"
              title="Python Pizza Game"
            />
          </div>
        </div>
      )}
    </div>
  );
};
