import { Attachment } from "nodemailer/lib/mailer";
export interface IEmail {
   host: String | null;
   body: String ;
   subject: String ;
   to: String ;
   cc: Array<String> ;
   attachments: Array<String> ;
};

export interface IMailOption {
   from: string ;
   to: string;
   cc: Array<string>;
   subject: string;
   html: string;
   debug: Boolean;
   attachments: Array<Attachment>
};