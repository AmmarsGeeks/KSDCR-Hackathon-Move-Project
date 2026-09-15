export type ExerciseId = 'bicep_curl_left' | 'bicep_curl_right' | 'lat_raise' | 'band_pull' | 'punch' | 'slice';

export interface Point2D {
  x: number;
  y: number;
  visibility?: number;
  z?: number;
}

export interface PoseLandmarks {
  leftShoulder?: Point2D;
  rightShoulder?: Point2D;
  leftElbow?: Point2D;
  rightElbow?: Point2D;
  leftWrist?: Point2D;
  rightWrist?: Point2D;
  leftHip?: Point2D;
  rightHip?: Point2D;
  leftKnee?: Point2D;
  rightKnee?: Point2D;
  leftAnkle?: Point2D;
  rightAnkle?: Point2D;
  allLandmarks?: Point2D[];
}

export interface ExerciseMetrics {
  reps: number;
  stage: 'up' | 'down' | 'rest' | 'punch' | 'together' | 'apart' | 'ready';
  currentAngle: number;
  targetAngle: number;
  romPercentage: number;
  tempoScore: number;
  formFeedback: string;
  speedFeedback: 'Good Form!' | 'Speed Up!' | 'Slow Down!' | 'Get Ready';
  isGoodForm: boolean;
  timeInRep: number;
}

export interface OcclusionConfidence {
  overallScore: number;
  shoulderConfidence: number;
  elbowConfidence: number;
  wristConfidence: number;
  hipConfidence: number;
  kneeConfidence: number;
  attireType: 'standard_gym' | 'thobe_standard' | 'abaya_flowing' | 'hijab_loose';
  isDegraded: boolean;
  compensating: boolean;
}

export interface GameScore {
  points: number;
  combo: number;
  maxCombo: number;
  accuracy: number;
  itemsCollected: number;
  stars: number;
}
