const express = require('express');
const passport = require('passport');
const chatCtrl = require('../../controllers/virtual/chat-admin.controller');
const asyncHandler = require("express-async-handler");
const router = express.Router();
module.exports = router;


router.get('/chat', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getChat));


router.get('/list', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getHeaderChat));

router.post('/chat', passport.authenticate('jwt', {
  session: false
}), asyncHandler(insertChat));

router.put('/chat', passport.authenticate('jwt', {
  session: false
}), asyncHandler(updateChat));

//Mural
router.get('/mural', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getChatMural));

router.post('/mural', passport.authenticate('jwt', {
  session: false
}), asyncHandler(insertChatMural));

router.put('/mural', passport.authenticate('jwt', {
  session: false
}), asyncHandler(updateChatMural));

router.delete('/mural', passport.authenticate('jwt', {
  session: false
}), asyncHandler(deleteChatMural));

//Work
router.get('/chatWork', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getChatWork));

router.post('/chatWork', passport.authenticate('jwt', {
  session: false
}), asyncHandler(insertChatWork));

router.put('/chatWork', passport.authenticate('jwt', {
  session: false
}), asyncHandler(updateChatWork));


async function getHeaderChat(req, res) {
  let rep = await chatCtrl.getHeaderChat(req);
  res.json(rep);
}

async function getChat(req, res) {
  let rep;
  if(req.query.id && req.user.icAdmin){
    rep = await chatCtrl.getChatAdmin(req.query.id);
  } else {
    rep = await chatCtrl.getChat(req.user._id);
  }
  res.json(rep);
}

async function insertChat(req, res) {

  let rep = await chatCtrl.insertChat(req.body.mensagem, req.user);
  res.json(rep);
}

async function updateChat(req, res) {
  let rep = await chatCtrl.updateChat(req.query.id, req.body.mensagem, req.user);
  res.json(rep);
}

async function getChatMural(req, res) {
  let rep;
  rep = await chatCtrl.getChatMural(req);
  res.json(rep);
}

async function insertChatMural(req, res) {

  let rep = await chatCtrl.insertChatMural(req.body.mensagem, req.user);
  res.json(rep);
}

async function updateChatMural(req, res) {
  let rep = await chatCtrl.updateChatMural(req.query.id, req.body.mensagem, req.user, res);
  res.json(rep);
}

async function deleteChatMural(req, res) {

  let rep = await chatCtrl.deleteChatMural(req, res);
  res.json(rep);
  
}

//CHAT
async function getChatWork(req, res) {
  let rep;
  rep = await chatCtrl.getChatWork(req.query.idWork);
  res.json(rep);
}

async function insertChatWork(req, res) {

  let rep = await chatCtrl.insertChatWork(req.query.idWork, req.body.mensagem, req.user);
  res.json(rep);
}

async function updateChatWork(req, res) {
  let rep = await chatCtrl.updateChatWork(req.query.id, req.body.mensagem, req.user);
  res.json(rep);
}

