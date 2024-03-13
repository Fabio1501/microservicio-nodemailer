require('dotenv').config();
const express = require('express');

const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const USER_EMAIL = process.env.USER_EMAIL;
const PASS = process.env.PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: USER_EMAIL,
    pass: PASS,
  },
});

app.post('/subscribe', async (req, res) => {
  try {
    const { to } = req.body
    const filePath = path.join(__dirname, "./prueba.html");
    const html = fs.readFileSync(filePath, "utf8");

    const info = await transporter.sendMail(
      {
        from: `"Lazos 🌈" <${USER_EMAIL}>`,
        to,
        subject: "Suscripción a newsletter.",
        html
      }
    );

    res.send("Email enviado correctamente.");
  } catch (error) {
    console.log(error);
    res.send("No se pudo enviar el email.")
  }
});

app.post('/email', async (req, res) => {
  try {
    const { to, subject, text } = req.body
    const info = await transporter.sendMail(
      {
        from: `"Lazos 🌈" <${USER_EMAIL}>`,
        to,
        subject,
        text
      }
    );
    
    res.send("Email enviado correctamente.");
  } catch (error) {
    console.log(error);
    res.send("No se pudo enviar el email.")
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
