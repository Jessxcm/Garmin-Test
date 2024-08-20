export interface DBSample {
    id: string; //el id unico de la tabla
    activityId: number; // con este vamos a buscar en ambas tablas
    startTimeInSeconds: number;
    heartRate?: number;
    totalDistanceInMeters: number; 
    powerInWatts?: number;
    timerDurationInSeconds: number;
    clockDurationInSeconds: number;
    movingDurationInSeconds: number;
    speedKilometersPerHour: number;
  }

  export interface DBSummary{
    activityId: number; //el id unico de la tabla
    activityName: string;
    activityDescription?: string;
    durationInSeconds: number;
    startTimeInSeconds: number;
    startTimeOffsetInSeconds: number;
    activityType: string;
    averageHeartRateInBeatsPerMinute: number;
    activeKilocalories: number;
    maxHeartRateInBeatsPerMinute: number;
    totalElevationGainInMeters?: number;
    totalElevationLossInMeters?: number;
    deviceName: string;
    averageBikeCadenceInRoundsPerMinute?: number;
    maxBikeCadenceInRoundsPerMinute?: number;
    averageSpeedInKilometersPerHour: number;
    distanceInKilometers: number;
    maxSpeedInKilometersPerHour: number;
  }

  export  interface Lap {
    activityId: number; //el id unico de esta tabla
    startTimeInSeconds: number;
  }
  

  export interface DBActivityDetail {
    summaryId: string;
    activityId: number;
    summary: DBSummary;
    samples: DBSample[];
    laps?: Lap[];
  }

  export interface DBActivity{
    /*todo lo que esta dentro de summary*/
    id: string; //el id unico de la tabla
    activityId: number; //con el que vamos a buscar
    activityName: string;
    activityDescription?: string;
    durationInSeconds: number;
    startTimeInSeconds: number;
    startTimeOffsetInSeconds: number;
    activityType: string;
    averageHeartRateInBeatsPerMinute: number;
    activeKilocalories: number;
    maxHeartRateInBeatsPerMinute: number;
    totalElevationGainInMeters?: number;
    totalElevationLossInMeters?: number;
    deviceName: string;
    averageBikeCadenceInRoundsPerMinute?: number;
    maxBikeCadenceInRoundsPerMinute?: number;
    averageSpeedInKilometersPerHour: number;
    distanceInKilometers: number;
    maxSpeedInKilometersPerHour: number;

    /*todo lo que esta dentro de un sample*/
    startTimeInSecondsSample: number;
    heartRate?: number;
    totalDistanceInMeters: number; 
    powerInWatts?: number;
    timerDurationInSeconds: number;
    clockDurationInSeconds: number;
    movingDurationInSeconds: number;
    speedKilometersPerHour: number;
  }