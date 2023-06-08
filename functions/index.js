
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


const transporter = nodemailer.createTransport(
    smtpTransport({
        service: 'smtp.sendgrid.net',
        port: 587,
        auth: {
            user: 'apikey',
            pass: "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",

        },
    })
);

exports.sendEmail = functions.https.onCall(async (data, context) => {
    // Récupérez les données de l'e-mail à partir de la demande
    const { email, subject, message } = data;

    // Configuration du message
    const mailOptions = {
        from: email,
        to: "zaaboul.freelance@gmail.com",
        subject: subject,
        text: message,
    };

    try {
        // Envoyer l'e-mail
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        return { success: false, error: error.message };
    }
});
