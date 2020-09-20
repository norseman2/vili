import boto3
import time

session = boto3.Session(region_name='us-east-2') 
forecast = session.client(service_name='forecast') 
forecastquery = session.client(service_name='forecastquery')

vili_dsg_arn = 'arn:aws:forecast:us-east-2:575704994123:dataset-group/vili_electricity_consumption'
vili_ds_arn = 'arn:aws:forecast:us-east-2:575704994123:dataset/vili_electricity_consumption_ds'
vili_iam_role = 'arn:aws:iam::575704994123:role/service-role/AmazonForecast-ExecutionRole-1599914820409'
vili_csv_file = 's3://vili-bucket/forecast/vili-electricity-consumption.csv'

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

import_job_name = 'VILI_ELEC_DAILY_UPDATE'
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

status_indicator.end()

import_job_desc = forecast.describe_dataset_import_job(DatasetImportJobArn=import_job_arn)

print(import_job_desc)

'''
NOTES

issue ===> botocore.exceptions.UnknownServiceError: Unknown service: 'forecast'
solution
pip3 install --upgrade boto3

'''