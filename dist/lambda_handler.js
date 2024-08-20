"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivityDetailsFromGarmin = exports.activitiesDetails = exports.webhookAuth = exports.activities = exports.permChange = exports.dereg = exports.getActivitiesDetails = exports.getActivities = void 0;
const database_models_1 = require("./database-models");
const database_connection_1 = require("./database-connection");
const axios_1 = __importDefault(require("axios"));
const auth_service_1 = require("./auth-service");
const dynamodb_1 = require("aws-sdk/clients/dynamodb");
const uuid = __importStar(require("uuid"));
const documentClient = new dynamodb_1.DocumentClient({
    convertEmptyValues: true
});
function getActivities(event, context) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, database_connection_1.connectDB)();
        const activities = yield database_models_1.ActivitiesListModel.find();
        console.log('activities', JSON.stringify(activities));
        let response = {
            statusCode: 200,
            body: JSON.stringify(activities)
        };
        return response;
    });
}
exports.getActivities = getActivities;
function getActivitiesDetails(event, context) {
    return __awaiter(this, void 0, void 0, function* () {
        //connectDB();
        //const activitiesDetails = await ActivitiesDetailsListModel.find().lean()
        //console.log('activitiesDetails', JSON.stringify(activitiesDetails));
        /*let response:APIGatewayProxyResult = {
            statusCode: 200,
            body: JSON.stringify(activitiesDetails)
            
        };*/
        /*Traer los samples de la actividad*/
        const params = {
            TableName: String(process.env.STACK_DB_NAME) + '-garmin_activity_samples',
            IndexName: 'activityId-index',
            KeyConditionExpression: 'activityId = :activityIdValue',
            ExpressionAttributeValues: {
                ':activityIdValue': 11755657609, // Reemplaza esto con el valor de activityId que deseas buscar
            },
        };
        console.info('params', params);
        let dataIncome;
        yield documentClient.query(params, (err, data) => {
            if (err) {
                console.error('Error al realizar la consulta:', err);
            }
            else {
                dataIncome = data.Items;
                console.log('Resultados de la consulta:', data.Items);
            }
        });
        let response = {
            statusCode: 200,
            body: JSON.stringify(dataIncome)
        };
        return response;
    });
}
exports.getActivitiesDetails = getActivitiesDetails;
function dereg(event, context) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let body = JSON.parse((_a = event.body) !== null && _a !== void 0 ? _a : "{}");
        let dereg = body;
        console.info('dereg', JSON.stringify(dereg));
        let response = {
            statusCode: 200,
            body: JSON.stringify(dereg)
        };
        return response;
    });
}
exports.dereg = dereg;
function permChange(event, context) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let body = JSON.parse((_a = event.body) !== null && _a !== void 0 ? _a : "{}");
        let perm = body;
        console.info('perm json', JSON.stringify(perm));
        let response = {
            statusCode: 200,
            body: JSON.stringify(perm)
        };
        console.info('response', response);
        return response;
    });
}
exports.permChange = permChange;
function activities(event, context) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let body = JSON.parse((_a = event.body) !== null && _a !== void 0 ? _a : "{}");
        let activities = body;
        console.info('activities', JSON.stringify(activities));
        let newActivity = yield new database_models_1.ActivitiesListModel({
            activities: activities.activities
        });
        console.log('newActivity', newActivity);
        (0, database_connection_1.connectDB)();
        yield newActivity.save();
        let response = {
            statusCode: 200,
            body: JSON.stringify(activities)
        };
        return response;
    });
}
exports.activities = activities;
function webhookAuth(event, context) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let body = JSON.parse((_a = event.body) !== null && _a !== void 0 ? _a : "{}");
        console.info('Auth json', JSON.stringify(body));
        let response = {
            statusCode: 200,
            body: JSON.stringify(body)
        };
        console.info('response', response);
        return response;
    });
}
exports.webhookAuth = webhookAuth;
function activitiesDetails(event, context) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let body = JSON.parse((_a = event.body) !== null && _a !== void 0 ? _a : "{}");
        let activitiesDetails = body;
        console.info('activitiesDetails', JSON.stringify(activitiesDetails));
        console.info('activitiesDetails test', activitiesDetails);
        let newActivityDetails = yield new database_models_1.ActivitiesDetailsListModel({
            activitiesDetails: activitiesDetails
        });
        console.log('newActivityDetails', newActivityDetails);
        (0, database_connection_1.connectDB)();
        yield newActivityDetails.save();
        let response = {
            statusCode: 200,
            body: JSON.stringify(activitiesDetails)
        };
        return response;
    });
}
exports.activitiesDetails = activitiesDetails;
// Función para realizar las conversiones en Summary
function convertSummary(summary, averagePowerInWatts, maxPowerInWatts) {
    /*Calculo nuevos atributos*/
    const averageSpeedInKilometersPerHour = Number((summary.averageSpeedInMetersPerSecond * 3.6).toFixed(2));
    const distanceInKilometers = Number((summary.distanceInMeters / 1000).toFixed(2));
    const maxSpeedInKilometersPerHour = Number((summary.maxSpeedInMetersPerSecond * 3.6).toFixed(2));
    const durationInMinutes = Number((summary.durationInSeconds / 60).toFixed(2));
    /*Extraer los datos que ya no se necesitan de summary y quedarme con los necesarios*/
    const { averageSpeedInMetersPerSecond, distanceInMeters, maxSpeedInMetersPerSecond, averagePaceInMinutesPerKilometer, maxPaceInMinutesPerKilometer, startingLatitudeInDegree, startingLongitudeInDegree, durationInSeconds } = summary, newSummary = __rest(summary, ["averageSpeedInMetersPerSecond", "distanceInMeters", "maxSpeedInMetersPerSecond", "averagePaceInMinutesPerKilometer", "maxPaceInMinutesPerKilometer", "startingLatitudeInDegree", "startingLongitudeInDegree", "durationInSeconds"]);
    //console.info('newSummary',newSummary)
    /*Combinar los atributos necesarios con los nuevos calculados*/
    const convertedSummary = Object.assign(Object.assign({}, newSummary), { durationInMinutes, averageSpeedInKilometersPerHour, distanceInKilometers, maxSpeedInKilometersPerHour, averagePowerInWatts, maxPowerInWatts });
    return convertedSummary;
}
// Función para realizar las conversiones en Sample
function convertSample(sample) {
    const speedKilometersPerHour = Number((sample.speedMetersPerSecond * 3.6).toFixed(2));
    /*Extraer los datos que ya no se necesitan de sample y quedarme con los necesarios*/
    const { latitudeInDegree, longitudeInDegree, elevationInMeters, airTemperatureCelcius, speedMetersPerSecond } = sample, newSample = __rest(sample, ["latitudeInDegree", "longitudeInDegree", "elevationInMeters", "airTemperatureCelcius", "speedMetersPerSecond"]);
    //console.info('newSample',newSample)
    const convertedSample = Object.assign(Object.assign({}, newSample), { speedKilometersPerHour });
    //console.info('convertedSample', convertedSample)
    return convertedSample;
}
function getActivityDetailsFromGarmin() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function* () {
        yield console.info('Iniciando getActivityDetailsFromGarmin');
        const urlApi = 'https://apis.garmin.com/wellness-api/rest/activityDetails';
        const httpMethod = 'GET';
        //paramsx
        const queryParameters = {
            uploadStartTimeInSeconds: 1693375200,
            uploadEndTimeInSeconds: 1693436400
        };
        //url with params
        const urlFull = `https://apis.garmin.com/wellness-api/rest/activityDetails?uploadStartTimeInSeconds=${queryParameters.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${queryParameters.uploadEndTimeInSeconds}`;
        //auth info for 0auth1.0
        const authData = {
            consumerKey: '0c3a4d6d-6da4-4bd0-868f-84526aca037b',
            consumerSecret: 'fBfKSVgN0jw0yVokPRKqUkau1hECtmabELu',
            accessToken: '5b525eed-4037-4d50-b6c9-7e2b0056d495',
            tokenSecret: 'Edjb8vk3UePPVTj0PZMOPsCs8ARyguMOEG0'
        };
        //generate authorizationheader with Oauth1.0
        const auth = (0, auth_service_1.authorizationHeader)(authData, urlApi, httpMethod, queryParameters);
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization,x-apigateway-header,x-amz-date',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
            'Authorization': auth
        };
        try {
            const res = yield axios_1.default.get(urlFull, { headers: headers });
            const actdetailsList = res.data;
            const size = res.data.length;
            /*INTENTAR PROCESAR LA INFORMACIÓN*/
            for (let index = 0; index < size; index++) {
                let averagePower = 0;
                let sumPower = 0;
                let maxPower = 0;
                let powerCount = 0;
                const sampleslength = actdetailsList[index].samples.length;
                /*Generar el converted sample*/
                let convertedSampleList = [];
                for (let j = 0; j < sampleslength; j++) {
                    const convertedSample = convertSample(actdetailsList[index].samples[j]);
                    //console.info('convertedSample',convertedSample)
                    convertedSampleList.push(convertedSample);
                    //console.info('iserting sample to dynamo');
                    //await insertSampleDynamoDB(convertedSample,actdetailsList[index].activityId );
                    //Guardar potencia maxima
                    if (((_b = (_a = actdetailsList[index]) === null || _a === void 0 ? void 0 : _a.samples[j]) === null || _b === void 0 ? void 0 : _b.powerInWatts) !== undefined) {
                        sumPower = sumPower + ((_d = (_c = actdetailsList[index]) === null || _c === void 0 ? void 0 : _c.samples[j]) === null || _d === void 0 ? void 0 : _d.powerInWatts);
                        powerCount += 1;
                        if (((_f = (_e = actdetailsList[index]) === null || _e === void 0 ? void 0 : _e.samples[j]) === null || _f === void 0 ? void 0 : _f.powerInWatts) > maxPower) {
                            maxPower = (_h = (_g = actdetailsList[index]) === null || _g === void 0 ? void 0 : _g.samples[j]) === null || _h === void 0 ? void 0 : _h.powerInWatts;
                        }
                    }
                }
                averagePower = Number((sumPower / powerCount).toFixed(2));
                console.log('powerCount', powerCount);
                console.log('averagePower', averagePower);
                console.log('maxPower', maxPower);
                /*Generar el converted summary*/
                const convertedSummary = convertSummary(actdetailsList[index].summary, averagePower, maxPower);
                //console.info('convertedSummary',convertedSummary)
                console.info('inserting summary to dynamo');
                yield insertSummaryDynamoDB(convertedSummary);
            }
        }
        catch (error) {
            console.info('error', error);
        }
    });
}
exports.getActivityDetailsFromGarmin = getActivityDetailsFromGarmin;
function insertSampleDynamoDB(newItem, activityId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = uuid.v1();
        const dbSample = Object.assign({ id, activityId }, newItem);
        const params = {
            TableName: String(process.env.STACK_DB_NAME) + '-garmin_activity_samples',
            Item: dbSample
        };
        yield documentClient.put(params).promise()
            .then(() => {
            console.log('Sample insertado correctamente.');
        })
            .catch((error) => {
            console.error('Error al insertar sample:', error);
        });
    });
}
function insertSummaryDynamoDB(newSummary) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            TableName: String(process.env.STACK_DB_NAME) + '-garmin_activity_summary',
            Item: newSummary
        };
        yield documentClient.put(params).promise()
            .then(() => {
            console.log('Summary insertado correctamente.');
        })
            .catch((error) => {
            console.error('Error al insertar el elemento:', error);
        });
    });
}
/*async function insertActivityDynamoDB(newSummary: ConvertedSummary, newSample: ConvertedSample){

  console.info('iserting activity to dynamo');
  
  const { startTimeInSeconds,
     ...sample } = newSample;
    
  const startTimeInSecondsSample = newSample.startTimeInSeconds

  const id= uuid.v1();

  const activity: DBActivity = {id,...newSummary,startTimeInSecondsSample,...sample }

  const params = {
    TableName: String(process.env.STACK_DB_NAME) + '-garmin_activity',
    Item: activity
  }

  documentClient.put(params).promise()
  .then(() => {
    console.log('Elemento insertado correctamente.');
  })
  .catch((error) => {
    console.error('Error al insertar el elemento:', error);
  });

}*/
