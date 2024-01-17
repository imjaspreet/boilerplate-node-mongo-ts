'use strict'
import * as provideEmail from '../providers/email'

export const sendOTPonEmail = (email: string, code: string) => {
  const subject: string = 'Account Registration OTP '
  const message: string = `Your OTP for Account Registration in myTuur App is: ${code}. Do not share the Credentials for security reasons.`
  return provideEmail.sendEmail(email, message, subject)
}

export const sendForgotOTP = async (email: string, code: string) => {
  const subject: string = 'Forgot Password OTP'
  const message: string = `Your OTP for Forgot Password in myTuur App is: ${code}. Do not share the Credentials for security reasons.`
  return provideEmail.sendEmail(email, message, subject)
}
