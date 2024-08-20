import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DeregResponse } from "./interface/deregistration-interface";
import { PermChangeResponse } from "./interface/permission-interface";
import { ActivitiesList } from "./interface/activity-interface";
import { ActivityDetailsList, ActivityDetail, ExpectedSummary, ConvertedSummary, Sample, ConvertedSample, ConvertedActivityDetail, ConvertedActivityDetailsList } from './interface/activityDetails-interface';
import { ActivitiesDetailsListModel, ActivitiesListModel, ConvertedActivitiesDetailsListModel } from './database-models';
import { connectDB } from './database-connection';
import axios from 'axios';
import { authorizationHeader } from "./auth-service";
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import * as uuid from 'uuid';
import { DBActivity, DBSample, DBSummary } from "./interface/activity-db-interface";

const documentClient = new DocumentClient({
  convertEmptyValues: true
})



export async function getActivities(event: APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult> {
    
  connectDB();
  const activities = await ActivitiesListModel.find();
  console.log('activities', JSON.stringify(activities));

  let response:APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify(activities)
      
  };
  
  return response;​

}

export async function getActivitiesDetails(event: APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult> {
    
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
    IndexName: 'activityId-index', // Nombre del índice global secundario
    KeyConditionExpression: 'activityId = :activityIdValue', // Condición de búsqueda
    ExpressionAttributeValues: {
      ':activityIdValue':11755657609, // Reemplaza esto con el valor de activityId que deseas buscar
    },
  };

  console.info('params',params)

  let dataIncome;

  await documentClient.query(params, (err, data) => {
    if (err) {
      console.error('Error al realizar la consulta:', err);
    } else {
      dataIncome=data.Items;
      console.log('Resultados de la consulta:', data.Items);
    }
  });

  let response:APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify(dataIncome)
      
  };
  
  return response

}

export async function dereg(event:APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult>{

    let body = JSON.parse(event.body??"{}");
    let dereg:DeregResponse  = body 
    console.info('dereg',JSON.stringify(dereg))

    


    let response:APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(dereg)

    };

    return response;​

}

export async function permChange(event:APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult>{
  let body = JSON.parse(event.body??"{}");
  let perm:PermChangeResponse  = body;
  console.info('perm json',JSON.stringify(perm))

  let response:APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify(perm)
  };

  console.info('response', response)

  return response
}

export async function activities(event:APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult>{

  let body = JSON.parse(event.body??"{}");
  let activities:ActivitiesList  = body 
  console.info('activities',JSON.stringify(activities))

  let newActivity= await new ActivitiesListModel({
    activities : activities.activities
})

console.log('newActivity', newActivity)

connectDB(); 
await newActivity.save();


  let response:APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify(activities)

  };

  return response;​

}

export async function webhookAuth(event:APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult>{
  let body = JSON.parse(event.body??"{}");
  console.info('Auth json',JSON.stringify(body))

  let response:APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify(body)
  };

  console.info('response', response)

  return response
}

export async function activitiesDetails(event:APIGatewayProxyEvent, context: any): Promise<APIGatewayProxyResult>{

  let body = JSON.parse(event.body??"{}");
  let activitiesDetails:ActivityDetail[]  = body 
  console.info('activitiesDetails',JSON.stringify(activitiesDetails))
  console.info('activitiesDetails test',activitiesDetails)
let newActivityDetails= await new ActivitiesDetailsListModel({
  activitiesDetails : activitiesDetails
})


console.log('newActivityDetails', newActivityDetails)

connectDB(); 
await newActivityDetails.save();

  let response:APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify(activitiesDetails)

  };

  return response;​

}


// Función para realizar las conversiones en Summary
function convertSummary(summary: ExpectedSummary, averagePowerInWatts: number, maxPowerInWatts: number): ConvertedSummary {
  /*Calculo nuevos atributos*/
  
  const averageSpeedInKilometersPerHour = Number((summary.averageSpeedInMetersPerSecond * 3.6).toFixed(2));
  const distanceInKilometers = Number((summary.distanceInMeters / 1000).toFixed(2));
  const maxSpeedInKilometersPerHour = Number((summary.maxSpeedInMetersPerSecond * 3.6).toFixed(2));
  const durationInMinutes = Number((summary.durationInSeconds / 60).toFixed(2));


  /*Extraer los datos que ya no se necesitan de summary y quedarme con los necesarios*/
  const { averageSpeedInMetersPerSecond, 
    distanceInMeters, 
    maxSpeedInMetersPerSecond,
    averagePaceInMinutesPerKilometer,
    maxPaceInMinutesPerKilometer,
    startingLatitudeInDegree,
    startingLongitudeInDegree,
    durationInSeconds,
     ...newSummary } = summary;
  //console.info('newSummary',newSummary)

  /*Combinar los atributos necesarios con los nuevos calculados*/
  const convertedSummary: ConvertedSummary = {...newSummary,durationInMinutes,averageSpeedInKilometersPerHour,distanceInKilometers,maxSpeedInKilometersPerHour,averagePowerInWatts,maxPowerInWatts }

  return convertedSummary

}

// Función para realizar las conversiones en Sample
function convertSample(sample: Sample): ConvertedSample {
  const speedKilometersPerHour = Number((sample.speedMetersPerSecond * 3.6).toFixed(2));

  /*Extraer los datos que ya no se necesitan de sample y quedarme con los necesarios*/
  const { 
    latitudeInDegree,
    longitudeInDegree,
    elevationInMeters,
    airTemperatureCelcius,
    speedMetersPerSecond,
     ...newSample} = sample;

  //console.info('newSample',newSample)


  const convertedSample: ConvertedSample = {...newSample,speedKilometersPerHour}

  //console.info('convertedSample', convertedSample)

  return convertedSample;
}

export async function getActivityDetailsFromGarmin(){
  await console.info('Iniciando getActivityDetailsFromGarmin');

  const urlApi = 'https://apis.garmin.com/wellness-api/rest/activityDetails';
  const httpMethod = 'GET';

  //paramsx
  const queryParameters = {
    uploadStartTimeInSeconds:1693375200,
    uploadEndTimeInSeconds:1693436400
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

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,x-apigateway-header,x-amz-date',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
    'Authorization' : auth
  }


  try {
    const res = await axios.get<ActivityDetail[]>(urlFull, { headers: headers });

    const actdetailsList =res.data;
  
    const size = res.data.length;


    /*INTENTAR PROCESAR LA INFORMACIÓN*/
    for (let index = 0; index < size; index++) {

      let averagePower=0;
      let sumPower = 0;
      let maxPower=0;
      let powerCount=0;

      const sampleslength=actdetailsList[index].samples.length

      /*Generar el converted sample*/
      let convertedSampleList: ConvertedSample[] = []
      for (let j = 0; j < sampleslength; j++) {
        const convertedSample =  convertSample(actdetailsList[index].samples[j]);
        //console.info('convertedSample',convertedSample)
        convertedSampleList.push(convertedSample)
        //console.info('iserting sample to dynamo');
        //await insertSampleDynamoDB(convertedSample,actdetailsList[index].activityId );

        //Guardar potencia maxima

        if (actdetailsList[index]?.samples[j]?.powerInWatts !== undefined) {
          sumPower = sumPower + actdetailsList[index]?.samples[j]?.powerInWatts!;
          powerCount+=1;
          if(actdetailsList[index]?.samples[j]?.powerInWatts! > maxPower){
            maxPower = actdetailsList[index]?.samples[j]?.powerInWatts!
          }
        }
      }
      
      averagePower = Number((sumPower / powerCount).toFixed(2));
      console.log('powerCount',powerCount);
      console.log('averagePower',averagePower)
      console.log('maxPower',maxPower)

      /*Generar el converted summary*/
      const convertedSummary = convertSummary(actdetailsList[index].summary,averagePower,maxPower);
      //console.info('convertedSummary',convertedSummary)

      console.info('inserting summary to dynamo')
      await insertSummaryDynamoDB(convertedSummary);

      

    }
   
  } catch (error) {
    console.info('error',error);
  }
}

async function insertSampleDynamoDB(newItem: ConvertedSample, activityId: number){
  const id= uuid.v1();
  const dbSample: DBSample = {id, activityId, ...newItem}

  const params = {
    TableName: String(process.env.STACK_DB_NAME) + '-garmin_activity_samples',
    Item: dbSample
  }

  await documentClient.put(params).promise()
  .then(() => {
    console.log('Sample insertado correctamente.');
  })
  .catch((error) => {
    console.error('Error al insertar sample:', error);
  });

}

async function insertSummaryDynamoDB(newSummary: ConvertedSummary){

  const params = {
    TableName: String(process.env.STACK_DB_NAME) + '-garmin_activity_summary',
    Item: newSummary
  }

  await documentClient.put(params).promise()
  .then(() => {
    console.log('Summary insertado correctamente.');
  })
  .catch((error) => {
    console.error('Error al insertar el elemento:', error);
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


