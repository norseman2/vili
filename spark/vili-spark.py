import boto3
import shutil
from datetime import datetime
import os

from pyspark.sql import SparkSession
from pyspark.sql.types import *

bucket = 'vili-bucket'
s3_source='spark/vili-electricity-consumption.csv'
spark_in='/home/hadoop/data/in/vili-electricity-consumption.csv'
archive_in='/home/hadoop/data/archives/in/vili-electricity-consumption-' + datetime.now().strftime('%Y-%m-%d-%H-%M-%S') + '-UTC.csv'
spark_out='/home/hadoop/data/out/vili-electricity-consumption'
archive_out='/home/hadoop/data/archives/out/vili-electricity-consumption-' + datetime.now().strftime('%Y-%m-%d-%H-%M-%S') + '-UTC.csv'
s3_archive='forecast/archives/vili-electricity-consumption-' + datetime.now().strftime('%Y-%m-%d-%H-%M-%S') + '-UTC.csv'
s3_target='forecast/vili-electricity-consumption.csv'

schema = StructType([
	StructField('item_id',      StringType(), True),
    StructField('timestamp',    StringType(), True),
	StructField('target_value', FloatType(), True)
])

def getS3Object(source,target):
	

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
s3_client.download_file(bucket, source, target)
#load file to perform some transformation in spark
spark = (SparkSession
	.builder
	.appName("vili-transform")
	.getOrCreate())
df = spark.read.csv(spark_in, header=True, schema=schema)
shutil.rmtree(spark_out)
df.repartition(1).write.csv(spark_out)
#put spark output file to S3 for amazon forecast
spark_out_files = glob.glob(spark_out + "/*.csv")
for filename in spark_out_files:
    spark_out = filename
	break
s3_client.upload_file(spark_out, bucket, s3_target)