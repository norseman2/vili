import boto3
import shutil
from datetime import datetime

sourcefile='spark/vili-electricity-consumption.csv'
targetfile='/home/hadoop/data/in/vili-electricity-consumption.csv'
archivefile='/home/hadoop/data/archives/in/vili-electricity-consumption.csv' + datetime.now().strftime('%Y-%m-%d-%H-%M-%S') + '-UTC.csv'

def getS3Object(source,target):
	bucket = 'vili-bucket'
	s3_client = boto3.client('s3')
	s3_client.download_file(bucket, source, target)

shutil.move(targetfile,archivefile)
getS3Object(sourcefile,targetfile)