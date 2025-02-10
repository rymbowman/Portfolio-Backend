import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// import env variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Mail details
const mailDetails = (
  fName,
  lName,
  email,
  phone,
  contactReason,
  subject,
  message
) => {
  return {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "New message from portfolio",
    html: `
    <h1>New Message From ${fname} ${lname}</h1>
    <p>Email: ${email}</p>
    <p>Phone Number: ${phone}</p>
    <p>Reason for contacting: ${contactReason}</p> 
    <h2>${subject}</h2>
    <p>${message}</p>
    `,
  };
};

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// setup port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
