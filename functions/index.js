
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const cors = require('cors')({
    origin: ['http://localhost:3000', 'https://housemakere.vercel.app']
  });

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

exports.sendEmail = functions.https.onRequest((req, res) => {
    // Autoriser toutes les requêtes CORS
    cors(req, res, () => {
        // Récupérez les données de l'e-mail à partir de la demande
        const { email, subject, message } = req.body;

        // Configuration du message
        const mailOptions = {
            from: email,
            to: "zaaboul.freelance@gmail.com",
            subject: subject,
            text: message,
        };

        // Envoyer l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
                res.status(500).json({ success: false, error: error.message });
            } else {
                console.log('E-mail envoyé:', info.response);
                res.json({ success: true });
            }
        });
    });
});