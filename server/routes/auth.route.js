const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const emailSender = require('../controllers/email.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const templateEmail = require('../config/templateEmails');
const User = require('../models/user.model');
const S3Uploader = require('../controllers/aws.controller');
const fileUpload = require("express-fileupload");

const router = express.Router();
module.exports = router;

router.post('/register', fileUpload(), asyncHandler(register), login);
router.post('/forgotPassword', asyncHandler(forgotPassword));
router.post('/resetPassword', asyncHandler(resetPassword));
router.post('/login', passport.authenticate('local', { session: false }), login);
router.get('/me', passport.authenticate('jwt', { session: false }), login);
router.get('/refresh', passport.authenticate('jwt', { session: false }), refresh);


async function register(req, res, next) {
  let formulario = JSON.parse(req.body.formulario);
  let fileName = null;

  if (formulario.document && await userCtrl.checkDocumentDup(formulario.document)) {
    return res.status(500).send({ message: "cpf duplicado" });
  } else {
    if (formulario.categoriaId == 1 || formulario.categoriaId == 2 && req.files.file) {
      fileName = config.PATH_S3_DEV ? config.PATH_S3_DEV + 'xxiendiperio2022/comprovantes/' + formulario.document + "_" + req.files.file.name : 'xxiendiperio2022/comprovantes/' + formulario.document + "_" + req.files.file.name;
      S3Uploader.uploadFile(fileName, req.files.file.data).then(async fileData => {
        console.log('Sucesso envio comprovante para AWS ' + fileName);
        formulario.comprovanteAWS = fileName;
        await saveUser(formulario, req, next);
      }).catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
    } else {
      await saveUser(formulario, req, next);
    }

  }

}

async function saveUser(formulario, req, next) {
  let user = await userCtrl.insert(formulario);
  delete user.hashedPassword;
  emailSender.sendMailAWS(user.email, 'Inscrição Realizada com Sucesso', templateEmail.inscricaoSucesso);
  req.user = user;
  next();
}

async function forgotPassword(req, res) {

  let user = await User.findOne({ email: req.body.email, document: req.body.document });

  if (!user) {
    return res.status(400).send({ message: "Usuário inválido" });
  }

  let response = await userCtrl.generateNewPassword(user);

  return res.status(response.status).send({ message: response.message });
}


async function resetPassword(req, res) {

  let user = await User.findOne({ mailCodePassword: req.body.mailCodePassword });

  if (!user) {
    return res.status(400).send({ message: "Código inválido" });
  }

  let response = await userCtrl.resetPassword(req, user);

  return res.status(response.status).send({ message: response.message });
}

async function refresh(req, res) {
  let user = await User.findById(req.user._id);
  user = user.toObject();
  delete user.hashedPassword;
  res.json({ user });

}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ token });
}
