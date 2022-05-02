const aberturaCtrl = require('../schedule/abertura.controller');
const simposioCtrl = require('../schedule/simposio.controller');
const lancamentoDeLivrosCtrl = require('../schedule/lancamentoDeLivros.controller');
const atividadeCulturalCtrl = require('../schedule/atividadeCultural.controller');
const sessoesEspeciaisCtrl = require('../schedule/sessoesEspeciais.controller');
const rodaReunioesEntidadesRedesCtrl = require('../schedule/rodaReunioesEntidadesRedes.controller');
const posterCtrl = require('../schedule/poster.controller');
const encerramentoCtrl = require('../schedule/encerramento.controller');
const paginate = require("jw-paginate");
const Minicurso = require('../../models/schedule/minicurso.model');
const Painel = require('../../models/schedule/painel.model');
const RodasDeConversa = require('../../models/schedule/rodasDeConversa.model');
const Poster = require('../../models/schedule/poster.model');
const User = require('../../models/user.model');
const Work = require('../../models/work.model');
const Abertura = require('../../models/schedule/abertura.model');
const AtividadeCultural = require('../../models/schedule/atividadeCultural.model');
const Simposio = require('../../models/schedule/simposio.model');
const LancamentoLivros = require('../../models/schedule/lancamentoDeLivros.model');
const SessaoEspecial = require('../../models/schedule/sessoesEspeciais.model');
const ConexaoEntrevista = require('../../models/schedule/rodaReunioesEnidadesRedes.model');
const Encerramento = require('../../models/schedule/encerramento.model');
const S3Uploader = require('../../controllers/aws.controller');
const config = require('../../config/config');


module.exports = {
  listVirtual,
  listScheduleWorkPaginate,
  getSubscribersUser,
  calibrateAllPoster,
  calibrateAllWorksAuthors,
  scheduleBooksPaginate,
  getPresentationsUser,
  getUserMonitors,
  getUserMediator
}


async function listScheduleWorkPaginate(req) {
  const pageSize = 5;
  const page = req.query.page || 1;
  const date = req.query.date;
  let schedule;
  let total;
  let search = {};


  if (req.query.titulo && req.query.titulo != 'undefined') search.workTitle = { $regex: ".*" + req.query.titulo + ".*" };
  if (req.query.eixo && req.query.eixo != 'undefined') search['axis'] = Number(req.query.eixo);
  //if(req.query.author) search.workTitle = { $regex: ".*" + req.query.author + ".*" };

  switch (Number(req.query.type)) {
    case 4:
      total = await Minicurso.find(
        {
          $and:
            [
              { 'dates.date': { $in: date } },
              search

            ]
        }).count();
      schedule = await Minicurso.find(
        {
          $and:
            [
              { 'dates.date': { $in: date } },
              search

            ]
        })
        .sort({
          'dates.startTime': 1
        })
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      break;

    case 5:
      total = await Painel.find(
        {
          $and:
            [
              { 'dates.date': { $in: date } },
              search

            ]
        }).count();
      schedule = await Painel.find(
        {
          $and:
            [
              { 'dates.date': { $in: date } },
              search

            ]
        })
        .sort({
          'dates.startTime': 1
        })
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      break;

    case 2:
      total = await RodasDeConversa.find(
        {
          $and:
            [
              { 'dates.date': { $in: date } },
              search

            ]
        }).count();
      schedule = await RodasDeConversa.find(
        {
          $and:
            [
              { 'dates.date': { $in: date } },
              search

            ]
        })
        .sort({
          'dates.startTime': 1
        })
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      break;

    case 3:
      total = await Poster.find(
        {
          $and:
            [
              { 'dates.date': { $in: date } },
              search

            ]
        }).count();
      schedule = await Poster.find(
        {
          $and:
            [
              { 'dates.date': { $in: date } },
              search

            ]
        })
        .sort({
          'dates.startTime': 1
        })
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      break;
    //FIM WORKS
    //INICIO GENERICS
    case 1:
      total = await Abertura.find({
        $and: [
          { date: date },
          search
        ]
      })
        .count();

      schedule = await Abertura.find({
        $and: [
          { date: date },
          search
        ]
      })
        .sort({
          startTime: 1
        })
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      break;
    case 7:
      total = await AtividadeCultural.find({
        $and: [
          { date: date },
          search
        ]
      }).count();
      schedule = await AtividadeCultural.find({
        $and: [
          { date: date },
          search
        ]
      })
        .sort({
          startTime: 1
        })
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      break;
    case 8:
      total = await Simposio.find({
        $and: [
          { date: date },
          search
        ]
      }).count();
      schedule = await Simposio.find({
        date: date
      })
        .sort({
          startTime: 1
        })
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      break;
    case 9:
      total = await LancamentoLivros.find({
        $and: [
          { date: date },
          search
        ]
      }).count();
      schedule = await LancamentoLivros.find({
        $and: [
          { date: date },
          search
        ]
      })
        .sort({
          startTime: 1
        })
        .select('-books')
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      break;
    case 10:
      total = await SessaoEspecial.find({
        $and: [
          { date: date },
          search
        ]
      }).count();
      schedule = await SessaoEspecial.find({
        $and: [
          { date: date },
          search
        ]
      })
        .sort({
          startTime: 1
        })
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      break;
    case 11:
      total = await ConexaoEntrevista.find({
        $and: [
          { date: date },
          search
        ]
      }).count();
      schedule = await ConexaoEntrevista.find({
        $and: [
          { date: date },
          search
        ]
      })
        .sort({
          startTime: 1
        })
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      break;
    case 12:
      total = await Encerramento.find({
        $and: [
          { date: date },
          search
        ]
      }).count();
      schedule = await Encerramento.find({
        $and: [
          { date: date },
          search
        ]
      })
        .sort({
          startTime: 1
        })
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      break;
  }

  const pager = await paginate(total, page, pageSize);

  return {
    schedule,
    pager,
  };
}

async function scheduleBooksPaginate(req) {
  const pageSize = 5;
  const page = req.query.page || 1;
  const livro = await LancamentoLivros.findById(req.query.id).lean();
  const total = livro.books ? livro.books.length : 0;
  const begin = ((page - 1) * pageSize);
  const end = begin + pageSize;
  const books = livro.books.slice(begin, end);
  /*let retornoAws;

  for (let index = 0; index < books.length; index++) {
    retornoAws = await S3Uploader.downloadFile(config.PATH_S3_DEV ? config.PATH_S3_DEV + 'xxiendiperio2022/books/' + books[index].nameMiniature : 'xxiendiperio2022/books/' + books[index].nameMiniature);
    books[index].miniature = retornoAws.data.Body;
  }*/

  const pager = await paginate(total, page, pageSize);

  return {
    books,
    pager,
  };
}

async function getSubscribersUser(user) {

  let schedules = [];
  let schedule = {};
  if (user.cursosInscritos) {

    for (let index = 0; index < user.cursosInscritos.length; index++) {

      switch (Number(user.cursosInscritos[index].icModalityId)) {
        case 4:
          schedule = await Minicurso.findById({ _id: user.cursosInscritos[index].idSchedule }).lean();
          if (schedule) schedule.type = 4;
          break;
        case 5:
          schedule = await Painel.findById({ _id: user.cursosInscritos[index].idSchedule }).lean();
          if (schedule) schedule.type = 5;
          break;
        case 2:
          schedule = await RodasDeConversa.findById({ _id: user.cursosInscritos[index].idSchedule }).lean();
          if (schedule) schedule.type = 2;
          break;
        case 3:
          schedule = await Poster.findById({ _id: user.cursosInscritos[index].idSchedule }).lean();
          if (schedule) schedule.type = 3;
          break;
      }

      schedules.push(schedule);

    }

    return schedules;
  }


}

async function getPresentationsUser(req) {

  let work = [];
  let response = [];
  let schedule;

  if (req.user.works) {

    for (let index = 0; index < req.user.works.length; index++) {
      work.push(await Work.findById(req.user.works[index]._id).select('modalityId'));
    }

    for (let index = 0; index < work.length; index++) {
      switch (Number(work[index].modalityId)) {
        case 4:
          schedule = await Minicurso.findOne({ work: work[index]._id }).lean();
          if (schedule) schedule.type = 4;
          response.push(schedule);
          break;
        case 5:
          schedule = await Painel.findOne({ work: work[index]._id }).lean();
          if (schedule) schedule.type = 5;
          response.push(schedule);
          break;
        case 2:
          schedule = await RodasDeConversa.findOne({ work: work[index]._id }).lean();
          if (schedule) schedule.type = 2;
          response.push(schedule);
          break;
      }
    }

  }


  return await response;

}

async function getUserMediator(req) {

  let response = [];
  let schedule = {};

  if (req.user.mediador) {
    for (let index = 0; index < req.user.mediador.length; index++) {
      switch (Number(req.user.mediador[index].icModalityId)) {
        case 4: //minicurso
          schedule = await Minicurso.findById(req.user.mediador[index].idSchedule).lean();
          if (schedule) schedule.type = 4;
          response.push(schedule);
          break;
        case 5://painel
          schedule = await Painel.findById(req.user.mediador[index].idSchedule).lean();
          if (schedule) schedule.type = 5;
          response.push(schedule);
          break;
        case 2: //rodaDeConversa
          schedule = await RodasDeConversa.findById(req.user.mediador[index].idSchedule).lean();
          if (schedule) schedule.type = 2;
          response.push(schedule);
          break;
        case 3: //pôster
          schedule = await Poster.findById(req.user.mediador[index].idSchedule).lean();
          if (schedule) schedule.type = 3;
          response.push(schedule);
          break;
      }
    }
  }
  return await response;
}

async function getUserMonitors(req) {

  let response = [];
  let schedule = {};

  if (req.user.monitor) {
    for (let index = 0; index < req.user.monitor.length; index++) {
      switch (Number(req.user.monitor[index].icModalityId)) {
        case 4: //minicurso
          schedule = await Minicurso.findById(req.user.monitor[index].idSchedule).lean();
          if (schedule) schedule.type = 4;
          response.push(schedule);
          break;
        case 5://painel
          schedule = await Painel.findById(req.user.monitor[index].idSchedule).lean();
          if (schedule) schedule.type = 5;
          response.push(schedule);
          break;
        case 2: //rodaDeConversa
          schedule = await RodasDeConversa.findById(req.user.monitor[index].idSchedule).lean();
          if (schedule) schedule.type = 2;
          response.push(schedule);
          break;
        case 3: //pôster
          schedule = await Poster.findById(req.user.monitor[index].idSchedule).lean();
          if (schedule) schedule.type = 3;
          response.push(schedule);
          break;
      }
    }
  }
  return await response;
}

async function listVirtual() {

  const dateNow = new Date();
  let date = dateNow.getDate().toString() + '/' + (dateNow.getMonth() + 1);

  //marretando para homologação.
  //const date = '29/10';

  if (date.length == 4) {
    date = "0" + date;
  }

  let virtual = { schedules: [] };
  //if (date == "29/10") {
  virtual.abertura = await aberturaCtrl.listSchedule(date);
  //} else {
  //  virtual.abertura = [];
  //}
  if (date == "12/11") {
    virtual.encerramento = await encerramentoCtrl.listSchedule(date);
  }
  else {
    virtual.encerramento = [];
  }

  virtual.atividadeCultural = await atividadeCulturalCtrl.listSchedule(date);
  virtual.lancamentoDeLivros = await lancamentoDeLivrosCtrl.listSchedule(date);
  virtual.rodaReunioesEntidadesRedes = await rodaReunioesEntidadesRedesCtrl.listSchedule(date);
  virtual.sessoesEspeciais = await sessoesEspeciaisCtrl.listSchedule(date);
  virtual.simposio = await simposioCtrl.listSchedule(date);

  virtual.date = date;

  return await virtual;
}

















async function calibrateAllWorksAuthors() {
  const posters = await Poster.find();
  const minicursos = await Minicurso.find();
  const rodaDeConversas = await RodasDeConversa.find();
  const painels = await Painel.find();

  let workWithUser;
  let namesAuthors = [];

  console.log('Trabalhando Poster')
  for (let posterIndex = 0; posterIndex < posters.length; posterIndex++) {
    const element = posters[posterIndex];

    if (element.worksPoster) {
      for (let index = 0; index < element.worksPoster.length; index++) {
        if (!element.worksPoster[index].workTitle) continue;
        namesAuthors = [];
        workWithUser = await Work.findById({ _id: element.worksPoster[index].work }).select('authors');
        if (workWithUser.authors) {

          for (let autores = 0; autores < workWithUser.authors.length; autores++) {
            const autoresTrabalho = workWithUser.authors[autores];
            namesAuthors.push(await User.findById(autoresTrabalho.userId).select('-_id fullname'))
          }

          await Poster.findOneAndUpdate({ worksPoster: { $elemMatch: { _id: element.worksPoster[index]._id } } }, { $set: { "worksPoster.$.workAuthor": namesAuthors } }, function (err) {
            console.log(err ? err : 'success');
          });

        }
      }
    }
  }


  return 'autores feito';
}

async function calibrateAllPoster() {
  const poster = await Poster.find();
  let workWithUser;

  for (let posterIndex = 0; posterIndex < poster.length; posterIndex++) {
    const element = poster[posterIndex];
    if (element.worksPoster) {
      for (let index = 0; index < element.worksPoster.length; index++) {
        if (!element.worksPoster[index].workTitle) continue;
        workWithUser = await Work.findById({ _id: element.worksPoster[index].work }).select('authors');
        if (workWithUser.authors) {

          for (let userCount = 0; userCount < workWithUser.authors.length; userCount++) {
            await posterCtrl.subscribePoster(element._id, workWithUser.authors[userCount].userId, workWithUser.authors[userCount].email);
          }
        }
      }
    }
  }
  return 'feito';
}