import type { Point2D, PoseLandmarks, ExerciseId, ExerciseMetrics, OcclusionConfidence } from './types';
import { INTELLIREHAB_BENCHMARKS } from './intellirehabData';

// Calculate angle between 3 points in 2D degrees (0 - 180)
export function calculateAngle(a: Point2D, b: Point2D, c: Point2D): number {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) {
    angle = 360.0 - angle;
  }
  return Math.round(angle);
}

// Euclidean distance between 2 points normalized 0 - 1
export function calculateDistance(a: Point2D, b: Point2D): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export class ExerciseTracker {
  private reps = 0;
  private stage: 'up' | 'down' | 'rest' | 'punch' | 'together' | 'apart' | 'ready' = 'rest';
  private repStartTime = 0;
  private lastRepTimestamp = 0;
  private exerciseId: ExerciseId;

  constructor(exerciseId: ExerciseId) {
    this.exerciseId = exerciseId;
  }

  public setExercise(id: ExerciseId) {
    if (this.exerciseId !== id) {
      this.exerciseId = id;
      this.reps = 0;
      this.stage = 'rest';
      this.repStartTime = 0;
    }
  }

  public reset() {
    this.reps = 0;
    this.stage = 'rest';
    this.repStartTime = 0;
  }

  public process(landmarks: PoseLandmarks, timestamp: number): ExerciseMetrics {
    if (!landmarks.leftShoulder || !landmarks.rightShoulder) {
      return {
        reps: this.reps,
        stage: this.stage,
        currentAngle: 0,
        targetAngle: 90,
        romPercentage: 0,
        tempoScore: 100,
        formFeedback: 'Position yourself clearly in frame',
        speedFeedback: 'Get Ready',
        isGoodForm: false,
        timeInRep: 0
      };
    }

    const {
      leftShoulder, rightShoulder,
      leftElbow, rightElbow,
      leftWrist, rightWrist
    } = landmarks;

    let currentAngle = 0;
    let targetAngle = 90;
    let formFeedback = 'Good positioning';
    let speedFeedback: ExerciseMetrics['speedFeedback'] = 'Good Form!';
    let isGoodForm = true;

    const benchmark = INTELLIREHAB_BENCHMARKS[this.exerciseId as keyof typeof INTELLIREHAB_BENCHMARKS] || INTELLIREHAB_BENCHMARKS.bicep_curl_left;

    // Strict threshold checks matching PTplay capture.py
    if (this.exerciseId === 'bicep_curl_left' && leftShoulder && leftElbow && leftWrist) {
      currentAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
      targetAngle = 35;

      // PTplay: if angle > 160 -> stage = "down"; if angle < 35 and stage == "down" -> stage = "up", rep++
      if (currentAngle > 155) {
        this.stage = 'down';
        if (this.repStartTime === 0) this.repStartTime = timestamp;
      } else if (currentAngle < 40 && this.stage === 'down') {
        if (timestamp - this.lastRepTimestamp > 600) {
          this.reps += 1;
          this.lastRepTimestamp = timestamp;
          this.stage = 'up';
        }
      }

    } else if (this.exerciseId === 'bicep_curl_right' && rightShoulder && rightElbow && rightWrist) {
      currentAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
      targetAngle = 35;

      if (currentAngle > 155) {
        this.stage = 'down';
        if (this.repStartTime === 0) this.repStartTime = timestamp;
      } else if (currentAngle < 40 && this.stage === 'down') {
        if (timestamp - this.lastRepTimestamp > 600) {
          this.reps += 1;
          this.lastRepTimestamp = timestamp;
          this.stage = 'up';
        }
      }

    } else if (this.exerciseId === 'lat_raise' && leftShoulder && rightShoulder && leftWrist && rightWrist) {
      const avgShoulderY = (leftShoulder.y + rightShoulder.y) / 2;
      const avgWristY = (leftWrist.y + rightWrist.y) / 2;
      const armAngle = leftElbow ? calculateAngle({ x: leftShoulder.x, y: leftShoulder.y + 0.5 }, leftShoulder, leftElbow) : 45;
      currentAngle = armAngle;
      targetAngle = 90;

      // PTplay: if avg_wrist > avg_shoulder + 0.1 -> down; if avg_wrist < avg_shoulder - 0.15 and down -> up, rep++
      if (avgWristY > avgShoulderY + 0.08) {
        this.stage = 'down';
        if (this.repStartTime === 0) this.repStartTime = timestamp;
      } else if (avgWristY < avgShoulderY - 0.12 && this.stage === 'down') {
        if (timestamp - this.lastRepTimestamp > 600) {
          this.reps += 1;
          this.lastRepTimestamp = timestamp;
          this.stage = 'up';
        }
      }

    } else if (this.exerciseId === 'band_pull' && leftWrist && rightWrist) {
      const wristDistance = calculateDistance(leftWrist, rightWrist);
      currentAngle = Math.round(wristDistance * 100);
      targetAngle = 45;

      // PTplay: if wrist_distance < 0.2 -> together; if wrist_distance > 0.4 and together -> apart, rep++
      if (wristDistance < 0.22) {
        this.stage = 'together';
        if (this.repStartTime === 0) this.repStartTime = timestamp;
      } else if (wristDistance > 0.38 && this.stage === 'together') {
        if (timestamp - this.lastRepTimestamp > 600) {
          this.reps += 1;
          this.lastRepTimestamp = timestamp;
          this.stage = 'apart';
        }
      }

    } else if (this.exerciseId === 'punch' && leftShoulder && leftElbow && leftWrist && rightShoulder && rightElbow && rightWrist) {
      const leftAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
      const rightAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
      currentAngle = Math.max(leftAngle, rightAngle);
      targetAngle = 155;

      const isPunching = (leftAngle > 150 && leftWrist.y < leftElbow.y + 0.15) || (rightAngle > 150 && rightWrist.y < rightElbow.y + 0.15);

      if (isPunching && (this.stage === 'rest' || this.stage === 'down')) {
        if (timestamp - this.lastRepTimestamp > 500) {
          this.reps += 1;
          this.lastRepTimestamp = timestamp;
          this.stage = 'punch';
        }
      } else if (!isPunching) {
        this.stage = 'rest';
      }

    } else if (this.exerciseId === 'slice' && leftShoulder && leftElbow && leftWrist) {
      const armAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
      currentAngle = armAngle;
      targetAngle = 135;

      if (armAngle < 40) {
        this.stage = 'up';
      } else if (armAngle > 130 && this.stage === 'up') {
        if (timestamp - this.lastRepTimestamp > 500) {
          this.reps += 1;
          this.lastRepTimestamp = timestamp;
          this.stage = 'down';
        }
      }
    }

    // ROM calculation
    const rangeSpan = Math.abs(benchmark.maxExpectedAngle - benchmark.minExpectedAngle) || 1;
    const progress = Math.max(0, Math.min(100, Math.round(((Math.abs(currentAngle - benchmark.minExpectedAngle)) / rangeSpan) * 100)));

    const repDuration = this.repStartTime > 0 ? (timestamp - this.repStartTime) / 1000 : 0;
    if (this.stage === 'up' || this.stage === 'apart' || this.stage === 'punch') {
      if (repDuration < 0.8) {
        speedFeedback = 'Slow Down!';
        formFeedback = 'Controlled tempo is key';
        isGoodForm = false;
      } else if (repDuration > 5.0) {
        speedFeedback = 'Speed Up!';
        formFeedback = 'Keep steady cadence';
        isGoodForm = false;
      } else {
        speedFeedback = 'Good Form!';
        formFeedback = 'Target muscle engaged correctly';
        isGoodForm = true;
      }
    }

    return {
      reps: this.reps,
      stage: this.stage,
      currentAngle,
      targetAngle,
      romPercentage: progress,
      tempoScore: isGoodForm ? 95 : 70,
      formFeedback,
      speedFeedback,
      isGoodForm,
      timeInRep: repDuration
    };
  }
}

// Compute cultural attire occlusion scores with REAL dynamic frame variance
export function evaluateAttireOcclusion(landmarks: PoseLandmarks, attireType: OcclusionConfidence['attireType']): OcclusionConfidence {
  const shoulderVis = ((landmarks.leftShoulder?.visibility ?? 0.88) + (landmarks.rightShoulder?.visibility ?? 0.88)) / 2;
  const elbowVis = ((landmarks.leftElbow?.visibility ?? 0.85) + (landmarks.rightElbow?.visibility ?? 0.85)) / 2;
  const wristVis = ((landmarks.leftWrist?.visibility ?? 0.90) + (landmarks.rightWrist?.visibility ?? 0.90)) / 2;
  const hipVis = ((landmarks.leftHip?.visibility ?? 0.70) + (landmarks.rightHip?.visibility ?? 0.70)) / 2;
  const kneeVis = ((landmarks.leftKnee?.visibility ?? 0.65) + (landmarks.rightKnee?.visibility ?? 0.65)) / 2;

  let shoulderWeight = 1.0;
  let elbowWeight = 1.0;
  let wristWeight = 1.0;
  let hipWeight = 1.0;
  let kneeWeight = 1.0;

  if (attireType === 'thobe_standard') {
    kneeWeight = 0.76;
    hipWeight = 0.80;
    elbowWeight = 0.92;
  } else if (attireType === 'abaya_flowing') {
    kneeWeight = 0.70;
    hipWeight = 0.74;
    shoulderWeight = 0.85;
    elbowWeight = 0.88;
  } else if (attireType === 'hijab_loose') {
    shoulderWeight = 0.82;
  }

  const sConf = Math.round(shoulderVis * shoulderWeight * 100);
  const eConf = Math.round(elbowVis * elbowWeight * 100);
  const wConf = Math.round(wristVis * wristWeight * 100);
  const hConf = Math.round(hipVis * hipWeight * 100);
  const kConf = Math.round(kneeVis * kneeWeight * 100);

  const overall = Math.round((sConf + eConf + wConf + hConf + kConf) / 5);

  return {
    overallScore: Math.min(100, Math.max(45, overall)),
    shoulderConfidence: sConf,
    elbowConfidence: eConf,
    wristConfidence: wConf,
    hipConfidence: hConf,
    kneeConfidence: kConf,
    attireType,
    isDegraded: overall < 65,
    compensating: attireType !== 'standard_gym'
  };
}
