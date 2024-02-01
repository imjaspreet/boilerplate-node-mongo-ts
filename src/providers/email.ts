import * as AWS from 'aws-sdk'
import { setGlobalEnvironment } from '../global'
import Environment from '../environments/environment'
const env: Environment = new Environment()
setGlobalEnvironment(env)

AWS.config.update({
  accessKeyId: global.environment.aws.accessKeyId,
  secretAccessKey: global.environment.aws.secretAccessKey,
  region: global.environment.aws.region,
})

// Create an SES object
const ses = new AWS.SES({ apiVersion: '2010-12-01' })

// Specify the email parameters
export const sendEmail = async (
  email: string,
  model: string,
  subject: string,
) => {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<html><body><h1>${model}</h1></body></html>`,
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'Hello, SES!',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject || 'myTuur',
      },
    },
    // Source: 'no-reply-mytuur@mytuur.com',
    Source: 'aws@mytuur.com',
  }

  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.log('Error sending email:', err)
    } else {
      console.log('Email sent successfully:', data)
    }
  })
}
