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


  const oauth_timestamp = Math.floor(Date.now() / 1000);
  const oauth_nonce = uuid.v1();

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
  //console.log('headers: ', headers)

    return headers


}

