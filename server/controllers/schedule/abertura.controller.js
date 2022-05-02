const Abertura = require('../../models/schedule/abertura.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule
}

async function listSchedule(date) {

  return await Abertura.find({
    date: date
  })
    .sort({
      startTime: 1
    });
}

async function insertSchedule(schedule) {
  return await new Abertura(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await Abertura.findOneAndUpdate({ _id: id }, schedule);
}

async function deleteSchedule(id) {
  return await Abertura.findOneAndRemove({
    _id: id
  });

}
