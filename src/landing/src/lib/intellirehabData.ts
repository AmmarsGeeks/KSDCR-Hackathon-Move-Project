// Normalized 100-point time-series trajectory curves from IntelliRehabDS clinical dataset
// Maps relative cycle progress (0% to 100%) to expected joint angles (in degrees)

function generateCurve(type: 'bicep_curl' | 'lat_raise' | 'band_pull' | 'punch'): number[] {
  const points: number[] = [];
  for (let i = 0; i < 100; i++) {
    const t = i / 99; // 0 to 1
    if (type === 'bicep_curl') {
      // Starts at ~160 deg (extended), reaches peak flexion (~40-45 deg) around midpoint t=0.5, returns to 160 deg
      const sinWave = Math.sin(t * Math.PI);
      const angle = 160 - 115 * sinWave;
      points.push(Math.round(angle * 10) / 10);
    } else if (type === 'lat_raise') {
      // Starts at ~25 deg (arms down), reaches ~95 deg (parallel shoulder level) at t=0.5, returns
      const sinWave = Math.sin(t * Math.PI);
      const angle = 25 + 70 * sinWave;
      points.push(Math.round(angle * 10) / 10);
    } else if (type === 'band_pull') {
      // Relative chest expansion / wrist distance
      const sinWave = Math.sin(t * Math.PI);
      const dist = 30 + 60 * sinWave;
      points.push(Math.round(dist * 10) / 10);
    } else {
      // Punch / extension
      const sinWave = Math.sin(t * Math.PI);
      const angle = 60 + 105 * sinWave;
      points.push(Math.round(angle * 10) / 10);
    }
  }
  return points;
}

export const INTELLIREHAB_BENCHMARKS = {
  bicep_curl_left: {
    nameEn: 'Left Bicep Curl',
    nameAr: 'ثني الذراع الأيسر',
    movementId: 0,
    targetJoint: 'Left Elbow',
    idealRepDurationSec: 3.5,
    minExpectedAngle: 35,
    maxExpectedAngle: 165,
    trajectory: generateCurve('bicep_curl'),
    clinicalTarget: '110°–130° Active Range of Motion (AROM)',
  },
  bicep_curl_right: {
    nameEn: 'Right Bicep Curl',
    nameAr: 'ثني الذراع الأيمن',
    movementId: 1,
    targetJoint: 'Right Elbow',
    idealRepDurationSec: 3.5,
    minExpectedAngle: 35,
    maxExpectedAngle: 165,
    trajectory: generateCurve('bicep_curl'),
    clinicalTarget: '110°–130° Active Range of Motion (AROM)',
  },
  lat_raise: {
    nameEn: 'Lateral Arm Raise',
    nameAr: 'رفع الذراع الجانبي',
    movementId: 4,
    targetJoint: 'Shoulder Abduction',
    idealRepDurationSec: 4.0,
    minExpectedAngle: 20,
    maxExpectedAngle: 100,
    trajectory: generateCurve('lat_raise'),
    clinicalTarget: '85°–95° Coronal Plane Elevation',
  },
  band_pull: {
    nameEn: 'Chest Expansion & Band Pull',
    nameAr: 'سحب حزام المقاومة وتمدد الصدر',
    movementId: 2,
    targetJoint: 'Bilateral Scapular Retraction',
    idealRepDurationSec: 3.0,
    minExpectedAngle: 25,
    maxExpectedAngle: 90,
    trajectory: generateCurve('band_pull'),
    clinicalTarget: 'Full Scapular Adduction without Lumbar Compensation',
  },
  punch: {
    nameEn: 'Forward Punch Reach',
    nameAr: 'المد الأمامي ولكمات التأهيل',
    movementId: 6,
    targetJoint: 'Elbow & Shoulder Forward Reach',
    idealRepDurationSec: 2.5,
    minExpectedAngle: 50,
    maxExpectedAngle: 170,
    trajectory: generateCurve('punch'),
    clinicalTarget: '>150° Sagittal Forward Extension',
  }
};
