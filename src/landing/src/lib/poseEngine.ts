import type { PoseLandmarks, Point2D } from './types';

// Browser-ready MediaPipe Pose loader with dynamic fallback simulation
export class PoseDetector {
  private videoElement: HTMLVideoElement | null = null;
  private animFrameId: number | null = null;
  private isSimulating = false;
  private simTime = 0;
  private simExercise: string = 'band_pull';
  private onResults: (landmarks: PoseLandmarks, timestamp: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mpPoseInstance: any = null;
  private isProcessingFrame = false;

  constructor(onResults: (landmarks: PoseLandmarks, timestamp: number) => void) {
    this.onResults = onResults;
    this.initMediaPipe();
  }

  private async initMediaPipe() {
    if (typeof window === 'undefined') return;
    try {
      // Check if MediaPipe is available via window or dynamic import
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mpPose = (window as any).Pose || (await import('@mediapipe/pose')).Pose;
      if (mpPose) {
        this.mpPoseInstance = new mpPose({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });
        this.mpPoseInstance.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.mpPoseInstance.onResults((results: any) => {
          this.isProcessingFrame = false;
          if (results && results.poseLandmarks) {
            const raw = results.poseLandmarks;
            const lms: PoseLandmarks = {
              leftShoulder: raw[11] ? { x: raw[11].x, y: raw[11].y, visibility: raw[11].visibility, z: raw[11].z } : undefined,
              rightShoulder: raw[12] ? { x: raw[12].x, y: raw[12].y, visibility: raw[12].visibility, z: raw[12].z } : undefined,
              leftElbow: raw[13] ? { x: raw[13].x, y: raw[13].y, visibility: raw[13].visibility, z: raw[13].z } : undefined,
              rightElbow: raw[14] ? { x: raw[14].x, y: raw[14].y, visibility: raw[14].visibility, z: raw[14].z } : undefined,
              leftWrist: raw[15] ? { x: raw[15].x, y: raw[15].y, visibility: raw[15].visibility, z: raw[15].z } : undefined,
              rightWrist: raw[16] ? { x: raw[16].x, y: raw[16].y, visibility: raw[16].visibility, z: raw[16].z } : undefined,
              leftHip: raw[23] ? { x: raw[23].x, y: raw[23].y, visibility: raw[23].visibility, z: raw[23].z } : undefined,
              rightHip: raw[24] ? { x: raw[24].x, y: raw[24].y, visibility: raw[24].visibility, z: raw[24].z } : undefined,
              leftKnee: raw[25] ? { x: raw[25].x, y: raw[25].y, visibility: raw[25].visibility, z: raw[25].z } : undefined,
              rightKnee: raw[26] ? { x: raw[26].x, y: raw[26].y, visibility: raw[26].visibility, z: raw[26].z } : undefined,
              leftAnkle: raw[27] ? { x: raw[27].x, y: raw[27].y, visibility: raw[27].visibility, z: raw[27].z } : undefined,
              rightAnkle: raw[28] ? { x: raw[28].x, y: raw[28].y, visibility: raw[28].visibility, z: raw[28].z } : undefined,
            };
            this.onResults(lms, Date.now());
          }
        });
      }
    } catch (err) {
      console.warn('MediaPipe Pose WebAssembly not loaded, will use fallback estimator:', err);
    }
  }

  public setVideoSource(video: HTMLVideoElement, isSimulation = false, exerciseType = 'band_pull') {
    this.videoElement = video;
    this.isSimulating = isSimulation;
    this.simExercise = exerciseType;
    this.startLoop();
  }

  public setSimExercise(exerciseType: string) {
    this.simExercise = exerciseType;
  }

  public stop() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private startLoop() {
    this.stop();
    const loop = () => {
      if (this.isSimulating || !this.videoElement || this.videoElement.paused || this.videoElement.ended) {
        // Natural speed simulation that accurately cycles through exercise phases
        this.simTime += 0.04;
        const landmarks = this.generateTargetedSyntheticPose(this.simTime, this.simExercise);
        this.onResults(landmarks, Date.now());
      } else if (this.videoElement && this.videoElement.readyState >= 2) {
        // Send real camera frame to MediaPipe if initialized
        if (this.mpPoseInstance && !this.isProcessingFrame) {
          this.isProcessingFrame = true;
          this.mpPoseInstance.send({ image: this.videoElement }).catch(() => {
            this.isProcessingFrame = false;
          });
        }
      }
      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  // Generates genuine physical therapy exercise cycles with dynamically fluctuating landmark confidence
  private generateTargetedSyntheticPose(t: number, exercise: string): PoseLandmarks {
    // Phase calculation: cycle from 0 to 1 and back
    const phase = (Math.sin(t) + 1) / 2; // 0 = start, 1 = peak
    const confidenceFlutter = 0.85 + 0.12 * Math.sin(t * 3.5);

    const leftShoulder: Point2D = { x: 0.40, y: 0.32, visibility: 0.96 };
    const rightShoulder: Point2D = { x: 0.60, y: 0.32, visibility: 0.96 };
    let leftElbow: Point2D = { x: 0.34, y: 0.50, visibility: 0.92 };
    let rightElbow: Point2D = { x: 0.66, y: 0.50, visibility: 0.92 };
    let leftWrist: Point2D = { x: 0.36, y: 0.68, visibility: 0.90 };
    let rightWrist: Point2D = { x: 0.64, y: 0.68, visibility: 0.90 };

    if (exercise === 'band_pull') {
      // Resistance band pull: elbows and wrists move apart horizontally (wrist_distance varies 0.15 -> 0.55)
      const apart = phase; // 0: together, 1: apart
      leftElbow = { x: 0.42 - 0.20 * apart, y: 0.45, visibility: confidenceFlutter };
      rightElbow = { x: 0.58 + 0.20 * apart, y: 0.45, visibility: confidenceFlutter };
      leftWrist = { x: 0.45 - 0.25 * apart, y: 0.46, visibility: confidenceFlutter };
      rightWrist = { x: 0.55 + 0.25 * apart, y: 0.46, visibility: confidenceFlutter };

    } else if (exercise === 'lat_raise') {
      // Lateral raises: arms raise out to sides (avg_wrist moves from 0.65 down to 0.28, which is above shoulder 0.32)
      const up = phase;
      leftElbow = { x: 0.38 - 0.22 * up, y: 0.52 - 0.20 * up, visibility: confidenceFlutter };
      rightElbow = { x: 0.62 + 0.22 * up, y: 0.52 - 0.20 * up, visibility: confidenceFlutter };
      leftWrist = { x: 0.36 - 0.28 * up, y: 0.68 - 0.42 * up, visibility: confidenceFlutter };
      rightWrist = { x: 0.64 + 0.28 * up, y: 0.68 - 0.42 * up, visibility: confidenceFlutter };

    } else if (exercise === 'bicep_curl_left') {
      // Left arm flexes up (angle varies 165° down to 25°)
      const flex = phase;
      leftElbow = { x: 0.35, y: 0.50, visibility: confidenceFlutter };
      leftWrist = { x: 0.36, y: 0.68 - 0.45 * flex, visibility: confidenceFlutter };

    } else if (exercise === 'bicep_curl_right') {
      // Right arm flexes up
      const flex = phase;
      rightElbow = { x: 0.65, y: 0.50, visibility: confidenceFlutter };
      rightWrist = { x: 0.64, y: 0.68 - 0.45 * flex, visibility: confidenceFlutter };

    } else if (exercise === 'punch') {
      // Forward extension: punch forward
      const punch = phase;
      rightElbow = { x: 0.60 + 0.05 * punch, y: 0.42 - 0.08 * punch, visibility: confidenceFlutter };
      rightWrist = { x: 0.62 + 0.15 * punch, y: 0.38 - 0.12 * punch, visibility: confidenceFlutter };

    } else if (exercise === 'slice') {
      // Downward slices: hands start up (y=0.20) and swing down (y=0.68)
      const slice = phase;
      leftWrist = { x: 0.38, y: 0.20 + 0.48 * slice, visibility: confidenceFlutter };
      rightWrist = { x: 0.62, y: 0.20 + 0.48 * slice, visibility: confidenceFlutter };

    } else if (exercise === 'hooks') {
      // Circular motion: angle sweeps in circles
      const circleAngle = t * 2.0;
      leftWrist = {
        x: 0.40 + 0.15 * Math.cos(circleAngle),
        y: 0.50 + 0.15 * Math.sin(circleAngle),
        visibility: confidenceFlutter
      };
    }

    const hipOcclusion = 0.68 + 0.15 * Math.sin(t * 2);
    const kneeOcclusion = 0.62 + 0.18 * Math.sin(t * 2 + 1);

    const leftHip: Point2D = { x: 0.44, y: 0.60, visibility: hipOcclusion };
    const rightHip: Point2D = { x: 0.56, y: 0.60, visibility: hipOcclusion };
    const leftKnee: Point2D = { x: 0.43, y: 0.78, visibility: kneeOcclusion };
    const rightKnee: Point2D = { x: 0.57, y: 0.78, visibility: kneeOcclusion };
    const leftAnkle: Point2D = { x: 0.42, y: 0.94, visibility: 0.78 };
    const rightAnkle: Point2D = { x: 0.58, y: 0.94, visibility: 0.78 };

    return {
      leftShoulder,
      rightShoulder,
      leftElbow,
      rightElbow,
      leftWrist,
      rightWrist,
      leftHip,
      rightHip,
      leftKnee,
      rightKnee,
      leftAnkle,
      rightAnkle
    };
  }
}
