const nodemailer = require("nodemailer");
const sendMail = (userMail, message, subject) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testuser2676@gmail.com",
      pass: "yhzcdxruekysoegu",
    },
  });

  const mailOptions = {
    from: "testuser2676@gmail.com",
    to: userMail,
    subject: subject,
    text: message,
    html: "<h1 style='color:red'>HELLO </h1>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;
