require('dotenv').config();
const express = require('express');

const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const USER_EMAIL = process.env.USER_EMAIL;
const PASS = process.env.PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: USER_EMAIL,
    pass: PASS,
  },
});

app.post('/email', async (req, res) => {
  try {
    const { to, subject, text } = req.body
    // const info = await transporter.sendMail({
    //   from: '"Maddison Foo Koch 👻" <fabiuuu8@gmail.com>',
    //   to: "vallejosabrina47@gmail.com, fabicara56@gmail.com",
    //   subject: "Hello ✔",
    //   text: "Hello world?"
    // });

    const info = await transporter.sendMail(
      {
        from: '"Tu alma gemela 👻" <fabiuuu8@gmail.com>',
        to,
        subject,
        text
      }
    );

    res.send(info.messageId);
  } catch (error) {
    console.log(error);
    res.send("No se pudo enviar el email.")
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
