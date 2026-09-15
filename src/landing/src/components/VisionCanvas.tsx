import React, { useRef, useEffect } from 'react';
import type { PoseLandmarks, ExerciseMetrics, OcclusionConfidence } from '../lib/types';

interface VisionCanvasProps {
  landmarks: PoseLandmarks | null;
  metrics: ExerciseMetrics;
  occlusion: OcclusionConfidence;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  showSkeleton?: boolean;
  showAngles?: boolean;
  mirrored?: boolean;
  lang?: 'en' | 'ar';
}

export const VisionCanvas: React.FC<VisionCanvasProps> = ({
  landmarks,
  metrics,
  occlusion,
  videoRef,
  showSkeleton = true,
  showAngles = true,
  mirrored = true,
  lang = 'en'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (landmarks && showSkeleton) {
      ctx.save();
      if (mirrored) {
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
      }

      const connections: [keyof PoseLandmarks, keyof PoseLandmarks][] = [
        ['leftShoulder', 'rightShoulder'],
        ['leftShoulder', 'leftElbow'],
        ['leftElbow', 'leftWrist'],
        ['rightShoulder', 'rightElbow'],
        ['rightElbow', 'rightWrist'],
        ['leftShoulder', 'leftHip'],
        ['rightShoulder', 'rightHip'],
        ['leftHip', 'rightHip'],
        ['leftHip', 'leftKnee'],
        ['rightHip', 'rightKnee'],
        ['leftKnee', 'leftAnkle'],
        ['rightKnee', 'rightAnkle'],
      ];

      let strokeColor = 'rgba(16, 185, 129, 0.85)';
      let glowColor = 'rgba(16, 185, 129, 0.4)';
      if (occlusion.isDegraded) {
        strokeColor = 'rgba(239, 68, 68, 0.85)';
        glowColor = 'rgba(239, 68, 68, 0.4)';
      } else if (occlusion.compensating) {
        strokeColor = 'rgba(245, 158, 11, 0.9)';
        glowColor = 'rgba(245, 158, 11, 0.4)';
      }

      ctx.lineWidth = 4;
      ctx.strokeStyle = strokeColor;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 12;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      connections.forEach(([fromKey, toKey]) => {
        const from = landmarks[fromKey];
        const to = landmarks[toKey];
        if (from && to && typeof from === 'object' && typeof to === 'object' && 'x' in from && 'x' in to) {
          ctx.beginPath();
          ctx.moveTo(from.x * width, from.y * height);
          ctx.lineTo(to.x * width, to.y * height);
          ctx.stroke();
        }
      });

      const jointKeys: (keyof PoseLandmarks)[] = [
        'leftShoulder', 'rightShoulder',
        'leftElbow', 'rightElbow',
        'leftWrist', 'rightWrist',
        'leftHip', 'rightHip',
        'leftKnee', 'rightKnee'
      ];

      jointKeys.forEach(key => {
        const pt = landmarks[key];
        if (pt && typeof pt === 'object' && 'x' in pt) {
          const px = pt.x * width;
          const py = pt.y * height;

          ctx.beginPath();
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fillStyle = strokeColor;
          ctx.fill();
        }
      });

      ctx.restore();

      if (showAngles && landmarks.leftElbow && landmarks.rightElbow) {
        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = '#ffffff';

        const drawAngleBadge = (px: number, py: number, angle: number, label: string) => {
          const badgeX = mirrored ? width - px - 35 : px - 35;
          const badgeY = py - 15;

          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.beginPath();
          ctx.roundRect(badgeX, badgeY, 70, 24, 6);
          ctx.fill();
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.fillText(`${label}: ${angle}°`, badgeX + 6, badgeY + 16);
        };

        if (landmarks.leftElbow) {
          drawAngleBadge(landmarks.leftElbow.x * width, landmarks.leftElbow.y * height, metrics.currentAngle, 'L');
        }
        if (landmarks.rightElbow) {
          drawAngleBadge(landmarks.rightElbow.x * width, landmarks.rightElbow.y * height, metrics.currentAngle, 'R');
        }
      }
    }
  }, [landmarks, metrics, occlusion, showSkeleton, showAngles, mirrored]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-neutral-950 border border-emerald-900/40 shadow-2xl flex items-center justify-center">
      <video
        ref={videoRef as React.LegacyRef<HTMLVideoElement>}
        playsInline
        muted
        autoPlay
        className={`w-full h-full object-cover ${mirrored ? 'scale-x-[-1]' : ''}`}
      />

      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
        <div className="bg-neutral-900/85 backdrop-blur-md border border-emerald-500/40 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
              {lang === 'ar' ? 'التكرارات' : 'REPS COUNT'}
            </div>
            <div className="text-2xl font-black text-white leading-none">
              {metrics.reps}
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/85 backdrop-blur-md border border-neutral-700/60 px-4 py-2 rounded-xl shadow-lg flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
              {lang === 'ar' ? 'جودة الحركة' : 'FORM QUALITY'}
            </div>
            <div className={`text-sm font-bold ${
              metrics.speedFeedback === 'Good Form!' ? 'text-emerald-400' :
              metrics.speedFeedback === 'Slow Down!' ? 'text-amber-400' : 'text-blue-400'
            }`}>
              {lang === 'ar'
                ? (metrics.speedFeedback === 'Good Form!' ? 'أداء ممتاز!' : metrics.speedFeedback === 'Slow Down!' ? 'تمهل قليلاً' : 'زد السرعة')
                : metrics.speedFeedback}
            </div>
          </div>
          <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
            {metrics.stage}
          </span>
        </div>
      </div>

      {occlusion.compensating && (
        <div className="absolute bottom-3 left-4 right-4 bg-neutral-900/90 backdrop-blur-md border border-amber-500/40 px-3.5 py-2 rounded-xl flex items-center justify-between text-xs text-amber-200 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>
              {lang === 'ar'
                ? 'تعويض نشط لتغطية الثوب/العباءة (نموذج MOVE المتكيف)'
                : 'Active Loose Attire Compensation (MOVE Occlusion Engine)'}
            </span>
          </div>
          <div className="font-mono font-bold text-amber-300">
            {occlusion.overallScore}% Conf.
          </div>
        </div>
      )}
    </div>
  );
};
