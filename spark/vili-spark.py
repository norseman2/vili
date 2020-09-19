import boto3

def getS3Object(source,target):
	bucket = 'vili-bucket'
	s3_client = boto3.client('s3')
	try:
		s3.download_file(bucket, source, target)
	except:
		pass

getS3Object('spark/vili-electricity-consumption.csv','/home/hadoop/data/in/')