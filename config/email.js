const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'kodaginaganesh@gmail.com',
    pass: 'dryuzaasyyglwnxd'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP connection verified:', success);
  }
});

const sendRegistrationEmail = async (userEmail, registrationData) => {
  const mailOptions = {
    from: '"BVB College Y2K Event Team" <kodaginaganesh@gmail.com>',
    to: userEmail,
    subject: 'Registration Confirmation - BVB College Y2K Silver Jubilee Event',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Registration Successful!</h2>
        <p>Dear ${registrationData.fullName},</p>
        <p>Thank you for registering for the BVB College Y2K Graduation Batch Silver Jubilee Event.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151;">Registration Details:</h3>
          <p><strong>Registration Number:</strong> ${registrationData.registrationNumber}</p>
          <p><strong>Full Name:</strong> ${registrationData.fullName}</p>
          <p><strong>Email:</strong> ${registrationData.email}</p>
          <p><strong>Contact:</strong> ${registrationData.contactNumber}</p>
          <p><strong>Department:</strong> ${registrationData.department}</p>
          <p><strong>KEN:</strong> ${registrationData.ken}</p>
          <p><strong>Food Preference:</strong> ${registrationData.foodPreference}</p>
          <p><strong>Registration Type:</strong> ${registrationData.registrationType}</p>
          <p><strong>Accommodation:</strong> ${registrationData.accommodation}</p>
        </div>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Important:</strong> Please verify your registration using your Registration Number and Phone Number on our website.</p>
        </div>
        
        <p>Event Details:</p>
        <ul>
          <li>Event: Silver Jubilee Celebration</li>
          <li>Dates: 27 & 28 December 2025</li>
          <li>Venue: BVB College of Engineering</li>
        </ul>
        
        <p>Best regards,<br>BVB College Y2K Event Team</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Registration email sent:', info);
    return info;
  } catch (error) {
    console.error('Error sending registration email:', error);
    throw error;
  }
};

const sendAdminNotification = async (registrationData) => {
  const mailOptions = {
    from: '"BVB College Y2K Event Team" <kodaginaganesh@gmail.com>',
    to: 'gifthempersforme@gmail.com', // Use a different email to avoid self-sending issues
    subject: 'New Registration - BVB Y2K Event',
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Registration Received</h2>
        <p>A new registration has been submitted for the Y2K Silver Jubilee Event.</p>
        
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="border: 1px solid #ddd; padding: 8px;"><strong>Registration Number:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${registrationData.registrationNumber}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px;"><strong>Full Name:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${registrationData.fullName}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px;"><strong>Email:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${registrationData.email}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px;"><strong>Contact:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${registrationData.contactNumber}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px;"><strong>Department:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${registrationData.department}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px;"><strong>KEN:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${registrationData.ken}</td></tr>
        </table>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin notification sent:', info);
    return info;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
};

const sendVerificationEmail = async (userEmail, verificationData) => {
  const mailOptions = {
    from: '"BVB College Y2K Event Team" <kodaginaganesh@gmail.com>',
    to: userEmail,
    subject: 'Registration Verified - BVB College Y2K Event',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Registration Verified Successfully!</h2>
        <p>Dear ${verificationData.fullName},</p>
        <p>Your registration has been successfully verified!</p>
        
        <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #16a34a;">Verification Details:</h3>
          <p><strong>Verified Number:</strong> ${verificationData.verifiedNumber}</p>
          <p><strong>Registration Number:</strong> ${verificationData.registrationNumber}</p>
          <p><strong>Full Name:</strong> ${verificationData.fullName}</p>
        </div>
        
        <p>Please keep your Verified Number safe as you'll need it for event entry.</p>
        
        <p>Best regards,<br>BVB College Y2K Event Team</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info);
    return info;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

module.exports = {
  sendRegistrationEmail,
  sendAdminNotification,
  sendVerificationEmail
};