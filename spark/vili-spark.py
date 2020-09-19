import boto3

def getS3Object(source,target):
	bucket = 'vili-bucket'
	s3_client = boto3.client('s3')
	s3_client.download_file(bucket, source, target)

getS3Object('spark/vili-electricity-consumption.csv','/home/hadoop/data/in/vili-electricity-consumption.csv')