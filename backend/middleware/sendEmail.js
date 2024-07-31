import nodemailer from "nodemailer"
// const email = require('../config').get('staging').email;

const sendEmail = async ({email, sub, body }) => {
  try {
    console.log(process.env.email_username)
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: process.env.HOST,
        secure: false,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.email_username,
          pass: process.env.Password
        }
      });

      let mailOptions = {
        // from: `Community Group <${config.SENDING_FROM}>`,
        from: `COMMUNITY GROUP`,
        to: email,
        subject: sub,
        html: body
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error in transporter.sendMail()", error);
          reject(true)
        } else {
          console.log("Email sent: " + info.response);
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.log("Catch in sendMail==", error);
    reject(true)
  }
};

export default sendEmail
