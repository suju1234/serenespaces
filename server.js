require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Email configuration (update with your email credentials)
const EMAIL_CONFIG = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
};

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'pradeep@serenespaces.com';

// Create email transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required' 
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid email format' 
        });
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid phone number format' 
        });
    }

    // Send email to owner
    const mailOptions = {
        from: EMAIL_CONFIG.auth.user,
        to: OWNER_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <hr>
            <p><em>This message was sent from the Serene Spaces Interior Design website contact form.</em></p>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to owner successfully');
        
        res.status(200).json({ 
            success: true, 
            message: 'Thank you for your message! We will contact you soon.' 
        });
    } catch (emailError) {
        console.error('Error sending email:', emailError);
        res.status(500).json({ 
            success: false, 
            message: 'Error sending your message. Please try again.' 
        });
    }
});

// Start server (only for local development)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Website available at http://localhost:${PORT}`);
    });
}

// Export for Vercel serverless function
module.exports = app;
