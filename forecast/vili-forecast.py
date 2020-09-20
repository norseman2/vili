import boto3
import time
from datetime import datetime

session = boto3.Session(region_name='us-east-2') 
forecast = session.client(service_name='forecast') 
forecastquery = session.client(service_name='forecastquery')

vili_dsg_arn = 'arn:aws:forecast:us-east-2:575704994123:dataset-group/vili_electricity_consumption'
vili_ds_arn = 'arn:aws:forecast:us-east-2:575704994123:dataset/vili_electricity_consumption_ds'
vili_iam_role = 'arn:aws:iam::575704994123:role/service-role/AmazonForecast-ExecutionRole-1599914820409'
vili_csv_file = 's3://vili-bucket/forecast/vili-electricity-consumption.csv'

def deleteDatasetImportJob():
	pass

def importNewDataset():

	schema = {
		"Attributes": [
			{
				"AttributeName": "item_id",
				"AttributeType": "string"
			},
			{
				"AttributeName": "timestamp",
				"AttributeType": "timestamp"
			},
			{
				"AttributeName": "target_value",
				"AttributeType": "float"
			}
		]
	}

	TIMESTAMP_FORMAT = "yyyy-MM-dd HH:mm:ss"

	import_job_name = 'VILI_ELEC_DAILY_UPDATE_' + datetime.now().strftime('%Y_%m_%d_%H_%M_%S')
	import_job_response = forecast.create_dataset_import_job(
		DatasetImportJobName=import_job_name,
		DatasetArn=vili_ds_arn,
		DataSource= {
			"S3Config" : {
				"Path": vili_csv_file,
				"RoleArn": vili_iam_role
			} 
		},
		TimestampFormat=TIMESTAMP_FORMAT
	)

	import_job_arn=import_job_response['DatasetImportJobArn']
	print('import job created',import_job_arn)

	while True:
		status = forecast.describe_dataset_import_job(DatasetImportJobArn=import_job_arn)['Status']
		if status in ('ACTIVE', 'CREATE_FAILED'):
			print('import job ended with status', status)
			break
		else:
			print('impot job in progress with status', status)
		time.sleep(10)

	import_job_desc = forecast.describe_dataset_import_job(DatasetImportJobArn=import_job_arn)
	print(import_job_desc)

def createPredictor():
	predictorName = 'vili_electricity_consumption_predictor_' + datetime.now().strftime('%Y_%m_%d_%H_%M_%S')
	forecastHorizon = 36
	create_predictor_response=forecast.create_predictor(
		PredictorName=predictorName, 
		PerformAutoML=True,
		ForecastHorizon=forecastHorizon,
		EvaluationParameters= {"NumberOfBacktestWindows": 1, "BackTestWindowOffset": forecastHorizon}, 
		InputDataConfig= {"DatasetGroupArn": vili_dsg_arn},
		FeaturizationConfig= {
			"ForecastFrequency": "1min", 
			"Featurizations": 
			[
				{
					"AttributeName": "target_value", 
					"FeaturizationPipeline": 
					[
						{
							"FeaturizationMethodName": "filling", 
							"FeaturizationMethodParameters": 
							{
								"frontfill": "none", 
								"middlefill": "zero", 
								"backfill": "zero"
							}
						}
					]
				}
			]
		}
	)
	predictor_arn=create_predictor_response['PredictorArn']
	print('predictor creation initiated...',predictor_arn)
	while True:
		status = forecast.describe_predictor(PredictorArn=predictor_arn)['Status']
		if status in ('ACTIVE', 'CREATE_FAILED'):
			print('predictor creation ended with status', status)
			break
		else:
			print('predictor creation in progress with status', status)
		time.sleep(5)
	print('predictor features')
	print(forecast.get_accuracy_metrics(PredictorArn=predictor_arn))
	return predictor_arn

def createForecast(predictor_arn):
	forecastName = 'vili_electricity_consumption_forecast_' + datetime.now().strftime('%Y_%m_%d_%H_%M_%S')
	create_forecast_response=forecast.create_forecast(
		ForecastName=forecastName,
		PredictorArn=predictor_arn
	)
	forecast_arn = create_forecast_response['ForecastArn']
	print('forecast creation initiated...',forecast_arn)
	while True:
		status = forecast.describe_forecast(ForecastArn=forecast_arn)['Status']
		if status in ('ACTIVE', 'CREATE_FAILED'):
			print('forecast creation ended with status', status)
			break
		else:
			print('forecast creation in progress with status', status)
		time.sleep(5)
	return forecast_arn

def sendForecastToKinesis(forecast_arn,itemId):
	print(forecast_arn)
	print()
	forecastResponse = forecastquery.query_forecast(
		ForecastArn=forecast_arn,
		Filters={"item_id":itemId}
	)
	print(forecastResponse)

def exportForecastToS3():
	#CreateForecastExportJob
	#https://docs.aws.amazon.com/forecast/latest/dg/API_CreateForecastExportJob.html
	pass

'''
NOTES

issue ===> botocore.exceptions.UnknownServiceError: Unknown service: 'forecast'
solution
pip3 install --upgrade boto3

'''

#importNewDataset()

#predictor_arn = createPredictor()

predictor_arn = 'arn:aws:forecast:us-east-2:575704994123:predictor/vili_electricity_consumption_predictor_2020_09_20_03_50_50'
forecast_arn = createForecast(predictor_arn)
