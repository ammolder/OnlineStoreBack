const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS } = process.env;

async function sendMail({ to, subject, html }) {
  try {
    const email = {
      from: "info@mailtrap.club",
      to,
      subject,
      // text: "and easy to do anywhere, even with Node.js",
      html,
    };

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      // secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail(email);
  } catch (err) {
    console.log("err", err);
  }
}
module.exports = sendMail;
