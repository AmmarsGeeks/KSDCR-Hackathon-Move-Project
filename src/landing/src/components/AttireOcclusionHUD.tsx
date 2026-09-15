import React from 'react';
import type { OcclusionConfidence } from '../lib/types';
import { Shirt, Sparkles, CheckCircle2 } from 'lucide-react';

interface AttireOcclusionHUDProps {
  occlusion: OcclusionConfidence;
  onSelectAttire: (attire: OcclusionConfidence['attireType']) => void;
  lang?: 'en' | 'ar';
}

export const AttireOcclusionHUD: React.FC<AttireOcclusionHUDProps> = ({
  occlusion,
  onSelectAttire,
  lang = 'en'
}) => {
  const attireOptions: { id: OcclusionConfidence['attireType']; nameEn: string; nameAr: string; descEn: string; descAr: string }[] = [
    {
      id: 'thobe_standard',
      nameEn: 'Saudi Thobe (الـثـوب)',
      nameAr: 'الثوب السعودي التقليدي',
      descEn: 'Flowing fabric covers knee and hip joints. MOVE activates kinematic torso compensation.',
      descAr: 'قماش انسيابي يغطي مفاصل الركبة والحوض. يفعل نظام MOVE التعويض الحركي.'
    },
    {
      id: 'abaya_flowing',
      nameEn: 'Flowing Abaya (الـعـبـاءة)',
      nameAr: 'العباءة النسائية الفضفاضة',
      descEn: 'Full drape fabric occludes elbow and hip contours. Dynamic temporal filter applied.',
      descAr: 'تغطية واسعة تحجب معالم المرفقين والخصر. يطبق النظام فلترة زمنية ديناميكية.'
    },
    {
      id: 'hijab_loose',
      nameEn: 'Hijab / Headcover (الحجاب)',
      nameAr: 'غطاء الرأس والحجاب',
      descEn: 'Shoulder line occlusion re-weighted with neck and spinal alignment landmarks.',
      descAr: 'إعادة موازنة معالم الكتفين بالاعتماد على محاذاة العمود الفقري والرقبة.'
    },
    {
      id: 'standard_gym',
      nameEn: 'Standard Gym Fit (ملابس رياضية)',
      nameAr: 'ملابس رياضية مكشوفة المفاصل',
      descEn: 'Baseline direct line-of-sight tracking (standard western research model).',
      descAr: 'تتبع مباشر مكشوف المعالم (النموذج الغربي التقليدي في الأبحاث السابقة).'
    }
  ];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-white shadow-2xl">
      <div className="flex justify-between items-start border-b border-neutral-800 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-400">
              <Shirt className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              {lang === 'ar' ? 'نموذج التكيف الثقافي وتجاوز التغطية' : 'CULTURAL OCCLUSION COMPENSATION'}
            </span>
          </div>
          <h3 className="text-base font-bold text-white mt-1">
            {lang === 'ar' ? 'تخصيص نوع الزي وقياس موثوقية المفاصل' : 'Attire Type & Joint Landmark Confidence HUD'}
          </h3>
        </div>

        <div className="bg-neutral-950 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-right">
          <div className="text-[10px] text-neutral-400 font-bold uppercase">
            {lang === 'ar' ? 'متوسط الثقة' : 'OVERALL CONF.'}
          </div>
          <div className="text-lg font-black text-emerald-400 font-mono">
            {occlusion.overallScore}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {attireOptions.map((opt) => {
          const isSelected = occlusion.attireType === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelectAttire(opt.id)}
              className={`text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
                isSelected
                  ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg'
                  : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              <div className="mt-0.5">
                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-neutral-600 block" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  {lang === 'ar' ? opt.nameAr : opt.nameEn}
                  {opt.id !== 'standard_gym' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-900/60 text-amber-300 font-normal">
                      MOVE AI
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1 leading-snug">
                  {lang === 'ar' ? opt.descAr : opt.descEn}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-2 bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
        <div className="text-xs font-bold text-neutral-300 flex items-center justify-between mb-2">
          <span>{lang === 'ar' ? 'مستوى دقة تتبع المفاصل الفردية' : 'Individual Joint Landmark Robustness'}</span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {lang === 'ar' ? 'تعويض مستمر بالذكاء الاصطناعي' : 'Real-time Kinematic Compensation'}
          </span>
        </div>

        {[
          { nameEn: 'Shoulder Alignment', nameAr: 'محاذاة الكتفين', val: occlusion.shoulderConfidence },
          { nameEn: 'Elbow Flexion', nameAr: 'ثني المرفق', val: occlusion.elbowConfidence },
          { nameEn: 'Wrist Velocity', nameAr: 'سرعة المعصم', val: occlusion.wristConfidence },
          { nameEn: 'Hip Center (Occluded under fabric)', nameAr: 'مركز الحوض (مغطى بالثوب/العباءة)', val: occlusion.hipConfidence },
          { nameEn: 'Knee Trajectory (Occluded)', nameAr: 'مسار الركبة (مغطى بالثوب/العباءة)', val: occlusion.kneeConfidence }
        ].map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-[11px] text-neutral-400">
              <span>{lang === 'ar' ? item.nameAr : item.nameEn}</span>
              <span className="font-mono font-bold text-white">{item.val}%</span>
            </div>
            <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  item.val > 80 ? 'bg-emerald-500' : item.val > 65 ? 'bg-amber-400' : 'bg-red-400'
                }`}
                style={{ width: `${item.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
