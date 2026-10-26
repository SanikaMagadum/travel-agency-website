
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

async function sendBookingNotification(booking) {
  return transporter.sendMail({
    from: `"Travel Website" <${process.env.GMAIL_USER}>`,
    to: "sanikamagadumm2004@gmail.com",
    subject: `New Booking Inquiry - ${booking.name}`,
    text: `
A new booking inquiry has been submitted.

Customer Name: ${booking.name}
Email: ${booking.email}
Phone: ${booking.phone}
Tour ID: ${booking.tour_id}
Travel Date: ${booking.travel_date}
Travelers: ${booking.travelers}
Message: ${booking.message || "No additional message"}

Please check your booking database and contact the customer to confirm availability.
    `
  });
}

module.exports = { sendBookingNotification };
