import os
import glob

spark_out='/home/hadoop/data/out/vili-electricity-consumption'
spark_out_files = glob.glob(spark_out + "/*.csv")
for filename in spark_out_files:
    print(filename)
