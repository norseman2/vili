import boto3
import shutil
from datetime import datetime

from pyspark.sql import SparkSession
from pyspark.sql.types import *

bucket = 'vili-bucket'
s3_source='spark/vili-electricity-consumption.csv'
spark_in='/home/hadoop/data/in/vili-electricity-consumption.csv'
archive_in='/home/hadoop/data/archives/in/vili-electricity-consumption-' + datetime.now().strftime('%Y-%m-%d-%H-%M-%S') + '-UTC.csv'
spark_out='/home/hadoop/data/out/vili-electricity-consumption.csv'
archive_out='/home/hadoop/data/archives/out/vili-electricity-consumption-' + datetime.now().strftime('%Y-%m-%d-%H-%M-%S') + '-UTC.csv'
s3_archive='forecast/archives/vili-electricity-consumption-' + datetime.now().strftime('%Y-%m-%d-%H-%M-%S') + '-UTC.csv'
s3_target='forecast/vili-electricity-consumption.csv'

schema = StructType([
	StructField('item_id',      StringType(), True),
    StructField('timestamp',    StringType(), True),
	StructField('target_value', FloatType(), True)
])

def getS3Object(source,target):
	s3_client.download_file(bucket, source, target)

def copyS3Object(source,target):
	copy_source = { 'Bucket': bucket, 'Key': source }
	s3_client.copy(copy_source,bucket,target)

#
# ROUTINE
#

s3_client = boto3.client('s3')

#archive previous electricity consumption file coming from S3
try:
	shutil.move(spark_in,archive_in)
except:
	pass
#get new electricity consumption file coming from S3
getS3Object(s3_source,spark_in)

spark = (SparkSession
	.builder
	.appName("vili-transform")
	.getOrCreate())

#load file to perform some transformation in spark
df = spark.read.csv(spark_in, header=True, schema=schema)

#archive previous spark output file
try:
	shutil.move(spark_out,archive_out)
except:
	pass
#write spark dataframe to a csv file
df.write.format("csv").save(spark_out)
#copy previous amazon forecast S3 file
copyS3Object(s3_target,s3_archive)
#push file to S3 for amazon forecast
moveS3Object(spark_out,s3_target)