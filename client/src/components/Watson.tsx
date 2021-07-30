import React, { ReactElement } from 'react';
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');


interface Props {
    
}

const Watson: React.FC = (props) => {
  /*    const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
     const { IamAuthenticator } = require('ibm-watson/auth');

   const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: 'b84fffcf-718d-4344-a20c-b59c6e52dc84',
  }),
  serviceUrl: 'https://api.eu-de.tone-analyzer.watson.cloud.ibm.com/instances/b8d55870-b564-4670-ab08-32062c60998e',
});

const text = call to the datingText Query
const toneParams = {
  toneInput: { 'text': text },
  contentType: 'application/json',
};

toneAnalyzer.tone(toneParams)
  .then(toneAnalysis => {
    console.log(JSON.stringify(toneAnalysis, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  }); */
    return (
        <div>
            
        </div>
    )
}
export default Watson; 