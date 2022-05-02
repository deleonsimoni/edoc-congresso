const Poster = require('../../models/schedule/poster.model');
const User = require('../../models/user.model');
const Work = require('../../models/work.model');
const ChatWork = require('../../models/virtual/chatWork.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule,
  subscribePoster,
  unsubscribePoster,

}

async function listSchedule(date) {
  return await Poster.find({
      'dates.date': { $in: date }
    })
    .sort({
      'dates.startTime': 1
    });
}

async function insertSchedule(schedule, oldId) {

  schedule = await setAuthorsInPoster(schedule);

  const poster = await new Poster(schedule).save();

  await ChatWork.findOneAndUpdate({
    idWork: oldId
  }, {
    $set: {
      idWork: poster._id
    }
  });

  if(poster.monitor){
    let monitors = poster.monitor.trim().split(';');
    monitors.forEach(element => {
      registerMonitor(poster._id, element.toLowerCase());
    });
  }

  if(poster.mediator){
    registerMediator(poster._id, poster.mediator.toLowerCase());
  }

  let workWithUser;

  if(poster.worksPoster){
    for (let index = 0; index < poster.worksPoster.length; index++) {
      workWithUser = await Work.findById({_id: poster.worksPoster[index].work}).select('authors');
      if(workWithUser.authors){

        for (let userCount = 0; userCount < workWithUser.authors.length; userCount++) {
          await subscribePoster(poster._id, workWithUser.authors[userCount].userId, workWithUser.authors[userCount].email);
        }
      }
    }
  }

  return poster;
}

async function updateSchedule(id, schedule) {

  let oldId = await deleteSchedule(id);
  delete schedule._id;
  return await insertSchedule(schedule, oldId);


}

async function deleteSchedule(id) {

  const poster = await Poster.findById({_id: id});
  let workWithUser;

  if(poster.monitor){
    let monitors = poster.monitor.trim().split(';');
    monitors.forEach(element => {
      unRegisterMonitor(id, element.toLowerCase());
    });
  }

  if(poster.mediator){
    unRegisterMediator(id, poster.mediator.toLowerCase());
  }


  if(poster.worksPoster){
    for (let index = 0; index < poster.worksPoster.length; index++) {
      workWithUser = await Work.findById({_id: poster.worksPoster[index].work}).select('authors');
      if(workWithUser.authors){

        for (let userCount = 0; userCount < workWithUser.authors.length; userCount++) {
          await unsubscribePoster(poster._id, workWithUser.authors[userCount].userId);
        }
      }
    }
  }

  await Poster.findOneAndRemove({ _id: id });
  return await poster._id;

}



async function setAuthorsInPoster(posters) {
  
  let workWithUser;
  let namesAuthors = [];

    if(posters.worksPoster){
      for (let index = 0; index < posters.worksPoster.length; index++) {
        if(!posters.worksPoster[index].workTitle) continue;
        namesAuthors = [];
        workWithUser = await Work.findById({_id: posters.worksPoster[index].work}).select('authors');
        if(workWithUser.authors){
          
          for (let autores = 0; autores < workWithUser.authors.length; autores++) {
            const autoresTrabalho = workWithUser.authors[autores];
            namesAuthors.push(await User.findById(autoresTrabalho.userId).select('-_id fullname'))
          }

          posters.worksPoster[index].workAuthor = namesAuthors

        }
      }
    }

  return await posters;
}


async function unsubscribePoster(workId, userId) {

  await User.findOneAndUpdate({
    _id: userId
  }, {
    $pull: {
      cursosInscritos:{
        'idSchedule': workId
      }
      
    }
  }, function (err, doc) {
    if (err) {
      console.log("Erro ao remover inscricao do trabalho ", err);
    } else {
      console.log("Sucesso ao remover inscricao do trabalho: ", err);
    }
  });

  return await Poster.findOneAndUpdate({
    _id: workId
  }, {
    $pull: {
      subscribers: {
        userId: userId
      }
    }
  }, {
    new: true
  });
}

async function subscribePoster(workId, userId, email) {
  let userInsert = {
    userId: userId,
    userEmail: email
  }

  await User.findOneAndUpdate({
    _id: userId
  }, {
    $addToSet: {
      cursosInscritos: {
        idSchedule: workId,
        icModalityId: 3
      }
    }
  }, (err, doc) => {
    if (err) {
      console.log("Erro ao atualizar o usuario subscribeMinicurso -> " + err);
    }
  });


  return await Poster.findOneAndUpdate({
    _id: workId
  }, {
    $addToSet: {
      'subscribers': userInsert
    }
  }, {
    new: true
  });
}

async function registerMonitor(workId, email) {
  await User.findOneAndUpdate({
    email: email
  }, {
    $addToSet: {
      monitor: {
        idSchedule: workId,
        icModalityId: 3
      }
    }
  }, (err, doc) => {
    if (err) {
      console.log("erro ao registrar monitor -> " + err);
    }
  });
}


async function unRegisterMonitor(workId, email) {
  await User.findOneAndUpdate({
    email: email
  }, {
    $pull: {
      monitor:{
        'idSchedule': workId
      }
      
    }
  }, function (err, doc) {
    if (err) {
      console.log("Erro ao remover monitor", err);
    } else {
      console.log("Sucesso ao remover monitor ", err);
    }
  });
}


async function registerMediator(workId, email) {
  await User.findOneAndUpdate({
    email: email
  }, {
    $addToSet: {
      mediador: {
        idSchedule: workId,
        icModalityId: 3
      }
    }
  }, (err, doc) => {
    if (err) {
      console.log("erro ao registrar mediador -> " + err);
    }
  });
}


async function unRegisterMediator(workId, email) {
  await User.findOneAndUpdate({
    email: email
  }, {
    $pull: {
      mediador:{
        'idSchedule': workId
      }
      
    }
  }, function (err, doc) {
    if (err) {
      console.log("Erro ao remover monitor", err);
    } else {
      console.log("Sucesso ao remover monitor ", err);
    }
  });
}
