"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
var sendEmailConfirmation = function (receiver) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    var mailOptions = {
        from: process.env.EMAIL,
        to: receiver,
        subject: 'Welcome',
        text: 'Welcome to finy, the home of free and unfiltered news on the Go',
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error sending email:', error);
        }
        else {
            console.log('Email sent:', info.response);
        }
    });
};
module.exports = { sendEmailConfirmation: sendEmailConfirmation };
