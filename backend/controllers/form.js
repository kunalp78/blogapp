const { sendEmailWithNodemailer } = require("../helpers/email");
 
exports.contactForm = (req, res) => {
//   console.log(req.body);
  const { name, email, message } = req.body;
    // console.log(req.body)
    const emailData = {
        to: process.env.EMAIL_TO,
        from: email,
        subject: `Contact form - ${process.env.APP_NAME} `,
        text: `Email recieved from contact form \n Sender name: ${name} \n Sender email: ${email} \n Sender message ${message}`,
        html: `
            <h1> Email Recieved from contact form<h1>
            <p> Sender name: ${name}</p>
            <p> Sender email: ${email}</p>
            <p> Sender message ${message}</p>
            <hr/>
            <p>This site may contain sensetive information<p>
            <p>https://localhost:3000<p>
        `
    };

    sendEmailWithNodemailer(req, res, emailData);
};
