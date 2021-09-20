"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v3_1 = __importDefault(require("ibm-watson/tone-analyzer/v3"));
const auth_1 = require("ibm-watson/auth");
require("dotenv").config();
const watsonTA = async (text) => {
    const toneAnalyzer = new v3_1.default({
        authenticator: new auth_1.IamAuthenticator({ apikey: process.env.TA_API_KEY }),
        version: "2017-09-21",
        serviceUrl: process.env.TA_URL,
    });
    const response = await toneAnalyzer.tone({
        toneInput: text,
        contentType: "text/plain",
    });
    //   console.log(`response.result.sentences_tone`, response.result.document_tone);
    const benshiArr = response.result.document_tone.tones.reduce((acc, cur) => ({ ...acc, [cur.tone_name]: cur.score }), {});
    console.log(`benshiArr`, benshiArr);
    //   console.log("response from TAn ", JSON.stringify(response.result, null, 2));
    let newArr = response.result.document_tone.tones.map((tone) => tone.tone_id);
    // console.log('doc tone Arr?', newArr);
    //   return newArr;
    return benshiArr;
};
exports.default = watsonTA;
