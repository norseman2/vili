'use strict';
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const { data } = require('jquery');
const docClient = new AWS.DynamoDB.DocumentClient({region:'ca-central-1'});
const kinesis = new AWS.Kinesis();

function createResponse(statusCode,message){
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
  return response;
}

async function getSmartMeters() {
  const params = {
    TableName: 'SmartMeter-wtvzpchf4ndhxn6vxdocqkieb4-dev'
  }
  return await docClient.scan(params).promise()
}

function getSmartMeter(smartMeters,meterId) {
  for(var idx=0; idx < smartMeters.length; idx++){
    let smartMeter = smartMeters[idx]
    if(smartMeter.id == meterId) return smartMeter
  }
  return {}
}

module.exports.electricityConsumption = async event => {

  const scanParams = {
    TableName: 'LoadProfile-wtvzpchf4ndhxn6vxdocqkieb4-dev'
  } 

  try {

    let smartMeters = []
    await getSmartMeters().then( (result) => {
      smartMeters = result['Items']
    }).catch( (err) => {
      throw err
    })

    const now = new Date(Date.now())
    const dynamoResponse = await docClient.scan(scanParams).promise()
    const loadProfiles = dynamoResponse['Items']
    loadProfiles.map( async (loadProfile)=>{
      const smartMeter = getSmartMeter(smartMeters,loadProfile['meterId'])
      let dataPoints = loadProfile['dataPoints']
      for(var idx=0; idx < dataPoints.length; idx++){
        let dataPoint = dataPoints[idx]
        if(dataPoint['hour']==now.getHours()) {
          if(dataPoint['minutes']>=now.getMinutes()) {
            let activePower = {
              eventId: uuidv4(),
              meterId: smartMeter['id'],
              meterName: smartMeter['name'],
              meterType: smartMeter['type'],
              profileId: smartMeter['meterId'],
              timestamp: now.toISOString(),
              measure: dataPoint['activePower'],
              unit: loadProfile['unit']
            }
            let electricityEvent = {
              Data: JSON.stringify(activePower),
              PartitionKey: activePower['eventId'],
              StreamName: 'energy-consumption-events'
            }
            let kinesisResponse = await kinesis.putRecord(electricityEvent).promise();
            console.log('kinesisResult',kinesisResponse)
            break
          }
        }
      }
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
