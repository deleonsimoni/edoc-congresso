const RodaReunioesEnidadesRedes = require('../../models/schedule/rodaReunioesEnidadesRedes.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule
}

async function listSchedule(date) {
  return await RodaReunioesEnidadesRedes.find({
      date: date
    })
    .sort({
      startTime: 1
    });
}

async function insertSchedule(schedule) {
  return await new RodaReunioesEnidadesRedes(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await RodaReunioesEnidadesRedes.findOneAndUpdate({ _id: id }, schedule);
}

async function deleteSchedule(id) {
  return await RodaReunioesEnidadesRedes.findOneAndRemove({
    _id: id
  });

}
