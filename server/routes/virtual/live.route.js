const express = require('express');
const passport = require('passport');
const asyncHandler = require("express-async-handler");
const virtualCtrl = require('../../controllers/virtual/live.controller');
const router = express.Router();

module.exports = router;

//router.get('/calibratedAllPosters', asyncHandler(calibrateAllPoster));
//router.get('/calibrateAllWorksAuthors', asyncHandler(calibrateAllWorksAuthors));

router.get('/getScheduleByDay', asyncHandler(listVirtual));
router.get('/scheduleWorkPaginate', asyncHandler(listScheduleWorkPaginate));
router.get('/scheduleBooksPaginate', asyncHandler(scheduleBooksPaginate));

router.get('/getSubscribersUser', passport.authenticate("jwt", { session: false, }), asyncHandler(getSubscribersUser));
router.get('/getPresentationsUser', passport.authenticate("jwt", { session: false, }), asyncHandler(getPresentationsUser));
router.get('/getUserMediator', passport.authenticate("jwt", { session: false, }), asyncHandler(getUserMediator));
router.get('/getUserMonitors', passport.authenticate("jwt", { session: false, }), asyncHandler(getUserMonitors));


async function listScheduleWorkPaginate(req, res) {
  let rep = await virtualCtrl.listScheduleWorkPaginate(req);
  res.json(rep);
}

async function scheduleBooksPaginate(req, res) {
  let rep = await virtualCtrl.scheduleBooksPaginate(req);
  res.json(rep);
}

async function getSubscribersUser(req, res) {
  let rep = await virtualCtrl.getSubscribersUser(req.user);
  res.json(rep);
}

async function getPresentationsUser(req, res) {
  let rep = await virtualCtrl.getPresentationsUser(req);
  res.json(rep);
}

async function getUserMediator(req, res) {
  let rep = await virtualCtrl.getUserMediator(req);
  res.json(rep);
}

async function getUserMonitors(req, res) {
  let rep = await virtualCtrl.getUserMonitors(req);
  res.json(rep);
}

async function listVirtual(req, res) {
  let virtual = await virtualCtrl.listVirtual();
  res.json(virtual);
}





async function calibrateAllPoster(req, res) {
  let users = await virtualCtrl.calibrateAllPoster();
  res.json(users);
}

async function calibrateAllWorksAuthors(req, res) {
  let users = await virtualCtrl.calibrateAllWorksAuthors();
  res.json(users);
}