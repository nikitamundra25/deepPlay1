import { Request } from "express";
import {
   smtpTransport
} from "./index";
import { IMailOption } from "../interfaces";
import path from "path";
import fs from "fs";
import { Attachment } from "nodemailer/lib/mailer";
import { Document } from "mongoose";

export const AvailiableTemplates = {
   FORGET_PASSWORD: "forgotPassword",
   STATUS_CHANGE: "statusChange",
   EMAIL_CHANGE: "emailChange"
};
export class Email {
   host: string | null;
   body: string;
   subject: string;
   to: string;
   cc: Array<string>;
   attachments: Array<Attachment>;
   constructor(req: Request) {
      const host: Array<String> | null = req.headers && req.headers.referer ? req.headers.referer.split("/") : null;
      this.host = host ? [host[0], host[1], host[2]].join("/") : null;
      this.body = "";
      this.subject = "";
      this.to = "";
      this.cc = [];
      this.attachments = [];
   }
   async setTemplate(templateName: String, replaceObject: Object | any = {}): Promise<any> {
      if (!templateName) {
         throw new Error("Please provide template name");
      }
      switch (templateName) {
         case AvailiableTemplates.FORGET_PASSWORD:
            this.subject = "[Deep Play] Reset Password";
            break;
         case AvailiableTemplates.STATUS_CHANGE:
            this.subject = "[Deep Play] Account Status Change";
            break;
         case AvailiableTemplates.EMAIL_CHANGE:
            this.subject = "[Deep Play] Email Change";
            break;
         default:
            throw new Error("Invalid template name");
      }
      let content = fs.readFileSync(
         path.join(__dirname, `./emailtemplates/${templateName}.html`),
         "utf8"
      );
      replaceObject.webURL = this.host;

      for (const key in replaceObject) {
         if (replaceObject.hasOwnProperty(key)) {
            const val = replaceObject[key];
            content = content.replace(new RegExp(`{${key}}`, "g"), val);
         }
      }
      this.body = content;
      return content;
   }
   setSubject(subject: string) {
      this.subject = subject;
   }
   setBody(body: string) {
      this.body = body;
   }
   setAttachements(attachments: Array<Attachment>) {
      this.attachments = attachments;
   }
   setCC(cc: Array<string>) {
      this.cc = cc;
   }
   async sendEmail(email: string): Promise<any> {
      if (!email) {
         throw new Error("Please provide email.");
      }
      const mailOption: IMailOption = {
         from: "Deep Play <test.chapter247@gmail.com>",
         to: email || this.to,
         cc: this.cc,
         subject: this.subject,
         html: this.body,
         debug: true,
         attachments: this.attachments
      };
      const resp: Document | any = await smtpTransport.sendMail(mailOption);
      return resp;
   }
}
