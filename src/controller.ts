import { Request, Response } from "express";
import axios, { AxiosRequestConfig } from 'axios';
import { ActivityDetails } from './interface/interface';
import { Workout } from "./interface/workout-interface";
import oauthSignature from 'oauth-signature';
import * as uuid from 'uuid';



export function authorizationHeader(authdata: any,urlApi: string, httpMethod: string, queryParameters: any ): any{
  const consumerKey =  authdata.consumerKey
  const consumerSecret = authdata.consumerSecret
  const accessToken = authdata.accessToken;
  const tokenSecret = authdata.tokenSecret;

  //const urlApi = 'https://apis.garmin.com/wellness-api/rest/activityDetails';
  //const httpMethod = 'GET';
  const oauth_timestamp = Math.floor(Date.now() / 1000);
  const oauth_nonce = uuid.v1();

  //params in query
  /*const queryParameters = {
    uploadStartTimeInSeconds:1688002740,
    uploadEndTimeInSeconds:1688089140
  }*/

  //all params
  const parameters = {
    ...queryParameters,
    oauth_consumer_key : consumerKey,
    oauth_token : accessToken,
    oauth_nonce : oauth_nonce,
    oauth_timestamp : oauth_timestamp,
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  }

  // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
  const encodedSignature = oauthSignature.generate(httpMethod, urlApi, parameters, consumerSecret, tokenSecret);
  //console.log('encodedSignature: ',encodedSignature);
  
  const headers = `OAuth oauth_consumer_key="${consumerKey}",oauth_token="${accessToken}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${oauth_timestamp}",oauth_nonce="${oauth_nonce}",oauth_version="1.0",oauth_signature="${encodedSignature}"`
  console.log('headers: ', headers)

    return headers


}

export async function getActivityDetails(req: Request,res: Response): Promise <Response>{
  
  const urlApi = 'https://apis.garmin.com/wellness-api/rest/activityDetails';
  const httpMethod = 'GET';
  //params

  const queryParameters = {
    uploadStartTimeInSeconds:1688533200,
    uploadEndTimeInSeconds:1688598000
  }

  //url with params
  const urlFull = `https://apis.garmin.com/wellness-api/rest/activityDetails?uploadStartTimeInSeconds=${queryParameters.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${queryParameters.uploadEndTimeInSeconds}`;

  //auth info for 0auth1.0
  const authData = {
    consumerKey : '0c3a4d6d-6da4-4bd0-868f-84526aca037b',
    consumerSecret : 'fBfKSVgN0jw0yVokPRKqUkau1hECtmabELu',
    accessToken : '5b525eed-4037-4d50-b6c9-7e2b0056d495',
    tokenSecret : 'Edjb8vk3UePPVTj0PZMOPsCs8ARyguMOEG0'
  }

  //generate authorizationheader with Oauth1.0
  const auth = authorizationHeader(authData,urlApi,httpMethod, queryParameters)
  console.log('auth headers',auth)

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,x-apigateway-header,x-amz-date',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
    'Authorization' : auth
  }

  try {
    const response = await axios.get(urlFull, { headers: headers });
    let actdetails :[ActivityDetails]  = response.data 
    console.log('es correcto')    
    return res.status(200).json(actdetails);

  } catch (error) {
    console.log('dio error')
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }



}


export async function getWorkout(req: Request,res: Response): Promise <Response>{
  
  const httpMethod = 'GET';
  const workoutId=697284350;

  const urlFull = `https://apis.garmin.com/training-api/workout/${workoutId}`;

  //auth info for 0auth1.0
  const authData = {
    consumerKey : '0c3a4d6d-6da4-4bd0-868f-84526aca037b',
    consumerSecret : 'fBfKSVgN0jw0yVokPRKqUkau1hECtmabELu',
    accessToken : 'f67325b3-bd78-46a6-a05a-a0c0ce9150de',
    tokenSecret : 'PmQ4qu3M7xWhMZhOsKZEEU7pr3yUzS29kp1'
  }

  //generate authorizationheader with Oauth1.0
  const auth = authorizationHeader(authData,urlFull,httpMethod, '')
  console.log('auth headers',auth)

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,x-apigateway-header,x-amz-date',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
    'Authorization' : auth
  }

  try {
    const response = await axios.get(urlFull, { headers: headers });
    let actdetails :[ActivityDetails]  = response.data 
    console.log('es correcto')    
    return res.status(200).json(actdetails);

  } catch (error) {
    console.log('dio error')
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }



}

export async function createWorkout(req: Request,res: Response): Promise <Response>{
  const urlApi = 'https://apis.garmin.com/training-api/workout';
  const httpMethod = 'POST';

  //auth info for 0auth1.0
  const authData = {
    consumerKey : '0c3a4d6d-6da4-4bd0-868f-84526aca037b',
    consumerSecret : 'fBfKSVgN0jw0yVokPRKqUkau1hECtmabELu',
    accessToken : '9826af66-cdde-4a38-96a7-f7bd538810f7',
    tokenSecret : 'Ql0y96jv4byisAImwGLayvDWN713LMR54d3'
  }

  //generate authorizationheader with Oauth1.0
  const auth = authorizationHeader(authData,urlApi,httpMethod, '')
  console.log('auth headers',auth)

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,x-apigateway-header,x-amz-date',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
    'Authorization' : auth
  }

  const config: AxiosRequestConfig = {
    headers: headers,
  };

  //workout de prueba 
  const testWorkout = {
    workoutName: "1C1 ACTIVACION (1): INTERVALOS OPTIMOS",
    description: null,
    updatedDate: "2021-09-20T21:17:53.0",
    createdDate: "2018-10-23T21:17:53.0",
    sport: "CYCLING",
    estimatedDurationInSecs: null,
    estimatedDistanceInMeters: null,
    poolLength: null,
    poolLengthUnit: null,
    workoutProvider: "competitivo",
    workoutSourceId: "competitivo",
    steps: [
      {
        type: "WorkoutStep",
        stepId: 1111,
        stepOrder: 1,
        intensity: "WARMUP",
        description: null,
        durationType: "TIME",
        durationValue: 20,
        durationValueType: null,
        targetType: null,
        targetValue: null,
        targetValueLow: 56,
        targetValueHigh: 75,
        targetValueType: null,
        strokeType: null,
        equipmentType: null,
        exerciseCategory: null,
        exerciseName: "CALENTAMIENTO",
        weightValue: null,
        weightDisplayUnit: null
      },
      {
        type: "WorkoutStep",
        stepId: 222,
        stepOrder: 2,
        intensity: "WARMUP",
        description: null,
        durationType: "TIME",
        durationValue: 15,
        durationValueType: null,
        targetType: null,
        targetValue: null,
        targetValueLow: 69,
        targetValueHigh: 83,
        targetValueType: null,
        strokeType: null,
        equipmentType: null,
        exerciseCategory: null,
        exerciseName: "ACELERACIONES",
        weightValue: null,
        weightDisplayUnit: null
      }
    ]
  };

  const incomeWorkout = req.body

  try {
    const response = await axios.post(urlApi, incomeWorkout, config)
    let workout :Workout  = response.data 
    console.log('es correcto')    
    return res.status(200).json(workout);

  } catch (error) {
    console.log('dio error')
    console.error(error);
    return res.status(500).json({ error: error });
  }
}

export async function webhook(req: Request,res: Response): Promise <Response>{
  const payload = req.body;
  console.log('Datos recibidos: ', payload)
  return res.status(200).send('Webhook recibido con exito');
}

