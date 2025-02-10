import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cors from "cors";

// import env variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

// create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
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
    <h1>New Message From ${fName} ${lName}</h1>
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

app.post("/api/message", async (req, res) => {
  try {
    const { fName, lName, email, phone, contactReason, subject, message } =
      req.body;
    const info = await transporter.sendMail(
      mailDetails(fName, lName, email, phone, contactReason, subject, message)
    );
    console.log(info.response);
    res.json({ message: "email sent successfully" });
  } catch (err) {
    res.status(500).json({ err: "Error sending email" });
  }
});

// setup port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
