import { model,Schema, Model, Document } from "mongoose";
import  { ActivitiesList, Activity, Activity3 } from "./interface/activity-interface";
import { ActivityDetailsList, Sample, ActivityDetail, ExpectedSummary, Lap, ConvertedSummary, ConvertedActivityDetail, ConvertedActivityDetailsList, ConvertedSample } from "./interface/activityDetails-interface";

  
/*ActivityList*/
const ActivitySchema: Schema<Activity3> = new Schema({
  userId: { type: String, required: true },
  userAccessToken: { type: String, required: true },
  summaryId: { type: String, required: true },
  activityId: { type: Number, required: true },
  activityName: { type: String, required: true },
  activityDescription: { type: String, required: false },
  durationInSeconds: { type: Number, required: true },
  startTimeInSeconds: { type: Number, required: true },
  startTimeOffsetInSeconds: { type: Number, required: true },
  activityType: { type: String, required: true },
  averageHeartRateInBeatsPerMinute: { type: Number, required: true },
  averageRunCadenceInStepsPerMinute: { type: Number, required: false },
  averageSpeedInMetersPerSecond: { type: Number, required: true },
  averagePaceInMinutesPerKilometer: { type: Number, required: true },
  activeKilocalories: { type: Number, required: true },
  distanceInMeters: { type: Number, required: true },
  maxHeartRateInBeatsPerMinute: { type: Number, required: true },
  maxPaceInMinutesPerKilometer: { type: Number, required: true },
  maxRunCadenceInStepsPerMinute: { type: Number, required: false },
  maxSpeedInMetersPerSecond: { type: Number, required: true },
  steps: { type: Number, required: false },
  totalElevationGainInMeters: { type: Number, required: true },
});

const ActivitiesListSchema: Schema<ActivitiesList> = new Schema({
  activities: [ActivitySchema],
}, { 
  versionKey: false 
});


/*ACTIVITY DETAILS LIST*/

/*Esquema del expected summary*/
const SummarySchema: Schema<ExpectedSummary> = new Schema({
  activityId: { type: Number, required: true },
  activityName: { type: String, required: true },
  activityDescription: { type: String , required: false },
  durationInSeconds: { type: Number, required: true },
  startTimeInSeconds: { type: Number, required: true },
  startTimeOffsetInSeconds: { type: Number, required: true },
  activityType: { type: String, required: true },
  averageHeartRateInBeatsPerMinute: { type: Number, required: true },
  //averageRunCadenceInStepsPerMinute: { type: Number },
  averageSpeedInMetersPerSecond: { type: Number, required: true },
  activeKilocalories: { type: Number, required: true },
  distanceInMeters: { type: Number, required: true },
  maxHeartRateInBeatsPerMinute: { type: Number, required: true },
  //maxRunCadenceInStepsPerMinute: { type: Number },
  maxSpeedInMetersPerSecond: { type: Number, required: true },
  totalElevationGainInMeters: { type: Number },
  totalElevationLossInMeters: { type: Number },
  deviceName: { type: String },
  averageBikeCadenceInRoundsPerMinute: { type: Number },
  maxBikeCadenceInRoundsPerMinute: { type: Number }},
  {
    _id: false
  }
  );

/*Esquema del converted summary */
const ConvertedSummarySchema: Schema<ConvertedSummary> = new Schema({
  activityId: { type: Number, required: true },
  activityName: { type: String, required: true },
  activityDescription: { type: String , required: false },
  //durationInSeconds: { type: Number, required: true },
  startTimeInSeconds: { type: Number, required: true },
  startTimeOffsetInSeconds: { type: Number, required: true },
  activityType: { type: String, required: true },
  averageHeartRateInBeatsPerMinute: { type: Number, required: true },
  activeKilocalories: { type: Number, required: true },
  maxHeartRateInBeatsPerMinute: { type: Number, required: true },
  totalElevationGainInMeters: { type: Number },
  totalElevationLossInMeters: { type: Number },
  deviceName: { type: String },
  averageBikeCadenceInRoundsPerMinute: { type: Number },
  maxBikeCadenceInRoundsPerMinute: { type: Number },
  averageSpeedInKilometersPerHour: { type: Number, required: true },
  distanceInKilometers: { type: Number, required: true },
  maxSpeedInKilometersPerHour: { type: Number, required: true },
  averagePowerInWatts: { type: Number, required: true },
  maxPowerInWatts: { type: Number, required: true },
  durationInMinutes: { type: Number, required: true }},
  {
    _id: false
  }
  );

/*Esquema del sample*/
const SampleSchema: Schema<Sample> = new Schema({
  startTimeInSeconds: { type: Number, required: true },
  heartRate: { type: Number, required: false },
  speedMetersPerSecond: { type: Number, required: true },
  totalDistanceInMeters: { type: Number, required: true },
  powerInWatts: { type: Number, required: false },
  timerDurationInSeconds: { type: Number, required: true },
  clockDurationInSeconds: { type: Number, required: true },
  movingDurationInSeconds: { type: Number, required: true }},
  {
    _id: false
  }
  );

/*Esquema del sample converted*/
const ConvertedSampleSchema: Schema<ConvertedSample> = new Schema({
  startTimeInSeconds: { type: Number, required: true },
  heartRate: { type: Number, required: false },
  totalDistanceInMeters: { type: Number, required: true },
  powerInWatts: { type: Number, required: false },
  timerDurationInSeconds: { type: Number, required: true },
  clockDurationInSeconds: { type: Number, required: true },
  movingDurationInSeconds: { type: Number, required: true },
  speedKilometersPerHour: { type: Number, required: true }},
  {
    _id: false
  }
  );

/*Esquema del lap*/
const LapSchema: Schema<Lap> = new Schema({
  startTimeInSeconds: { type: Number, required: true }},
  {
    _id: false
  });

/*Esquema activity details como viene*/
const ActivityDetailSchema: Schema<ActivityDetail> = new Schema({
  summaryId: { type: String, required: true },
  activityId: { type: Number, required: true },
  summary: { type: SummarySchema, required: true },
  samples: { type: [SampleSchema], required: true },
  laps: { type: [LapSchema] },
});

/*Esquema activity details converted*/

const ConvertedActivityDetailSchema: Schema<ConvertedActivityDetail> = new Schema({
  summaryId: { type: String, required: true },
  activityId: { type: Number, required: true },
  summary: { type: ConvertedSummarySchema, required: true },
  samples: { type: [ConvertedSampleSchema], required: true },
  laps: { type: [LapSchema] },
});


const ActivityDetailsListSchema: Schema<ActivityDetailsList> = new Schema({
  activitiesDetails: { type: [ActivityDetailSchema], required: true }},
  {versionKey: false 
});

const ConvertedActivityDetailsListSchema: Schema<ConvertedActivityDetailsList> = new Schema({
  activitiesDetails: { type: [ConvertedActivityDetailSchema], required: true }},
  {versionKey: false 
});

 
export const ActivitiesListModel: Model<ActivitiesList> = model<ActivitiesList>('ActivitiesList', ActivitiesListSchema);

export const ActivitiesDetailsListModel: Model<ActivityDetailsList> = model<ActivityDetailsList>('ActivitiesDetailsList', ActivityDetailsListSchema);

export const ConvertedActivitiesDetailsListModel: Model<ConvertedActivityDetailsList> = model<ConvertedActivityDetailsList>('ConvertedActivitiesDetailsList', ConvertedActivityDetailsListSchema);