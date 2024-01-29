import * as s3 from '../providers/s3'
import crypto from 'crypto'
import { isEmpty } from 'underscore'
import { Request, Response } from 'express'
import ApiError from '../utils/error/ApiError'
import httpStatus from 'http-status'

//single image Upload;
export const imageUpload = async (req: Request, res: Response) => {
  const uploadData = req.files

  if (isEmpty(uploadData)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'image file required')
  }

  const data = await s3.uploadToS3(
    uploadData[0],
    crypto.randomBytes(20).toString('hex'),
  )
  if (data) {
    return res.send({ isSuccess: true, url: data.Location })
  }
}

// export const bulkUpload = async (req: Request, res: Response) => {
//   const uploadData: Multer.File[] = req.files as Multer.Multer.File[]

//   if (isEmpty(uploadData)) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'image file required')
//   }

//   const uploadPromises = uploadData.map(async image => {
//     const data = await s3.uploadToS3(
//       image,
//       crypto.randomBytes(20).toString('hex'),
//     )
//     if (data) {
//       return data.Location
//     }
//   })
//   const results = await Promise.allSettled(uploadPromises)
//   const output = results
//     .filter(result => result.status === 'fulfilled')
//     .map(result => result.value)

//   return res.send({ isSuccess: true, urls: output })
// }

exports.delete = async (req: Request, res: Response) => {
  await s3.deleteImage(req.body.url)
  return res.send({
    isSuccess: true,
    message: 'image deleted from s3 bucket successfully',
  })
}
