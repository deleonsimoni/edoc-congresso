const express = require('express');
const passport = require('passport');

const aberturaCtrl = require('../controllers/schedule/abertura.controller');
const minicursoCtrl = require('../controllers/schedule/minicurso.controller');
const simposioCtrl = require('../controllers/schedule/simposio.controller');
const posterCtrl = require('../controllers/schedule/poster.controller');
const lancamentoDeLivrosCtrl = require('../controllers/schedule/lancamentoDeLivros.controller');
const atividadeCulturalCtrl = require('../controllers/schedule/atividadeCultural.controller');
const rodasDeConversaCtrl = require('../controllers/schedule/rodasDeConversa.controller');
const painelCtrl = require('../controllers/schedule/painel.controller');
const sessoesEspeciaisCtrl = require('../controllers/schedule/sessoesEspeciais.controller');
const rodaReunioesEntidadesRedesCtrl = require('../controllers/schedule/rodaReunioesEntidadesRedes.controller');
const encerramentoCtrl = require('../controllers/schedule/encerramento.controller');
const asyncHandler = require('express-async-handler');
const fileUpload = require('express-fileupload');


const router = express.Router();

module.exports = router;

router.get('/:idType/:data', asyncHandler(listSchedule));

router.post('/:idType', [passport.authenticate('jwt', {
  session: false
}), fileUpload()], asyncHandler(insertSchedule));

router.post('/unsubscribeMinicurso/:workId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(unsubscribeMinicurso));

router.post('/subscribeMinicurso/:workId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(subscribeMinicurso));

router.post('/unsubscribeRodadeConversa/:workId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(unsubscribeRodadeConversa));

router.post('/subscribeRodadeConversa/:workId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(subscribeRodadeConversa));

router.post('/unsubscribePainel/:workId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(unsubscribePainel));

router.post('/subscribePainel/:workId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(subscribePainel));


router.put('/:idType/:id', passport.authenticate('jwt', {
  session: false
}), asyncHandler(updateSchedule));

router.delete('/:idType/:id', passport.authenticate('jwt', {
  session: false
}), asyncHandler(deleteSchedule));

async function unsubscribeMinicurso(req, res) {
  let users = await minicursoCtrl.unsubscribeMinicurso(req.params.workId, req.user._id);
  res.json(users);
}

async function subscribeMinicurso(req, res) {
  let users = await minicursoCtrl.subscribeMinicurso(req.params.workId, req.user._id, req.user.email);
  res.json(users);
}

async function unsubscribeRodadeConversa(req, res) {
  let users = await rodasDeConversaCtrl.unsubscribeRodadeConversa(req.params.workId, req.user._id);
  res.json(users);
}

async function subscribeRodadeConversa(req, res) {
  let users = await rodasDeConversaCtrl.subscribeRodadeConversa(req.params.workId, req.user._id, req.user.email);
  res.json(users);
}

async function unsubscribePainel(req, res) {
  let users = await painelCtrl.unsubscribePainel(req.params.workId, req.user._id);
  res.json(users);
}

async function subscribePainel(req, res) {
  let users = await painelCtrl.subscribePainel(req.params.workId, req.user._id, req.user.email);
  res.json(users);
}


async function listSchedule(req, res) {

  let schedules;
  let data = req.params.data.replace('-', '/');

  switch (Number(req.params.idType)) {
    case 1:
      schedules = await aberturaCtrl.listSchedule(data);
      res.json(schedules);
      break;
    case 2:
      schedules = await rodasDeConversaCtrl.listSchedule(data); 
      res.json(schedules);
      break;
    case 3:
      schedules = await posterCtrl.listSchedule(data);
      res.json(schedules);
      break;
    case 4:
      schedules = await minicursoCtrl.listSchedule(data);
      res.json(schedules);
      break;
    case 5:
      schedules = await painelCtrl.listSchedule(data); 
      res.json(schedules);
      break;
    case 7:
      schedules = await atividadeCulturalCtrl.listSchedule(data);
      res.json(schedules);
      break;
    case 8:
      schedules = await simposioCtrl.listSchedule(data); 
      res.json(schedules);
      break;
    case 9:
      schedules = await lancamentoDeLivrosCtrl.listSchedule(data);
      res.json(schedules);
      break;
    case 10:
      schedules = await sessoesEspeciaisCtrl.listSchedule(data);
      res.json(schedules);
      break;
    case 11:
      schedules = await rodaReunioesEntidadesRedesCtrl.listSchedule(data);
      res.json(schedules);
      break;
    case 12:
      schedules = await encerramentoCtrl.listSchedule(data);
      res.json(schedules);
      break;
  }
}


async function insertSchedule(req, res) {

  if (!req.user.icAdmin) {
    res.sendStatus(401);
  } else {
    req.body.user = req.user._id;
    let schedules;
    switch (Number(req.params.idType)) {
      case 1:
        schedules = await aberturaCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 2:
        schedules = await rodasDeConversaCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 3:
        schedules = await posterCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 4:
        schedules = await minicursoCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 5:
        schedules = await painelCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 7:
        schedules = await atividadeCulturalCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 8:
        schedules = await simposioCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 9:
        schedules = await lancamentoDeLivrosCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 10:
        schedules = await sessoesEspeciaisCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 11:
        schedules = await rodaReunioesEntidadesRedesCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
      case 12:
        schedules = await encerramentoCtrl.insertSchedule(req.body);
        res.json(schedules);
        break;
    }
  }
}


async function updateSchedule(req, res) {

  if (!req.user.icAdmin) {
    res.sendStatus(401);
  } else {
    req.body.user = req.user._id;
    let schedules;
    switch (Number(req.params.idType)) {
      case 1:
        schedules = await aberturaCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 2:
        schedules = await rodasDeConversaCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 3:
        schedules = await posterCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 4:
        schedules = await minicursoCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 5:
        schedules = await painelCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 7:
        schedules = await atividadeCulturalCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 8:
        schedules = await simposioCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 9:
        schedules = await lancamentoDeLivrosCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 10:
        schedules = await sessoesEspeciaisCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 11:
        schedules = await rodaReunioesEntidadesRedesCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
      case 12:
        schedules = await encerramentoCtrl.updateSchedule(req.params.id, req.body);
        res.json(schedules);
        break;
    }
  }
}


async function deleteSchedule(req, res) {

  console.log(req.params);
  if (!req.user.icAdmin) {
    res.sendStatus(401);
  } else {
    let schedules;

    switch (Number(req.params.idType)) {
      case 1:
        schedules = await aberturaCtrl.deleteSchedule(req.params.id);
        res.json(schedules);
        break;
      case 2:
        schedules = await rodasDeConversaCtrl.deleteSchedule(req.params.id);
        res.json(schedules);
        break;
      case 3:
        schedules = await posterCtrl.deleteSchedule(req.params.id);
        res.json(schedules);
        break;
      case 4:
        schedules = await minicursoCtrl.deleteSchedule(req.params.id);
        res.json(schedules);
        break;
      case 5:
        schedules = await painelCtrl.deleteSchedule(req.params.id);
        res.json(schedules);
        break;
      case 7:
        schedules = await atividadeCulturalCtrl.deleteSchedule(req.params.id);
        res.json(schedules);
        break;
      case 8:
        schedules = await simposioCtrl.deleteSchedule(req.params.id);
        res.json(schedules);
        break;
      case 9:
        schedules = await lancamentoDeLivrosCtrl.deleteSchedule(req.params.id);
        res.json(schedules);
        break;
      case 10:
        schedules = await sessoesEspeciaisCtrl.deleteSchedule(req.params.id);
        res.json(schedules);
        break;
      case 11:
        schedules = await rodaReunioesEntidadesRedesCtrl.deleteSchedule(req.params.id);
        res.json(schedules);
        break;
      case 12:
        schedules = await encerramentoCtrl.deleteSchedule(req.params.id);
        res.json(schedules);
        break;
    }
  }
}
