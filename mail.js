const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
// Middleware to parse the incoming JSON data
app.use(bodyParser.json());

// Setup Nodemailer transport (use a real email service like Gmail, SMTP, etc.)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can use other services or SMTP servers
  auth: {
    user: 'shivanshraheja81@gmail.com', // Replace with your email address
    pass: 'lkiz koci xhay tvzy',   // Replace with your email password
  },
});

// Handle the POST request from the contact form
app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;

  // Email content
  const mailOptions = {
    from: email,             // Sender's email (user)
    to: 'shivanshraheja81@gmail.com', // Replace with the recipient's email
    subject: `New message from ${name}`, // Subject
    text: `You have received a new message from ${name} (${email}):\n\n${message}`, // Body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending message');
    }
    res.status(200).send('Your message was sent, thank you!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
