import { text } from "express";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Project manager",
      link: "https://projectmanagercohost.co",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHTML = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.ACCESS_TOKEN_EXPIRY,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });
  const mail = {
    from: "mail.projectmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHTML,
  };
  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.log("error service failed boss", error);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our WebApp",
      action: {
        intructions:
          "to verify your email please click on the following button",
        button: {
          color: "#22BC66",
          text: " Click here to verify",
          link: verificationUrl,
        },
      },
      outro: "Thank you",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got request to reset the password of your account",
      action: {
        intructions:
          "to reset your password please click on the following button",
        button: {
          color: "#ff0000",
          text: " Click here to verify",
          link: passwordResetUrl,
        },
      },
      outro: "Thank you",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
