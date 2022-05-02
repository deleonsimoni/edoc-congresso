const RodasDeConversa = require('../../models/schedule/rodasDeConversa.model');
const Minicurso = require('../../models/schedule/minicurso.model');
const Painel = require('../../models/schedule/painel.model');
const User = require('../../models/user.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule,
  unsubscribeRodadeConversa,
  subscribeRodadeConversa
}

async function listSchedule(date) {
  return await RodasDeConversa.find({
      'dates.date': { $in: date }
    })
    .sort({
      createAt: 1
    });
}

async function insertSchedule(schedule) {

  let roda = await new RodasDeConversa(schedule).save();

  if(roda.monitor){
    let monitors = roda.monitor.trim().split(';');
    monitors.forEach(element => {
      unRegisterMonitor(roda._id, element.toLowerCase());
    });
  }

  return await roda;
}

async function updateSchedule(id, schedule) {

  let rodaOld = await RodasDeConversa.findById(id);

  if(rodaOld.monitor){
    let monitors = rodaOld.monitor.trim().split(';');
    monitors.forEach(element => {
      unRegisterMonitor(id, element.toLowerCase());
    });
  }

  if(schedule.monitor){
    let monitors = schedule.monitor.trim().split(';');
    monitors.forEach(element => {
      registerMonitor(id, element.toLowerCase());
    });
  }

  return await RodasDeConversa.findOneAndUpdate({ _id: id }, schedule);
}

async function deleteSchedule(id) {

  let rodaOld = await RodasDeConversa.findById(id);

  if(rodaOld.monitor){
    let monitors = rodaOld.monitor.trim().split(';');
    monitors.forEach(element => {
      unRegisterMonitor(id, element.toLowerCase());
    });
  }

  return await RodasDeConversa.findOneAndRemove({
    _id: id
  });


}

async function unsubscribeRodadeConversa(workId, userId) {

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

  return RodasDeConversa.findOneAndUpdate({
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

async function getSchedulesDates(mySchedules) {

  let schedulesDatesCheck = [];
  for (let index = 0; index < mySchedules.cursosInscritos.length; index++) {
    switch (mySchedules.cursosInscritos[index].icModalityId) {
      case 2: //rodaDeConversa
        await schedulesDatesCheck.push(await RodasDeConversa.findById(mySchedules.cursosInscritos[index].idSchedule).select('dates -_id'));
      break;
      case 4: //minicurso
        await schedulesDatesCheck.push(await Minicurso.findById(mySchedules.cursosInscritos[index].idSchedule).select('dates -_id'));
      break;
      case 5: //painel
        await schedulesDatesCheck.push(await Painel.findById(mySchedules.cursosInscritos[index].idSchedule).select('dates -_id'));
      break;
    }
  }

  return await schedulesDatesCheck;

}

async function checkSubscribeDup(workId, userId) {

  let msg = 'Inscrição realizada com sucesso';

  let scheduleCompare = await RodasDeConversa.findById(workId);

  if((scheduleCompare.subscribers.length + 1) > scheduleCompare.qtdSubscribers){
    return {isDup: true, msg: 'Vagas Esgotadas'};
  } else {

    let mySchedules = await User.findById(userId).select('cursosInscritos');

    if(mySchedules.cursosInscritos){

      let schedulesDatesCheck = await getSchedulesDates(mySchedules);
    
      if(schedulesDatesCheck){

        for (let index = 0; index < schedulesDatesCheck.length; index++) {
          for (let k = 0; k < schedulesDatesCheck[index].dates.length; k++) {
            const scheduleDateCheck = schedulesDatesCheck[index].dates[k];

            for (let j = 0; j < scheduleCompare.dates.length; j++) {

              if(scheduleCompare.dates[j].date == scheduleDateCheck.date &&
                scheduleCompare.dates[j].startTime.replace(':', '') >= scheduleDateCheck.startTime.replace(':', '') && 
                scheduleCompare.dates[j].endTime.replace(':', '') <= scheduleDateCheck.endTime.replace(':', '')){
                
                  return {isDup: true, msg: 'Você possui inscrição em uma atividade nesse mesmo dia e horário'};

              }
            }
          }
        }
      }

    } else {

      return {isDup: false, msg: msg};

    }
  }
}

async function subscribeRodadeConversa(workId, userId, email) {

  let checkIsDup = await checkSubscribeDup(workId, userId);

  if(checkIsDup && checkIsDup.isDup){

    return checkIsDup;

  } else {

    let userInsert = {
      userId: userId,
      userEmail: email
    }

    await User.findOneAndUpdate({
      _id: userId
    }, {
      $addToSet: {
        'cursosInscritos': {
          idSchedule: workId,
          icModalityId: 2
        }
      }
    }, {
      upsert: true,
      new: true
    }, (err, doc) => {
      if (err) {
        console.log("Erro ao atualizar o usuario subscribeMinicurso -> " + err);
      }
    });

    return RodasDeConversa.findOneAndUpdate({
      _id: workId
    }, {
      $addToSet: {
        'subscribers': userInsert
      }
    }, {
      new: true
    });

  }
}


async function registerMonitor(workId, email) {
  await User.findOneAndUpdate({
    email: email
  }, {
    $addToSet: {
      monitor: {
        idSchedule: workId,
        icModalityId: 2
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
