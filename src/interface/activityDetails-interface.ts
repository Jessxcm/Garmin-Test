/*Summary de caminar + bicicleta*/
export interface ExpectedSummary {
  activityId: number;
  activityName: string;
  activityDescription?: string;
  durationInSeconds: number;
  startTimeInSeconds: number;
  startTimeOffsetInSeconds: number;
  activityType: string;
  averageHeartRateInBeatsPerMinute: number;
  //averageRunCadenceInStepsPerMinute?: number;
  averageSpeedInMetersPerSecond: number; //convertir a kilometros por hora (valor por 3.6)
  averagePaceInMinutesPerKilometer: number;  //ELIMINAR, NO SE NECESITA
  activeKilocalories: number;
  distanceInMeters: number; //convertir a kilometros
  maxHeartRateInBeatsPerMinute: number;
  maxPaceInMinutesPerKilometer: number; //ELIMINAR, NO SE NECESITA
  //maxRunCadenceInStepsPerMinute?: number;
  maxSpeedInMetersPerSecond: number; //convertir a velocidad maxima en kilometros por hora (valor por 3.6)
  totalElevationGainInMeters?: number;
  totalElevationLossInMeters?: number;
  deviceName: string;
  averageBikeCadenceInRoundsPerMinute?: number;
  maxBikeCadenceInRoundsPerMinute?: number;
  startingLatitudeInDegree?: number; //ELIMINAR, NO SE NECESITA
  startingLongitudeInDegree?: number; //ELIMINAR, NO SE NECESITA
}

export interface ConvertedSummary{
  activityId: number;
  activityName: string;
  activityDescription?: string;
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

  // Nuevas propiedades después de las conversiones
  averageSpeedInKilometersPerHour: number;
  distanceInKilometers: number;
  maxSpeedInKilometersPerHour: number;
  durationInMinutes: number;

  //propiedades del power
  averagePowerInWatts: number;
  maxPowerInWatts: number;

}

export interface Sample {
    startTimeInSeconds: number;
    latitudeInDegree: number; //ELIMINAR
    longitudeInDegree: number; //ELIMINAR
    elevationInMeters: number; //ELIMINAR
    airTemperatureCelcius: number; //ELIMINAR
    heartRate?: number;
    speedMetersPerSecond: number; //velocidad en kilometros por hora
    totalDistanceInMeters: number; //dejar en metros
    powerInWatts?: number;
    timerDurationInSeconds: number;
    clockDurationInSeconds: number;
    movingDurationInSeconds: number;
  }

  export interface ConvertedSample {
    startTimeInSeconds: number;
    heartRate?: number;
    totalDistanceInMeters: number; //dejar en metros
    powerInWatts?: number;
    timerDurationInSeconds: number;
    clockDurationInSeconds: number;
    movingDurationInSeconds: number;

    // Nuevas propiedades después de las conversiones
    speedKilometersPerHour: number;
  }

export  interface Lap {
    startTimeInSeconds: number;
  }
  

/*QUE ERA LAPS? SIEMPRE HAY?*/  
export  interface ActivityDetail {
    summaryId: string;
    activityId: number;
    summary: ExpectedSummary;
    samples: Sample[]; //9000
    laps?: Lap[];
  }
  
  export interface ActivityDetailsList {
    activitiesDetails: ActivityDetail[];
  }


export interface ConvertedActivityDetail {
  summaryId: string;
  activityId: number;
  summary: ConvertedSummary;
  samples: ConvertedSample[];
  laps?: Lap[];
}

export interface ConvertedActivityDetailsList {
  activitiesDetails: ConvertedActivityDetail[];
}
  