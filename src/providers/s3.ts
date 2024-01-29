'use strict'
import * as AWS from 'aws-sdk'
import { setGlobalEnvironment } from '../global'
import Environment from '../environments/environment'
const env: Environment = new Environment()
setGlobalEnvironment(env)

const awsConfig = {
  Bucket: global.environment.s3.bucket,
}
const s3bucket = new AWS.S3({
  accessKeyId: global.environment.s3.accessKeyId,
  secretAccessKey: global.environment.s3.secretAccessKey,
  region: global.environment.s3.region,
})

export const deleteImage = async (url: string) => {
  const params = {
    Bucket: `${awsConfig.Bucket}`,
    Key: `${url.substring(url.lastIndexOf('/') + 1)}`,
  }
  const data = await s3bucket.deleteObject(params).promise()
  return data
}

export const uploadToS3 = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: { originalname: string; buffer: any; type: any },
  id: string,
) => {
  const params = {
    Bucket: `${awsConfig.Bucket}`,
    Key: `${id}${file.originalname.substr(file.originalname.lastIndexOf('.'))}`,
    Body: file.buffer,
    ContentType: file.type,
  }
  const data = await s3bucket.upload(params).promise()
  return data
}
