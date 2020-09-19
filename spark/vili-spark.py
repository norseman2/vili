import boto3
import shutil
from datetime import datetime

from pyspark.sql import SparkSession
from pyspark.sql.types import *

s3_source='spark/vili-electricity-consumption.csv'
spark_in='/home/hadoop/data/in/vili-electricity-consumption.csv'
archive_in='/home/hadoop/data/archives/in/vili-electricity-consumption-' + datetime.now().strftime('%Y-%m-%d-%H-%M-%S') + '-UTC.csv'
spark_out='/home/hadoop/data/out/vili-electricity-consumption.csv'
archive_out='/home/hadoop/data/archives/out/vili-electricity-consumption-' + datetime.now().strftime('%Y-%m-%d-%H-%M-%S') + '-UTC.csv'
archive_s3='forecast/archives/vili-electricity-consumption-' + datetime.now().strftime('%Y-%m-%d-%H-%M-%S') + '-UTC.csv'
s3_target='forecast/vili-electricity-consumption.csv'

'''
def getS3Object(source,target):
	bucket = 'vili-bucket'
	s3_client = boto3.client('s3')
	s3_client.download_file(bucket, source, target)

shutil.move(spark_in,archive_in)
getS3Object(s3_source,spark_in)
'''

schema = StructType([
	StructField('item_id',      StringType(), True),
    StructField('timestamp',    StringType(), True),
	StructField('target_value', FloatType(), True)
])

df = spark.read.csv(spark_in, header=True, schema=schema)

shutil.move(spark_out,archive_out)
df.write.format("csv").save(spark_out)