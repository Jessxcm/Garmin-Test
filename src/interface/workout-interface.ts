export interface Workout {
    workoutId?: number,
    ownerId?: number,
    workoutName: string;
    description: string | null;
    updatedDate: string;
    createdDate: string;
    sport: string;
    estimatedDurationInSecs: number | null;
    estimatedDistanceInMeters: number | null;
    poolLength?: number | null;
    poolLengthUnit?: string | null;
    workoutProvider: string;
    workoutSourceId: string;
    steps: WorkoutStep[];
  }
  
  interface WorkoutStep {
    type: string;
    stepId: number;
    stepOrder: number;
    intensity: string;
    description: string | null;
    durationType: string;
    durationValue: number;
    durationValueType: string | null;
    targetType: string | null;
    targetValue: number | null;
    targetValueLow: number;
    targetValueHigh: number;
    targetValueType: string | null;
    strokeType: string | null;
    equipmentType: string | null;
    exerciseCategory: string | null;
    exerciseName: string;
    weightValue: number | null;
    weightDisplayUnit: string | null;
  }
  