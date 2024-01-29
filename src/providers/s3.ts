'use strict'
import * as AWS from 'aws-sdk'
import { setGlobalEnvironment } from '../global'
import Environment from '../environments/environment'
const env: Environment = new Environment()
setGlobalEnvironment(env)

const awsConfig = {
  bucketName: global.environment.aws.bucket,
}
const s3bucket = new AWS.S3({
  // bucket: global.environment.aws.bucket,
  accessKeyId: global.environment.aws.accessKeyId,
  secretAccessKey: global.environment.aws.secretAccessKey,
  region: global.environment.aws.region,
})

export const deleteImage = async url => {
  const params = {
    Bucket: `${awsConfig.bucketName}`,
    Key: `${url.substring(url.lastIndexOf('/') + 1)}`,
  }
  const data = await s3bucket.deleteObject(params).promise()
  return data
}

export const uploadToS3 = async (file, id) => {
  const params = {
    Bucket: `${awsConfig.bucketName}`,
    Key: `${id}${file.originalname.substr(file.originalname.lastIndexOf('.'))}`,
    Body: file.buffer,
    ContentType: file.type,
  }
  const data = await s3bucket.upload(params).promise()
  return data
}
