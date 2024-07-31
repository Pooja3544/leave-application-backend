const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'poojapradeep3544@gmail.com',
    pass: 'vchvqgzsuekdvdjl'
  }
});

app.post('/send-email', (req, res) => {
  const { startDate, endDate, leaveType, reason, leaveDays } = req.body;

  const mailOptions = {
    from: 'poojapradeep3544@gmail.com',
    to: 'pooja.vm9671@gmail.com',
    subject: 'Leave Request',
    html: `<p>Leave Request Details:</p>
           <ul>
             <li><strong>Start Date:</strong> ${startDate}</li>
             <li><strong>End Date:</strong> ${endDate}</li>
             <li><strong>Type of Leave:</strong> ${leaveType}</li>
             <li><strong>Reason:</strong> ${reason}</li>
             <li><strong>Number of Leave Days:</strong> ${leaveDays}</li>
           </ul>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return console.log('Pooja',info.messageId);
      //return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.post('/accept-leave', (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;

  const mailOptions = {
    from: 'poojapradeep3544@gmail.com',
    to: 'pooja.vm9671@gmail.com',
    subject: 'Leave Request Accepted',
    html: `<p>The leave request  has been accepted.</p>
           <ul>
             <li><strong>Leave Type:</strong> ${leaveType}</li>
             <li><strong>Start Date:</strong> ${startDate}</li>
             <li><strong>End Date:</strong> ${endDate}</li>
             <li><strong>Reason:</strong> ${reason}</li>
           </ul>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending acceptance email:', error);
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Acceptance email sent: ' + info.response);
  });
});

app.post('/reject-leave', (req, res) => {
  const {  leaveType, startDate, endDate, reason } = req.body;

  const mailOptions = {
    from: 'poojapradeep3544@gmail.com',
    to: 'pooja.vm9671@gmail.com',
    subject: 'Leave Request Rejected',
    html: `<p>The leave request has been rejected.</p>
           <ul>
             <li><strong>Leave Type:</strong> ${leaveType}</li>
             <li><strong>Start Date:</strong> ${startDate}</li>
             <li><strong>End Date:</strong> ${endDate}</li>
             <li><strong>Reason:</strong> ${reason}</li>
           </ul>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending rejection email:', error);
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Rejection email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
