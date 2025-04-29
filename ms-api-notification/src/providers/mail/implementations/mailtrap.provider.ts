import { IMailAccess, IMessageMail } from "../imail-access.interface";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export class MailTrap implements IMailAccess {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e1c1676d0f6bfe",
        pass: "inserir senha aqui"
      }
    });
  }

    /**
    * Send Mail
    * @param mail
    */
  async send(mail: IMessageMail): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: mail.to.name,
        address: mail.to.email,
      },

      from: {
        name: mail.from.name,
        address: mail.from.email,
      },

      subject: mail.subject,
      html: mail.body,
    });
  }
}
