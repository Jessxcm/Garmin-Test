import { Document } from "mongoose";
 
  /*Interfaz que viene del garmin para bicicleta*/
  export interface Activity {
    userId: string;
    userAccessToken: string;
    summaryId: string;
    activityId: number;
    activityName: string;
    durationInSeconds: number;
    startTimeInSeconds: number;
    startTimeOffsetInSeconds: number;
    activityType: string;
    averageBikeCadenceInRoundsPerMinute: number;
    averageHeartRateInBeatsPerMinute: number;
    averageSpeedInMetersPerSecond: number;
    averagePaceInMinutesPerKilometer: number;
    activeKilocalories: number;
    deviceName: string;
    distanceInMeters: number;
    maxBikeCadenceInRoundsPerMinute: number;
    maxHeartRateInBeatsPerMinute: number;
    maxPaceInMinutesPerKilometer: number;
    maxSpeedInMetersPerSecond: number;
    startingLatitudeInDegree: number;
    startingLongitudeInDegree: number;
    totalElevationGainInMeters: number;
    totalElevationLossInMeters: number;
  }

  /*Interfaz que viene de la actividad generada en garmin tool, es una actividad de caminar*/
  export interface Activity2 {
    userId: string;
    userAccessToken: string;
    summaryId: string;
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
  

  /*Actividad de correr + bicicleta*/
  export interface Activity3 {
    userId: string;
    userAccessToken: string;
    summaryId: string;
    activityId: number;
    activityName: string;
    activityDescription?: string;
    durationInSeconds: number;
    startTimeInSeconds: number;
    startTimeOffsetInSeconds: number;
    activityType: string;
    averageHeartRateInBeatsPerMinute: number;
    averageRunCadenceInStepsPerMinute?: number;
    averageSpeedInMetersPerSecond: number;
    averagePaceInMinutesPerKilometer: number;
    activeKilocalories: number;
    distanceInMeters: number;
    maxHeartRateInBeatsPerMinute: number;
    maxPaceInMinutesPerKilometer: number;
    maxRunCadenceInStepsPerMinute?: number;
    maxSpeedInMetersPerSecond: number;
    steps?: number;
    totalElevationGainInMeters: number;
  }

  export interface ActivitiesList {
    activities: Activity3[];
  }

  export interface ActivitiesListDB extends Document {
    activities: Activity[];
  }