import React, { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import type { ExerciseId, ExerciseMetrics, GameScore } from '../lib/types';
import { soundFX, speakFeedback } from '../lib/audioCoach';

interface MiniGameCanvasProps {
  exerciseId: ExerciseId;
  metrics: ExerciseMetrics;
  targetReps?: number;
  lang?: 'en' | 'ar';
}

interface GameObject {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  collected: boolean;
  type: 'date' | 'ring' | 'drum_note';
}

export const MiniGameCanvas: React.FC<MiniGameCanvasProps> = ({
  exerciseId,
  metrics,
  targetReps = 10,
  lang = 'en'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState<GameScore>({
    points: 0,
    combo: 0,
    maxCombo: 0,
    accuracy: 100,
    itemsCollected: 0,
    stars: 3
  });

  const objectsRef = useRef<GameObject[]>([]);
  const lastRepRef = useRef<number>(metrics.reps);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (metrics.reps > lastRepRef.current) {
      const addedPoints = 150 + score.combo * 20;
      setScore(prev => {
        const nextCombo = prev.combo + 1;
        return {
          ...prev,
          points: prev.points + addedPoints,
          combo: nextCombo,
          maxCombo: Math.max(prev.maxCombo, nextCombo),
          itemsCollected: prev.itemsCollected + 1
        };
      });

      soundFX.playRepChime();

      if (metrics.reps >= targetReps) {
        soundFX.playCelebration();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        speakFeedback('Level complete! Excellent rehabilitation session.', 'أحسنت! اكتمل التمرين بنجاح باهر.', lang);
      } else if (metrics.reps % 3 === 0) {
        speakFeedback('Keep going! Perfect form.', 'استمر! حركتك متقنة جداً.', lang);
      }

      lastRepRef.current = metrics.reps;
    }
  }, [metrics.reps, targetReps, score.combo, lang]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const loop = () => {
      frame++;
      const width = canvas.width;
      const height = canvas.height;

      if (exerciseId === 'lat_raise') {
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, '#064e3b');
        grad.addColorStop(0.5, '#047857');
        grad.addColorStop(1, '#065f46');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'rgba(2, 44, 34, 0.6)';
        ctx.beginPath();
        ctx.arc(width * 0.2, 0, 120, 0, Math.PI);
        ctx.arc(width * 0.8, 0, 140, 0, Math.PI);
        ctx.fill();

      } else if (exerciseId === 'bicep_curl_left' || exerciseId === 'bicep_curl_right') {
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(0.6, '#1e293b');
        grad.addColorStop(1, '#78350f');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'rgba(180, 83, 9, 0.35)';
        ctx.beginPath();
        ctx.ellipse(width * 0.3, height + 40, width * 0.5, 120, 0, 0, Math.PI * 2);
        ctx.fill();

      } else {
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, '#111827');
        grad.addColorStop(1, '#064e3b');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      if (frame % 75 === 0 && objectsRef.current.length < 6) {
        objectsRef.current.push({
          id: Date.now() + Math.random(),
          x: Math.random() * (width - 100) + 50,
          y: -30,
          size: 24,
          speed: 2.2 + Math.random() * 1.5,
          collected: false,
          type: exerciseId === 'lat_raise' ? 'date' : exerciseId.includes('bicep') ? 'ring' : 'drum_note'
        });
      }

      objectsRef.current.forEach(obj => {
        obj.y += obj.speed;

        const playerY = height - (metrics.romPercentage / 100) * (height * 0.7) - 60;
        const playerX = width / 2;

        const dist = Math.hypot(obj.x - playerX, obj.y - playerY);
        if (dist < 45 && !obj.collected) {
          obj.collected = true;
          soundFX.playRepChime();
        }

        if (!obj.collected) {
          ctx.save();
          if (obj.type === 'date') {
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.ellipse(obj.x, obj.y, 14, 18, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#b45309';
            ctx.beginPath();
            ctx.arc(obj.x, obj.y - 12, 4, 0, Math.PI * 2);
            ctx.fill();
          } else if (obj.type === 'ring') {
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 5;
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, 18, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            ctx.fillStyle = '#10b981';
            ctx.shadowColor = '#34d399';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, 16, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      });

      objectsRef.current = objectsRef.current.filter(obj => obj.y < height + 50 && !obj.collected);

      const avatarY = height - (metrics.romPercentage / 100) * (height * 0.7) - 60;
      const avatarX = width / 2;

      ctx.save();
      if (exerciseId === 'lat_raise') {
        ctx.fillStyle = '#d97706';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, 32, 0, Math.PI);
        ctx.fill();
        ctx.fillStyle = '#fde68a';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(lang === 'ar' ? 'سلة الحصاد' : 'HARVEST', avatarX - 25, avatarY + 18);
      } else if (exerciseId.includes('bicep')) {
        ctx.fillStyle = '#fbbf24';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(avatarX, avatarY - 20);
        ctx.lineTo(avatarX + 40, avatarY + 10);
        ctx.lineTo(avatarX + 15, avatarY);
        ctx.lineTo(avatarX, avatarY + 15);
        ctx.lineTo(avatarX - 15, avatarY);
        ctx.lineTo(avatarX - 40, avatarY + 10);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, 30, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [exerciseId, metrics.romPercentage, lang]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-950 border border-emerald-800/40 shadow-2xl flex flex-col justify-between p-5">
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex justify-between items-center">
        <div className="bg-neutral-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-emerald-500/30">
          <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
            {lang === 'ar' ? 'اللعبة الحركية' : 'ACTIVE MINI-GAME'}
          </div>
          <div className="text-sm font-black text-white">
            {exerciseId === 'lat_raise' ? (lang === 'ar' ? 'حصاد النخيل (رفع جانبي)' : 'Oasis Harvest (Lat Raise)') :
             exerciseId.includes('bicep') ? (lang === 'ar' ? 'تحليق الصقر (ثني الذراع)' : 'Falcon Flight (Bicep Curl)') :
             (lang === 'ar' ? 'إيقاع العرضة (سحب ومد)' : 'Heritage Ardah (Band Pull)')}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {score.combo > 1 && (
            <div className="bg-amber-500/90 text-neutral-950 font-black px-3 py-1.5 rounded-lg text-xs animate-bounce shadow-lg">
              {score.combo}x COMBO!
            </div>
          )}
          <div className="bg-neutral-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-emerald-500/30 text-right">
            <div className="text-[10px] uppercase font-bold text-emerald-400">
              {lang === 'ar' ? 'النقاط' : 'SCORE'}
            </div>
            <div className="text-xl font-black text-white font-mono leading-none">
              {score.points.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-neutral-950/85 backdrop-blur-md p-4 rounded-xl border border-emerald-500/30">
        <div className="flex justify-between items-center text-xs font-semibold mb-2">
          <span className="text-neutral-300">
            {lang === 'ar' ? `الهدف: ${metrics.reps} من ${targetReps} تكرار` : `Target Goal: ${metrics.reps} / ${targetReps} Reps`}
          </span>
          <span className="text-emerald-400 font-mono font-bold">
            {Math.min(100, Math.round((metrics.reps / targetReps) * 100))}%
          </span>
        </div>
        <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${Math.min(100, (metrics.reps / targetReps) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
