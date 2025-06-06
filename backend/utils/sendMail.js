const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const envoyerMail = async (destinataire, sujet, message) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: destinataire,
        subject: sujet,
        html: message
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Erreur lors de l’envoi du mail :', error);
        throw error;
    }
};

module.exports = envoyerMail;
