import pyspark
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lit

def dataSet(Dataset_2023_02_18_20_09_25):
    dataSet = Dataset_2023_02_18_20_09_25
    dataSet = dataSet.drop(col("Fact_Note"))
    dataSet = dataSet.drop(col("Value_Note_For_San_Mateo_County_California"))
    dataSet = dataSet.drop(col("Value_Note_For_Marin_County_California"))
    dataSet = dataSet.drop(col("Value_Note_For_San_Francisco_County_California"))
    i = 0
    for i in range(70):
        dataSet = dataSet.withColumn("ID", lit(i))
        i=i+1
    dataSet = dataSet.filter((col("ID") < 70) | (col("ID") > 0))
    return dataSet