
interface Summary {
    activityId: number;
    activityName: string;
    activityDescription: string;
    durationInSeconds: number;
    startTimeInSeconds: number;
    startTimeOffsetInSeconds: number;
    activityType: string;
    averageHeartRateInBeatsPerMinute: number;
    averageRunCadenceInStepsPerMinute: number;
    averageSpeedInMetersPerSecond: number;
    averagePaceInMinutesPerKilometer: number;
    activeKilocalories: number;
    distanceInMeters: number;
    maxHeartRateInBeatsPerMinute: number;
    maxPaceInMinutesPerKilometer: number;
    maxRunCadenceInStepsPerMinute: number;
    maxSpeedInMetersPerSecond: number;
    steps: number;
    totalElevationGainInMeters: number;
  }
  
  interface Sample {
    startTimeInSeconds: number;
    speedMetersPerSecond: number;
    totalDistanceInMeters: number;
    timerDurationInSeconds: number;
    clockDurationInSeconds: number;
    movingDurationInSeconds: number;
  }
  
  export interface ActivityDetails {
    summaryId: string;
    activityId: number;
    summaryOpt: SummaryOptional;
    samples: Sample[];
  }
  
  export interface SummaryOptional extends Partial<Summary> {}


