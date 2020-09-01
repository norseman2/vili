'use strict';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region:'ca-central-1'});

function createResponse(statusCode,message){
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
  return response;
}

module.exports.electricityConsumption = async event => {

  const scanParams = {
    TableName: 'LoadProfile-wtvzpchf4ndhxn6vxdocqkieb4-dev'
  } 

  try {

    const now = new Date(Date.now())
    console.log('now',now)
    const result = await docClient.scan(scanParams).promise()
    const loadProfiles = result['Items']
    loadProfiles.map( async (loadProfile)=>{
      let dataPoints = loadProfile['dataPoints']
      console.log(dataPoints)
      for(var idx=0; idx < dataPoints.length; idx++){
        let dataPoint = dataPoints[idx]
        if(dataPoint['hour']==now.getHours()) {
          if(dataPoint['minutes']>=now.getMinutes()) {
            console.log('found dataPoint',dataPoint)
            let activePower = {
              timestamp: now.toISOString(),
              activePower: dataPoint['activePower']
            }
            console.log(activePower)
            break
          }
        }
      }
      /*
      dataPoints.map( (dataPoint) => {
        if(dataPoint['hour']==now.getHours()) {
          if(dataPoint['minutes']>=now.getMinutes()) {
            console.log('found dataPoint',dataPoint)
            let activePower = {
              timestamp: now.toISOString(),
              activePower: dataPoint['activePower']
            }
            console.log(activePower)
            return true
          }
        }
      })
      */
    })
    return {
      statusCode: 200,
      body: JSON.stringify("success")
    };

  } catch(err) {
    console.log(err)
    return {
      statusCode: 400,
      body: JSON.stringify("failure")
    };    
  }

 
};
