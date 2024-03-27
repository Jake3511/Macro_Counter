const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000; // Use the environment port if available
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
    const {name, email, calories, protein, carbs, fats} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'noreply3511@gmail.com',
            pass: 'aeukhvufgrxdzxtc'
        }
    });
    const mailOptions = {
        from: 'noreply351@gmail.com',
        to: email,
        subject: 'Macro Counter Results',
        html: `
            <p>Hello ${name},</p>
            <p>Here are your macro counter results:</p>
            <p>Calories: ${calories}</p>
            <p>Protein: ${protein} grams</p>
            <p>Carbs: ${carbs} grams</p>
            <p>Fats: ${fats} grams</p>
            <p>Best regards,</p>
            <p>Your Macro Counter Team</p>
        `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});