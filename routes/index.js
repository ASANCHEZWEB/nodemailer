const express = require('express');
const router  = express.Router();
const nodemailer = require("nodemailer");
//Importo una plantilla html para el envio de un email maquetado.
const templates = require('../templates/template');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/send-email', (req, res, next) => {
  let { email, subject, message } = req.body;
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'correoquesea@gmail.com',
      pass: 'Contraseña del correo'
    }
  });
  transporter.sendMail({
    from: '"Nombre del que envía" <correoquesea@gmail.com>',
    to: email, 
    subject: subject, 
    text: message,
    html: templates.templateExample(message)
  })
  .then(info => res.render('message', {email, subject, message, info}))
  .catch(error => console.log(error));
});
module.exports = router;
