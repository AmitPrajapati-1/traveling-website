const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();  
const app = express();
app.use(bodyParser.json()); 
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  
  port: 465,              
  secure: true,                  
  auth: {
    user: process.env.EMAIL,       
    pass: process.env.EMAIL_PASS,      
  },
  debug: true,
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).send('All fields are required');
  }

  const mailOptions = {
    from: email,  
    to: process.env.EMAIL,  
    subject: `New Contact Us Message: ${subject}`,  
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,  
  };

  try {
    await transporter.sendMail(mailOptions);

    res.status(200).send('Message sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send message.');
  }
});
const PORT = process.env.PORT||3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
