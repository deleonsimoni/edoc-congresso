const Conferencista = require('../models/conferencista.model');
const S3Uploader = require('./aws.controller');
const config = require('../config/config');

module.exports = {
  getConferencistas,
  insertConferencista,
  deleteConferencista
}

async function getConferencistas() {
  return await Conferencista.find()
    .sort({ fullname: 1 });
}

async function insertConferencista(req) {

  let conferencista = JSON.parse(req.body.formulario);
  let retorno = { temErro: true };

  let fileName = config.PATH_S3_DEV ? config.PATH_S3_DEV + 'xxiendiperio2022/conferencista/' + req.files.fileArray.name : 'xxiendiperio2022/conferencista/' + req.files.fileArray.name;
  await S3Uploader.uploadFile(fileName, req.files.fileArray.data).then(fileData => {
    console.log('Arquivo submetido para AWS ' + fileName);
    conferencista.imagePathS3 = fileName;
    retorno.temErro = false;
    return new Conferencista(conferencista).save();
  }, err => {
    console.log('Erro ao enviar imagem para AWS: ' + fileName);
    retorno.temErro = true;
    retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
  });

  return await retorno;

}

async function deleteConferencista(id) {
  return await Conferencista.findOneAndRemove({ _id: id });
}