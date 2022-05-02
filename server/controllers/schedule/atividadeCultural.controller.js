const AtividadeCultural = require('../../models/schedule/atividadeCultural.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule
}

async function listSchedule(date) {
  return await AtividadeCultural.find({
      date: date
    })
    .sort({
      startTime: 1
    });
}

async function insertSchedule(schedule) {
  return await new AtividadeCultural(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await AtividadeCultural.findOneAndUpdate({ _id: id }, schedule);
}

async function deleteSchedule(id) {
  return await AtividadeCultural.findOneAndRemove({
    _id: id
  });

}
