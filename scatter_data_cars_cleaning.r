
###################################################
# IMPORT, DATA CLEANING, STRUCTURING, MANIPULATION




###################################################
# SETUP 

# Clear R's memory.
rm(list=ls())

# Check how much memory in hard drive
gc()

# Set working directory
setwd("G:/My Drive/All Data Things/Practice_Projects_Winter_23/D3_practice/scatter")

# Check current working directory
getwd()

# Lists files in current working directory
list.files()


###################################################
# IMPORT DATA 

# Standard CSV importing
data <- read.csv("USA_cars_datasets.csv")



###################################################
# CHECK THE DATA 

head(data) 
tail(data) 
str(data) 
summary(data) 

# check number of rows and columns
nrow(data)
ncol(data)

# check column names
colnames(data)

# check for missing values
any(is.na(data))




library(tidyverse)

wanted_data <- select(data,
                      price,
                      brand,
                      mileage)

head(wanted_data)


write.csv(wanted_data, "cleaned_data.csv", row.names=F)





