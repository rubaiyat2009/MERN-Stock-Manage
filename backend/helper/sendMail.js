const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async ({ to, subject, html, text, from = 'test@mindset.swiss' }) => {
    const msg = {
        to: to,
        from: from, // Use the email address or domain you verified above
        subject: subject,
        text: text,
        html: html,
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.log("error", error);
    }
}

module.exports = sendMail