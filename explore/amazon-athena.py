import boto3
from retrying import retry
from datetime import datetime

@retry(stop_max_attempt_number = 10,
    wait_exponential_multiplier = 300,
    wait_exponential_max = 1 * 60 * 1000)
def poll_status(_id):
    result = athena.get_query_execution( QueryExecutionId = _id )
    state  = result['QueryExecution']['Status']['State']
    if state == 'SUCCEEDED':
        return result
    elif state == 'FAILED':
        return result
    else:
        raise Exception

def moveS3Object(source,target):
	bucket = 'vili-bucket'
	s3_client = boto3.client(
		's3'
	)
	copy_source = {
		'Bucket': bucket,
		'Key': source
	}	
	try:
		s3_client.copy(copy_source,bucket,target)
	except:
		pass

def exportElectricityConsumption():
	database  = 'viliathenadb'
	query = ("""
		SELECT
		meter_name as item_id,
		DATE_FORMAT(measure_timestamp,'%Y-%m-%d %H:%i:00') as timestamp,
		measure_value as target_value
		FROM
		vili_electricity_csv
		ORDER BY 1,2
	""")
	response = athena.start_query_execution(
		QueryString=query,
		QueryExecutionContext={
			'Database': database
		}
	)
	print("athena request in progress...")
	QueryExecutionId = response['QueryExecutionId']
	result = poll_status(QueryExecutionId)
	if result['QueryExecution']['Status']['State'] == 'SUCCEEDED':
		print("successful query: {}".format(QueryExecutionId))
		s3_key = QueryExecutionId + '.csv'
		print("result file:", s3_key)
		return s3_key
	else:
		print("query failed")
		return None

athena = boto3.client(
	'athena',
	region_name='ca-central-1'
)

resultfile = exportElectricityConsumption()
if(resultfile != None):
	exportfile = 'athena/staging/' + resultfile
	archivefile = 'spark/archives/vili-electricity-consumption-' + datetime.now().strftime('%Y-%m-%d-%H-%M-%S') + '-UTC.csv'
	electricityfile = 'spark/vili-electricity-consumption.csv'
	moveS3Object(electricityfile, archivefile)
	moveS3Object(exportfile, electricityfile)