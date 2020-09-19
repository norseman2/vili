import boto3
import shutil
from datetime import datetime
import os

from pyspark.sql import SparkSession
from pyspark.sql.types import *

bucket = 'vili-bucket'
s3_source='spark/vili-electricity-consumption.csv'
spark_in='/home/hadoop/data/in/vili-electricity-consumption.csv'
spark_out='/home/hadoop/data/out/vili-electricity-consumption'
s3_target='forecast/vili-electricity-consumption.csv'

schema = StructType([
	StructField('item_id',      StringType(), True),
    StructField('timestamp',    StringType(), True),
	StructField('target_value', FloatType(), True)
])

s3_client = boto3.client('s3')
#get new electricity consumption file coming from S3
s3_client.download_file(bucket, s3_source, spark_in)
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
	#first csv file is the right one
	spark_out = filename
	break
s3_client.upload_file(spark_out, bucket, s3_target)