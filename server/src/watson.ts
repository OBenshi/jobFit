import ToneAnalyzerV3 from 'ibm-watson/tone-analyzer/v3';
import { IamAuthenticator } from 'ibm-watson/auth';
require('dotenv').config();


const watsonTA = async (text: string) : Promise<any> => {
    const toneAnalyzer = new ToneAnalyzerV3({
        authenticator: new IamAuthenticator({ apikey: process.env.TA_API_KEY }),
        version: '2017-09-21',
        serviceUrl: process.env.TA_URL
      });
    
    const response = await toneAnalyzer.tone(
    {
        toneInput: text,
        contentType: 'text/plain'
    })
    console.log("response from TAn ",JSON.stringify(response.result, null, 2));
    let newArr: string[]= response.result.document_tone.tones.map(tone=>tone.tone_id);
    // console.log('doc tone Arr?', newArr);
    return newArr
}

export default watsonTA;
