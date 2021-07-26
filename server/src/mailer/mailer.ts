/* import nodemailer from "nodemailer";
const dotenv = require("dotenv").config();

// const user = require("../config").;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    accessToken: process.env.GMAIL_ACCESS_TOKEN,
  },
});

export const sendConfirmationEmail = async (
  name: string,
  email: string
  //   confirmationCode: string
) => {
  try {
    await transporter.sendMail({
      from: `SWAT<${process.env.MAIL_USER}>`,
      to: email,
      subject: "Please confirm your account",
      html: `<div">
        <h1 style="color:blue; text-align:center;">Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://wwww.google.com> Click here</a>
        </div>`,
    });
  } catch (err) {
    console.log(err);
  }
};
 */