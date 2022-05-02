const Anais = require('../models/anais.model');
const paginate = require("jw-paginate");
const mongoose = require('mongoose')

module.exports = {
  getAnais,
  insertAnais,
  deleteAnais,
  updateAnais,
  getAnaisVirtual,
  getSumarioVirtual
}

async function getAnais() {
  return await Anais.find()
    .sort({
      createAt: -1
    });
}

async function getAnaisVirtual() {
  return await Anais.find().select('name link image')
    .sort({
      createAt: 1
    });
}

async function getSumarioVirtual(req) {
  const pageSize = 10;
  const page = req.query.page || 1;
  const total = await Anais.aggregate([{$match: {_id: mongoose.Types.ObjectId(req.query.id)}}, {$project: {summary: {$size: '$summary'}}}])

  const begin = ((page - 1) * pageSize);
  const end = begin + pageSize;
  const summaries = await Anais.findOne({_id: req.query.id}, { 'summary': { $slice: [begin, pageSize] } });
  const pager = await paginate(total[0].summary, page, pageSize);

  return {
    summaries,
    pager,
  };
}

async function insertAnais(anais, idUser) {
  anais.user = idUser;
  return await new Anais(anais).save();
}

async function updateAnais(anais, idUser) {
  anais.user = idUser;
  return await Anais.findOneAndUpdate({ _id: anais._id }, anais);
}

async function deleteAnais(id) {
  return await Anais.findOneAndRemove({
    _id: id
  });
}
