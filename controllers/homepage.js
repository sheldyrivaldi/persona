const {Gmail} = require("../configs/email")
require("dotenv").config()

const Homepage = (req, res)=>{

    const config = {
        from: process.env.MAIL_USERNAME, // verified sender email
        to: "sheldyyrivaldii@gmail.com", // recipient email
        subject: "Email dari Homepage", // Subject line
        text: "Hello world!", // plain text body
        html: "<b>Hello world!</b>", // html body
      }
    
    Gmail.sendMail(config, (error, info) =>{
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    res.status(200).json({
        "code": "200",
        "status": "OK",
        "message": "Hello! Welcome to Me Persona App.",
    })
}




module.exports = {Homepage}