const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
require('dotenv').config(); 
app.use(express.json());
app.post('/api/bookings', async (req, res) => {
  const { toEmail, userName, packageName, numPersons, travelDate, individualDetails,totalPrice } = req.body;
  
  // Create transporter for sending email
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // replace with your SMTP host
    port: 587,               // common port for SMTP
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Format individual details into HTML
  const individualDetailsHTML = individualDetails.map(person => `
    <tr>
      <td>${person.name}</td>
      <td>${person.aadhar}</td>
      <td>${person.age}</td>
    </tr>
  `).join('');

  // Prepare mail options with tables for booking details and individual details
  const mailOptions = {
    from: process.env.EMAIL,
    to: toEmail,
    subject: 'Booking Confirmation',
    html: `
      <h2>Booking Confirmation</h2>
      <p>Dear ${userName},</p>
      <p>Thank you for booking with us! Here are your booking details:</p>

      <!-- First Table: Booking Details -->
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr>
          <th style="text-align: left; padding-right: 20px;">Package Name</th>
          <td>${packageName}</td>
        </tr>
        <tr>
          <th style="text-align: left;">Total Price</th>
          <td>₹${totalPrice}</td>
        </tr>
        <tr>
          <th style="text-align: left;">Number of People</th>
          <td>${numPersons}</td>
        </tr>
        <tr>
          <th style="text-align: left;">Booking Date</th>
          <td>${Date()}</td>
        </tr>
        <tr>
          <th style="text-align: left;">Travel Date</th>
          <td>${travelDate}</td>
        </tr>
      </table>

      <h3>Individual Details</h3>
      <!-- Second Table: Individual Details -->
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th style="text-align: left;">Name</th>
            <th style="text-align: left;">Aadhar Number</th>
            <th style="text-align: left;">Age</th>
          </tr>
        </thead>
        <tbody>
          ${individualDetailsHTML}
        </tbody>
      </table>
      
      <p>We hope you have a wonderful trip!</p>
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Booking confirmed and email sent!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending booking confirmation email.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
