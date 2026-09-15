import React from 'react';
import type { ExerciseId, ExerciseMetrics, OcclusionConfidence } from '../lib/types';
import { INTELLIREHAB_BENCHMARKS } from '../lib/intellirehabData';
import { Activity, Target, Zap, ShieldCheck } from 'lucide-react';

interface PracticeStudioViewProps {
  exerciseId: ExerciseId;
  metrics: ExerciseMetrics;
  occlusion: OcclusionConfidence;
  lang?: 'en' | 'ar';
}

export const PracticeStudioView: React.FC<PracticeStudioViewProps> = ({
  exerciseId,
  metrics,
  occlusion,
  lang = 'en'
}) => {
  const benchmark = INTELLIREHAB_BENCHMARKS[exerciseId as keyof typeof INTELLIREHAB_BENCHMARKS] || INTELLIREHAB_BENCHMARKS.bicep_curl_left;

  const points = benchmark.trajectory;
  const svgWidth = 400;
  const svgHeight = 160;

  const minVal = benchmark.minExpectedAngle;
  const maxVal = benchmark.maxExpectedAngle;
  const range = maxVal - minVal || 1;

  const pathD = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * (svgWidth - 40) + 20;
    const y = svgHeight - 20 - ((val - minVal) / range) * (svgHeight - 40);
    return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const currentT = (metrics.timeInRep % benchmark.idealRepDurationSec) / benchmark.idealRepDurationSec;
  const cursorX = currentT * (svgWidth - 40) + 20;
  const cursorY = svgHeight - 20 - (Math.max(0, Math.min(range, metrics.currentAngle - minVal)) / range) * (svgHeight - 40);

  return (
    <div className="w-full h-full bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between text-white shadow-2xl">
      <div className="flex justify-between items-start border-b border-neutral-800 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              <Activity className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              {lang === 'ar' ? 'استوديو التقييم السريري' : 'CLINICAL PRACTICE STUDIO'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            {lang === 'ar' ? benchmark.nameAr : benchmark.nameEn}
          </h3>
          <p className="text-xs text-neutral-400">
            {lang === 'ar' ? 'مقارنة آنية مع معيار IntelliRehabDS الطبي' : 'Real-time IntelliRehabDS Clinical Kinematic Benchmark'}
          </p>
        </div>

        <div className="text-right">
          <div className="text-[10px] uppercase font-bold text-neutral-400">
            {lang === 'ar' ? 'الهدف السريري' : 'TARGET ROM'}
          </div>
          <div className="text-xs font-semibold text-emerald-300 font-mono">
            {benchmark.clinicalTarget}
          </div>
        </div>
      </div>

      <div className="my-3 bg-neutral-950 rounded-xl p-3 border border-neutral-800 relative">
        <div className="flex justify-between items-center text-[11px] text-neutral-400 mb-1 px-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" />
            {lang === 'ar' ? 'المسار المعياري الموصى به' : 'IntelliRehabDS Gold Standard Curve'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-ping" />
            {lang === 'ar' ? 'زاويتك الحالية' : 'Live Patient Joint Angle'}
          </span>
        </div>

        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-36">
          <line x1="20" y1="20" x2={svgWidth - 20} y2="20" stroke="#334155" strokeDasharray="3 3" />
          <line x1="20" y1={svgHeight / 2} x2={svgWidth - 20} y2={svgHeight / 2} stroke="#334155" strokeDasharray="3 3" />
          <line x1="20" y1={svgHeight - 20} x2={svgWidth - 20} y2={svgHeight - 20} stroke="#475569" />

          <path d={pathD} fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx={cursorX} cy={cursorY} r="7" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
        </svg>

        <div className="flex justify-between text-[10px] text-neutral-500 font-mono px-2">
          <span>0.0s (Start)</span>
          <span>{benchmark.idealRepDurationSec / 2}s (Peak Flexion)</span>
          <span>{benchmark.idealRepDurationSec}s (Finish)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
          <div className="text-[10px] uppercase font-bold text-neutral-400 flex items-center gap-1">
            <Target className="w-3 h-3 text-emerald-400" />
            {lang === 'ar' ? 'الزاوية الحالية' : 'JOINT ANGLE'}
          </div>
          <div className="text-xl font-black text-white font-mono mt-1">
            {metrics.currentAngle}°
          </div>
        </div>

        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
          <div className="text-[10px] uppercase font-bold text-neutral-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            {lang === 'ar' ? 'مدى الحركة' : 'ROM ACHIEVED'}
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono mt-1">
            {metrics.romPercentage}%
          </div>
        </div>

        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
          <div className="text-[10px] uppercase font-bold text-neutral-400">
            {lang === 'ar' ? 'سرعة التكرار' : 'TEMPO SCORE'}
          </div>
          <div className="text-xl font-black text-teal-400 font-mono mt-1">
            {metrics.tempoScore}%
          </div>
        </div>

        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
          <div className="text-[10px] uppercase font-bold text-neutral-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            {lang === 'ar' ? 'ثقة التتبع' : 'OCCLUSION CONF.'}
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono mt-1">
            {occlusion.overallScore}%
          </div>
        </div>
      </div>
    </div>
  );
};
