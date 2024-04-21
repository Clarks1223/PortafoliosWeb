const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

//create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.HOST_MAIL,
  port: process.env.PORT_MAIL,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASS_MAIL,
  },
});

//send mail with defined transport object
module.exports.sendMailToUser = async (userMail, token) => {
  let info = await transporter.sendMail({
    from: "gustavouchuarii@gmail.com",
    to: userMail,
    subject: "Verifica tu cuenta de correo electronico",
    html: `<a href="http://localhost:3000/user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
  });
  console.log("Mensaje enviado");
};
