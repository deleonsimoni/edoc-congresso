const LancamentoDeLivros = require('../../models/schedule/lancamentoDeLivros.model');
const S3Uploader = require('../aws.controller');
const config = require('../../config/config');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule
}

async function listSchedule(date) {
  var livro = await LancamentoDeLivros.find({
    date: date
  })

    .sort({
      startTime: 1
    });
  /*
    for (let i = 0; i < livro.length; i++) {  
      for (let j = 0; j < livro[i].books.length; j++) {
        if(livro[i].books[j].nameMiniature){
          retornoAws = await S3Uploader.downloadFile(config.PATH_S3_DEV ? config.PATH_S3_DEV + 'xxiendiperio2022/books/' + livro[i].books[j].nameMiniature : 'xxiendiperio2022/books/' + livro[i].books[j].nameMiniature);         
          livro[i].books[j].miniature = retornoAws.data.Body || '';
        }
      }
    }
  */
  return await livro;
}

async function insertSchedule(schedule) {

  let responseUpload = await uploadBooks(schedule.books);

  if (responseUpload.temErro) {
    console.log('erro no upload de arquivos: ' + JSON.stringify(responseUpload));
    return responseUpload;
  } else {
    console.log('subi todos os arquivos: ' + JSON.stringify(responseUpload));
    return await new LancamentoDeLivros(schedule).save();
  }
}

async function updateSchedule(id, schedule) {

  console.log('upload book');
  let responseUpload = await uploadBooks(schedule.books);

  if (responseUpload.temErro) {
    console.log('erro no upload de arquivos: ' + JSON.stringify(responseUpload));
    return responseUpload;
  } else {
    console.log('subi todos os arquivos: ' + JSON.stringify(responseUpload));
    return await LancamentoDeLivros.findOneAndUpdate({ _id: id }, schedule);
  }

}

async function deleteSchedule(id) {
  return await LancamentoDeLivros.findOneAndRemove({
    _id: id
  });
}

async function uploadBooks(books) {
  let retorno = {
    temErro: false,
    mensagem: '',
    filesS3: []
  }
  let fileName;

  for (let i = 0; i < books.length; i++) {

    if (books[i].isChangeImage) {

      fileName = 'books/' + books[i].nameMiniature;

      let buf = Buffer.from(books[i].miniature.replace(/^data:image\/\w+;base64,/, ""), 'base64')

      await S3Uploader.uploadBase64(fileName, buf).then(fileData => {
        console.log('Livro submetido para AWS ' + fileName);
        retorno.filesS3.push(fileName);
      }, err => {
        console.log('Erro ao enviar o livro  para AWS: ' + fileName);
        retorno.temErro = true;
        retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
      });

    }

  }

  return retorno;

}