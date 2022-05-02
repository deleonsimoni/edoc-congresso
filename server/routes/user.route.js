const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const emailSender = require('../controllers/email.controller');
const templateEmail = require('../config/templateEmails');
const fileUpload = require('express-fileupload');


const router = express.Router();
module.exports = router;

router.get('/testeBoleto', testeBoleto);


router.use(passport.authenticate('jwt', {
  session: false
}))

router.get('/price/:id', passport.authenticate('jwt', {
  session: false
}), asyncHandler(price));
router.get('/downloadFile', passport.authenticate('jwt', {
  session: false
}), downloadFile);
router.get('/coordinators/:axisId', passport.authenticate('jwt', {
  session: false
}), getCoordinator);
router.get('/reviewer/:axisId', passport.authenticate('jwt', {
  session: false
}), getReviewer);
router.get('/getBoleto', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getBoleto));
router.get('/worksReviewer', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getWorksReviewer));
router.get('/getWorksIncricoes', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getWorksIncricoes));


router.post('/uploadWork/xxiendiperio2022/:id', [passport.authenticate('jwt', {
  session: false
}), fileUpload()], asyncHandler(uploadWork));
router.post('/submeterTransferencia/xxiendiperio2022/:id', [passport.authenticate('jwt', {
  session: false
}), fileUpload()], asyncHandler(submeterTransferencia));
router.post('/payment', passport.authenticate('jwt', {
  session: false
}), payment);
router.post('/gerarPagamento/xxiendiperio2022/:id', passport.authenticate('jwt', {
  session: false
}), payment);
router.post('/coordinator/:axisId', passport.authenticate('jwt', {
  session: false
}), createCoordinator);
router.post('/markCoordinator/:id', passport.authenticate('jwt', {
  session: false
}), markCoordinator);
router.post('/unmarkCoordinator/:id', passport.authenticate('jwt', {
  session: false
}), unmarkCoordinator);
router.post('/reviewer', passport.authenticate('jwt', {
  session: false
}), createReviewer);
router.post('/markReviewerWork/:idWork/:idReviewer/:reviewerMail', passport.authenticate('jwt', {
  session: false
}), markReviewer);


router.delete('/coordinator/:id', passport.authenticate('jwt', {
  session: false
}), deleteCoordinator);
router.delete('/reviewer/:id', passport.authenticate('jwt', {
  session: false
}), deleteReviewer);

router.put('/update', passport.authenticate('jwt', {
  session: false
}), update);

router.route('/')
  .post(asyncHandler(insert));

async function testeBoleto(req, res) {
  //let response = await boletoctrl.gerar();
  res.json(response);
}

async function uploadWork(req, res) {

  //Prazo encerrado
  /*let response = {
    'msg': 'Submissões Encerradas'
  };*/


  let response = await userCtrl.uploadWork(req, res);

  if (!response) {
    console.log('Notificando email submissao');
    let formulario = JSON.parse(req.body.formulario);
    for (let i = 0; i < formulario.authors.length; i++) {
      if (!formulario.authors[i].email) {
        continue;
      } else {
        emailSender.sendMail(formulario.authors[i].email, 'Trabalho Submetido com Sucesso', templateEmail.trabalhoSubmetido);
      }
    }

  }

  res.json(response);
}

async function downloadFile(req, res) {
  let response = await userCtrl.downloadFileS3(req.query.fileName);
  res.json(response);
}

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function update(req, res) {
  let user = await userCtrl.update(req.body);
  res.json(user);
}

async function payment(req, res) {
  let user = await userCtrl.generatePayment(req);
  res.json({
    user
  });
}

async function price(req, res) {
  let price = userCtrl.getPrice(req.params.id);
  res.json({
    price
  });
}

async function getCoordinator(req, res) {
  let coordinators = await userCtrl.getCoordinator(req.params.axisId);
  res.json({
    coordinators
  });
}

async function getReviewer(req, res) {
  let reviewers = await userCtrl.getReviewer(req.params.axisId);
  res.json({
    reviewers
  });
}

async function createCoordinator(req, res) {
  let coordinators = await userCtrl.createCoordinator(req.body, req.params.axisId);
  res.json({
    coordinators
  });
}

async function markCoordinator(req, res) {
  let coordinators = await userCtrl.markCoordinator(req.params.id);
  res.json({
    coordinators
  });
}

async function unmarkCoordinator(req, res) {
  let coordinators = await userCtrl.unmarkCoordinator(req.params.id);
  res.json({
    coordinators
  });
}

async function markReviewer(req, res) {
  let reviewer = await userCtrl.markReviewer(req.params.idWork, req.params.idReviewer, req.params.reviewerMail);
  res.json({
    reviewer
  });
}

async function createReviewer(req, res) {
  let reviewers = await userCtrl.createReviewer(req.body);
  res.json({
    reviewers
  });
}

async function deleteCoordinator(req, res) {
  let coordinators = await userCtrl.deleteCoordinator(req.params.id);
  res.json({
    coordinators
  });
}

async function deleteReviewer(req, res) {
  let reviewers = await userCtrl.deleteReviewer(req.params.id);
  res.json({
    reviewers
  });
}

async function submeterTransferencia(req, res) {
  console.log('cheguei');
  let user = await userCtrl.submeterTransferencia(req);
  res.json({
    user
  });
}

async function getBoleto(req, res) {
  let boleto = await userCtrl.getBoleto(req);
  res.json({
    boleto
  });
}

async function getWorksReviewer(req, res) {
  let works = await userCtrl.getWorksReviewer(req.user._id);
  res.json({
    works
  });
}

async function getWorksIncricoes(req, res) {
  let inscricoes = JSON.parse(req.query.inscricoes.split(','));
  let works = await userCtrl.getWorksInscricoes(inscricoes);
  res.json({
    works
  });
}
