import nodemailer, { SentMessageInfo } from 'nodemailer';
import path from 'path';
import EmailTemplates from 'email-templates';

import { EmailEnum } from '../constants';
import { config } from '../config/config';
import { emailInfo } from '../constants/email.info';

class EmailService {
  templateRenderer = new EmailTemplates({
    views: {
      root: path.join(__dirname, '../', 'email-templates')
    }
  });

  async sendMail(userMail: string, action: EmailEnum, context = {}): Promise<SentMessageInfo> {
    const {subject, templateName} = emailInfo[action];

    Object.assign(context, {frontendUrl: 'https://google.com'});

    const html = await this.templateRenderer.render(templateName, context);

    const emailTransporter = nodemailer.createTransport({
      from: 'No Reply Sep-2021',
      service: 'gmail',
      auth: {
        user: config.NO_REPLY_EMAIL,
        pass: config.NO_REPLY_EMAIL_PASSWORD
      }
    });

    return emailTransporter.sendMail({
      to: userMail,
      subject,
      html
    });
  }
}

export const emailService = new EmailService();
