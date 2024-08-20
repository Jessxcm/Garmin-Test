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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationHeader = void 0;
const oauth_signature_1 = __importDefault(require("oauth-signature"));
const uuid = __importStar(require("uuid"));
function authorizationHeader(authdata, urlApi, httpMethod, queryParameters) {
    const consumerKey = authdata.consumerKey;
    const consumerSecret = authdata.consumerSecret;
    const accessToken = authdata.accessToken;
    const tokenSecret = authdata.tokenSecret;
    const oauth_timestamp = Math.floor(Date.now() / 1000);
    const oauth_nonce = uuid.v1();
    //all params
    const parameters = Object.assign(Object.assign({}, queryParameters), { oauth_consumer_key: consumerKey, oauth_token: accessToken, oauth_nonce: oauth_nonce, oauth_timestamp: oauth_timestamp, oauth_signature_method: 'HMAC-SHA1', oauth_version: '1.0' });
    // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
    const encodedSignature = oauth_signature_1.default.generate(httpMethod, urlApi, parameters, consumerSecret, tokenSecret);
    //console.log('encodedSignature: ',encodedSignature);
    const headers = `OAuth oauth_consumer_key="${consumerKey}",oauth_token="${accessToken}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${oauth_timestamp}",oauth_nonce="${oauth_nonce}",oauth_version="1.0",oauth_signature="${encodedSignature}"`;
    //console.log('headers: ', headers)
    return headers;
}
exports.authorizationHeader = authorizationHeader;
