const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

//create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.HOST_MAILTRAP,
  port: process.env.PORT_MAILTRAP,
  auth: {
    user: process.env.USER_MAILERTRAP,
    pass: process.env.PASS_MAILTRAP,
  },
});

//send mail with defined transport object
module.exports.sendMailToUser = async (userMail, token) => {
  console.log(token);
  let info = await transporter.sendMail({
    from: "clarks@developer.com",
    to: userMail,
    subject: "Verifica tu cuenta de correo electronico",
    html: `<a href="http://localhost:3000/user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
  });
  console.log("Message sent: %s", info.messageId);
};
