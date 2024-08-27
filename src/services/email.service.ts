import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { config } from "../configs/config";

class EmailService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS,
      },
    });
  }

  public sendEmail(recipient: string, subject: string, text: string): void {
    const mailOptions: Mail.Options = {
      from: config.EMAIL_USER,
      to: recipient,
      subject,
      html: text,
    };
    this.transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  }
}

export const emailService = new EmailService();
