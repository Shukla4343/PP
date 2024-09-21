import nodemailer from "nodemailer";

const sendMail = async(req, res)=>{
  let testAccount = await nodemailer.createTestAccount();

  let transport = await  nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'thaddeus.smith@ethereal.email',
      pass: '5Cwpvqngy5PkdSc86a',
    },
  });

let  info = await transport.sendMail({
  from: '"Indo Wings " <software@indowings.com>', // sender
  to: "ayushichaudhary1709@gmail.com",
  subject:"Partner Verification",
  text:"Hello Partner", // plain text body
  html:`<b>Hello Partner </b>`// HTML body content
});
console.log("Message sent: %s", info.messageId);
res.json(info);
};
module.exports = sendMail;

// import dotenv from "dotenv";

// dotenv.config();

// const { SMTP_MAIL, SMTP_PASSWORD } = process.env;

// const sendMail = async (email, mailSubject, content) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: SMTP_MAIL,
//         pass: SMTP_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: SMTP_MAIL,
//       to: email,
//       subject: mailSubject,
//       html: content,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log('Mail sent successfully:', info.response);
//   } catch (error) {
//     console.error('Error sending mail:', error);
//     throw error;
//   }
// };

// export default sendMail;

// // https://www.youtube.com/watch?v=QDIOBsMBEI0