const express = require('express');
const passport = require('passport');
const anaisCtrl = require('../controllers/anais.controller');

const router = express.Router();
module.exports = router;


router.get('/anais', getAnais);

router.get('/anaisVirtual', getAnaisVirtual);

router.get('/anaisSumarioVirtual', getSumarioVirtual);


router.post('/anais', passport.authenticate('jwt', {
  session: false
}), insertAnais);

router.put('/anais', passport.authenticate('jwt', {
  session: false
}), updateAnais);

router.delete('/anais/:id', passport.authenticate('jwt', {
  session: false
}), deleteAnais);


async function getAnais(req, res) {
  let anais = await anaisCtrl.getAnais();
  res.json(anais);
}

async function getAnaisVirtual(req, res) {
  let anais = await anaisCtrl.getAnaisVirtual();
  res.json(anais);
}

async function getSumarioVirtual(req, res) {
  let anais = await anaisCtrl.getSumarioVirtual(req);
  res.json(anais);
}

async function insertAnais(req, res) {
  if (req.user.icAdmin || req.user.icEditor) {
    let anais = await anaisCtrl.insertAnais(req.body, req.user._id);
    res.json(anais);
  } else {
    res.sendStatus(401);
  }
}

async function updateAnais(req, res) {
  if (req.user.icAdmin || req.user.icEditor) {
    let anais = await anaisCtrl.updateAnais(req.body, req.user._id);
    res.json(anais);
  } else {
    res.sendStatus(401);
  }
}

async function deleteAnais(req, res) {
  if (req.user.icAdmin || req.user.icEditor) {
    let anais = await anaisCtrl.deleteAnais(req.params.id);
    res.json(anais);
  } else {
    res.sendStatus(401);
  }
}
