"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertedActivitiesDetailsListModel = exports.ActivitiesDetailsListModel = exports.ActivitiesListModel = void 0;
const mongoose_1 = require("mongoose");
/*ActivityList*/
const ActivitySchema = new mongoose_1.Schema({
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
const ActivitiesListSchema = new mongoose_1.Schema({
    activities: [ActivitySchema],
}, {
    versionKey: false
});
/*ACTIVITY DETAILS LIST*/
/*Esquema del expected summary*/
const SummarySchema = new mongoose_1.Schema({
    activityId: { type: Number, required: true },
    activityName: { type: String, required: true },
    activityDescription: { type: String, required: false },
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
    maxBikeCadenceInRoundsPerMinute: { type: Number }
}, {
    _id: false
});
/*Esquema del converted summary */
const ConvertedSummarySchema = new mongoose_1.Schema({
    activityId: { type: Number, required: true },
    activityName: { type: String, required: true },
    activityDescription: { type: String, required: false },
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
    durationInMinutes: { type: Number, required: true }
}, {
    _id: false
});
/*Esquema del sample*/
const SampleSchema = new mongoose_1.Schema({
    startTimeInSeconds: { type: Number, required: true },
    heartRate: { type: Number, required: false },
    speedMetersPerSecond: { type: Number, required: true },
    totalDistanceInMeters: { type: Number, required: true },
    powerInWatts: { type: Number, required: false },
    timerDurationInSeconds: { type: Number, required: true },
    clockDurationInSeconds: { type: Number, required: true },
    movingDurationInSeconds: { type: Number, required: true }
}, {
    _id: false
});
/*Esquema del sample converted*/
const ConvertedSampleSchema = new mongoose_1.Schema({
    startTimeInSeconds: { type: Number, required: true },
    heartRate: { type: Number, required: false },
    totalDistanceInMeters: { type: Number, required: true },
    powerInWatts: { type: Number, required: false },
    timerDurationInSeconds: { type: Number, required: true },
    clockDurationInSeconds: { type: Number, required: true },
    movingDurationInSeconds: { type: Number, required: true },
    speedKilometersPerHour: { type: Number, required: true }
}, {
    _id: false
});
/*Esquema del lap*/
const LapSchema = new mongoose_1.Schema({
    startTimeInSeconds: { type: Number, required: true }
}, {
    _id: false
});
/*Esquema activity details como viene*/
const ActivityDetailSchema = new mongoose_1.Schema({
    summaryId: { type: String, required: true },
    activityId: { type: Number, required: true },
    summary: { type: SummarySchema, required: true },
    samples: { type: [SampleSchema], required: true },
    laps: { type: [LapSchema] },
});
/*Esquema activity details converted*/
const ConvertedActivityDetailSchema = new mongoose_1.Schema({
    summaryId: { type: String, required: true },
    activityId: { type: Number, required: true },
    summary: { type: ConvertedSummarySchema, required: true },
    samples: { type: [ConvertedSampleSchema], required: true },
    laps: { type: [LapSchema] },
});
const ActivityDetailsListSchema = new mongoose_1.Schema({
    activitiesDetails: { type: [ActivityDetailSchema], required: true }
}, { versionKey: false
});
const ConvertedActivityDetailsListSchema = new mongoose_1.Schema({
    activitiesDetails: { type: [ConvertedActivityDetailSchema], required: true }
}, { versionKey: false
});
exports.ActivitiesListModel = (0, mongoose_1.model)('ActivitiesList', ActivitiesListSchema);
exports.ActivitiesDetailsListModel = (0, mongoose_1.model)('ActivitiesDetailsList', ActivityDetailsListSchema);
exports.ConvertedActivitiesDetailsListModel = (0, mongoose_1.model)('ConvertedActivitiesDetailsList', ConvertedActivityDetailsListSchema);
