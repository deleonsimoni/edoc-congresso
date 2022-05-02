const express = require('express');
const passport = require('passport');
const conferencistaCtrl = require('../controllers/conferencista.controller');
const fileUpload = require('express-fileupload');
const asyncHandler = require('express-async-handler');

const router = express.Router();
module.exports = router;


router.get('/conferencista', getConferencistas);
router.post('/conferencista', [passport.authenticate('jwt', { session: false }), fileUpload()], asyncHandler(insertConferencista));
router.delete('/conferencista/:id', passport.authenticate('jwt', { session: false }), deleteConferencista);


async function getConferencistas(req, res) {
  let conferencista = await conferencistaCtrl.getConferencistas();
  res.json(conferencista);
}

async function insertConferencista(req, res) {
  if (req.user.icAdmin) {
    let conferencista = await conferencistaCtrl.insertConferencista(req);
    res.json(conferencista);
  } else {
    res.sendStatus(401);
  }
}

async function deleteConferencista(req, res) {
  if (req.user.icAdmin) {
    let conferencista = await conferencistaCtrl.deleteConferencista(req.params.id);
    res.json(conferencista);
  } else {
    res.sendStatus(401);
  }
}