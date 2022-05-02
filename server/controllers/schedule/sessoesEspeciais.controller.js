const SessoesEspeciais = require('../../models/schedule/sessoesEspeciais.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule
}

async function listSchedule(date) {
  return await SessoesEspeciais.find({
      date: date
    })
    .sort({
      startTime: 1
    });
}

async function insertSchedule(schedule) {
  return await new SessoesEspeciais(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await SessoesEspeciais.findOneAndUpdate({ _id: id }, schedule);
}

async function deleteSchedule(id) {
  return await SessoesEspeciais.findOneAndRemove({
    _id: id
  });

}
