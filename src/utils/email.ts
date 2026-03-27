import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  data: any;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
  },
});

export const sendEmail = async ({
  to,
  subject,
  template,
  data,
}: EmailOptions) => {
  const templatePath = path.join(__dirname, "../templates", `${template}.ejs`);
  const html = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@example.com",
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
