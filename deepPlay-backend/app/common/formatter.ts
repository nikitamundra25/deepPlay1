import { ValidationError } from "express-validator";
import nodemailer from "nodemailer";
/**
 * 
 */
//Email SMTP Transport
export const smtpTransport = nodemailer.createTransport({
  service:<string> "Gmail",
  auth:<Object> {
    user:<string> "test.chapter247@gmail.com",
    pass:<string> "chapter247@@"
  }
});
/**
 *
 */
export const ValidationFormatter = (
  err: Record<string, ValidationError>
): Object => {
  let errorObject: any = {};
  for (const key in err) {
    if (err.hasOwnProperty(key)) {
      const e = err[key];
      errorObject[e.param] = e.msg;
    }
  }
  return errorObject;
};