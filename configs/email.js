const nodemailer = require("nodemailer");
require('dotenv').config()


const Gmail = nodemailer.createTransport({
    service: "gmail",
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT || 587, 
    secure: false, // Set to true if you're using port 465
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: true,
    },
});

module.exports = {Gmail};