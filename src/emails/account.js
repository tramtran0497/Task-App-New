const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeAccount = (email, name) => {
    sgMail.send({
        to: email,
        from: 'tramtran0497@gmail.com', 
        subject: 'Thanks for joining in us!',
        text: `Welcome to the app, ${name}`,
    });
};

const sendCanceledAccount = (email, name) => {
    sgMail.send({
        to: email,
        from: 'tramtran0497@gmail.com', 
        subject: 'Sorry for see you go!',
        text: `Goodbye, ${name}. Hope to see you soon!`,
    });
};

module.exports = {
    sendWelcomeAccount,
    sendCanceledAccount
}