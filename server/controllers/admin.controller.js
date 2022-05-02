const bcrypt = require("bcrypt");
//const Joi = require('joi');
const User = require("../models/user.model");
const Work = require("../models/work.model");
const userCtrl = require("../controllers/user.controller");

const Prices = require("../config/prices");
const IncomingForm = require("formidable").IncomingForm;
const fs = require("fs");
const S3Uploader = require("./aws.controller");

const emailSender = require("./email.controller");
const EMAILS_GROUP_1 = require('../utils/emailsGroup1');
const EMAILS_GROUP_2 = require('../utils/emailsGroup2');
const EMAILS_GROUP_3 = require('../utils/emailsGroup3');


const paginate = require("jw-paginate");

module.exports = {
  getUsers,
  validatePayment,
  invalidatePayment,
  validateDoc,
  invalidateDoc,
  deleteByEmail,
  getUserWorks,
  getWorks,
  editUser,
  removeWork,
  removeAuthor,
  insertAuthorWork,
  getWorksCoordinator,
  alterUserWorkFile,
  submitWork,
  generateReport,
  getWorksValids,
  getWorksPaginated,
  sendEmail,

};

async function getUsers(req) {
  const pageSize = 10;
  const page = req.query.page || 1;
  let usersFound = [];
  let search = JSON.parse(req.query.search);
  search.icAdmin = false;

  usersFound = await User.find(search)
    .select(
      "fullname socialname comprovanteAWS address email createdAt document phones modalityId payment works institution pcdId categoriaId deficiencyType icForeign reviewer"
    )
    .sort({
      fullname: 1,
    })
    .skip(pageSize * page - pageSize)
    .limit(pageSize);

  numbOfUsers = await User.count(search);

  const pager = paginate(numbOfUsers, page, pageSize);

  return {
    usersFound,
    pager,
  };
}

async function getWorksPaginated(req) {
  const pageSize = 5;
  const page = req.query.page || 1;
  let worksFound = [];
  let search = {};

  if (req.query.axis != "undefined") search.axisId = req.query.axis;

  if (req.query.nameWork != "" && req.query.nameWork != "undefined") {
    search.title = { $regex: ".*" + req.query.nameWork + ".*" };
  } else {
    if (req.query.modality != "undefined" && req.query.modality != 0) search.modalityId = req.query.modality;

    if (req.query.situation != "undefined" && req.query.situation != 0) {
      switch (Number(req.query.situation)) {
        case 1:
          search.reviewAdmin = { $eq: null };
          break;
        case 2:
          search["reviewAdmin.review.icAllow"] = "Nao";
          break;
        case 3:
          search["reviewAdmin.review.icAllow"] = "Sim";
          break;
        case 4:
          search.reviewReviewer = { $eq: null };
          break;
        case 5:
          search["reviewReviewer.review.icAllow"] = "Nao";

          break;
        case 6:
          search["reviewReviewer.review.icAllow"] = "Sim";
          break;
        case 7:
          search["recursoAdmin.justify"] = { $ne: null };
          search["recursoAdmin.icAllow"] = { $eq: null };
          break;
        case 8:
          search["recursoAdmin.icAllow"] = "Sim";
          break;
        case 9:
          search["recursoAdmin.icAllow"] = "Nao";
          break;
        case 10:
          search["recurso.justify"] = { $ne: null };
          search["recurso.icAllow"] = { $eq: null };
          break;
        case 11:
          search["recurso.icAllow"] = "Sim";
          break;
        case 12:
          search["recurso.icAllow"] = "Nao";
          break;
        /*   case 13:
             search["$or"] = [
               {
                 "reviewAdmin.review.icAllow": "Sim",
                 "reviewReviewer.review.icAllow": "Sim"
               },
               {
                 "recurso.icAllow": "Sim"
               },
               {
                 "recursoAdmin.icAllow": "Sim"
               },
               {
                 "reviewAdmin.review.icAllow": "Sim",
                 "reviewReviewer.review.icAllow": null
               }
             ];*/

        case 13:
          search["$or"] = [
            {
              "reviewReviewer.review.icAllow": "Sim"
            },
            {
              "recurso.icAllow": "Sim"
            },

          ];
          break;

      }
    }
  }

  worksFound = await Work.find(search)
    .sort({
      title: 1,
    })
    .skip(pageSize * page - pageSize)
    .limit(pageSize);

  numbOfUsers = await Work.count(search);

  const pager = paginate(numbOfUsers, page, pageSize);

  return {
    worksFound,
    pager,
  };
}

async function generateReport() {
  return await User.find({
    "payment.icPaid": true,
  })
    .select("fullname email document payment.categoryId icForeign")
    .sort({
      fullname: 1,
    });
}

async function editUser(user) {
  return await User.findOneAndUpdate(
    {
      _id: user._id,
    },
    user,
    {
      upsert: true,
    }
  );
}

async function deleteByEmail(emailDelete) {
  return await User.findOneAndRemove(
    {
      email: emailDelete,
    },
    function (err, doc) {
      if (err) {
        console.log("erro ao deletar o usuario: " + emailDelete, err);
      } else {
        console.log("Usuário deletado com sucesso: " + emailDelete);
      }
    }
  );
}

async function getUserWorks(workId) {
  return await Work.findOne(
    {
      _id: workId,
    },
    function (err, doc) {
      if (err) {
        console.log("erro ao buscar trabalho: " + workId, err);
      } else {
        console.log("arquivo recuperado com sucesso: " + workId);
      }
    }
  );
}

async function submitWork(req) {
  let formulario = JSON.parse(req.body.formulario);
  console.log("Validando Usuarios" + JSON.stringify(formulario.authors));

  let responseValidacao = await userCtrl.validatePaymentUsers(formulario.authors, formulario.modalityId);
  if (responseValidacao.temErro) {
    console.log("erro na validacao dos usuarios: " + JSON.stringify(responseValidacao));
    return responseValidacao;
  }
  console.log("validei todos com sucesso: " + JSON.stringify(responseValidacao));

  console.log("upload works");
  let responseUpload = await userCtrl.uploadWorks(req.files.fileArray);
  if (responseUpload.temErro) {
    console.log("erro no upload de arquivos: " + JSON.stringify(responseUpload));
    return responseUpload;
  }
  console.log("subi todos os arquivos: " + JSON.stringify(responseUpload));

  console.log("atualizando  banco");
  let workId = await userCtrl.createWork(responseValidacao.user, responseUpload.filesS3, formulario);
  console.log("IDWORKJK " + workId);
  return await userCtrl.updateUsers(responseValidacao.user, workId);
}


async function alterUserWorkFile(req) {
  console.log("upload works");
  let filesArray = [];
  if (req.files.fileArray.length == 2) {
    filesArray = req.files.fileArray;
  } else {
    filesArray.push(req.files.fileArray);
  }

  let responseUpload = await userCtrl.uploadWorks(filesArray);
  if (responseUpload.temErro) {
    console.log("erro no upload de arquivos: " + JSON.stringify(responseUpload));
    return responseUpload;
  }
  console.log("subi todos os arquivos: " + JSON.stringify(responseUpload));

  console.log("atualizando  banco");

  if (filesArray.length == 2) {
    return await Work.findOneAndUpdate(
      {
        _id: req.params.idWork,
      },
      {
        $set: {
          pathS3DOC: responseUpload.filesS3[0],
          pathS3PDF: responseUpload.filesS3[1],
        },
      }
    );
  } else if (responseUpload.filesS3[0].includes(".pdf")) {
    return await Work.findOneAndUpdate(
      {
        _id: req.params.idWork,
      },
      {
        $set: {
          pathS3DOC: responseUpload.filesS3[0],
        },
      }
    );
  } else {
    return await Work.findOneAndUpdate(
      {
        _id: req.params.idWork,
      },
      {
        $set: {
          pathS3PDF: responseUpload.filesS3[0],
        },
      }
    );
  }
}

async function validatePayment(id) {
  return await User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        "payment.icPaid": true,
      },
    },
    function (err, doc) {
      if (err) {
        console.log("erro ao atualizar o usuario: ", err);
      } else {
        console.log("update document success");
      }
    }
  );
}

async function invalidatePayment(id) {
  return await User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        "payment.icPaid": false,
      },
    },
    function (err, doc) {
      if (err) {
        console.log("erro ao atualizar o usuario: ", err);
      } else {
        console.log("update document success");
      }
    }
  );
}

async function getWorks(axis) {
  return await Work.find({
    axisId: axis,
  });
}

async function getWorksValids(axis, modality) {
  return await Work.find({
    axisId: axis,
    modalityId: modality,
    $or: [
      {

        "reviewReviewer.review.icAllow": "Sim",
      },
      {
        "recurso.icAllow": "Sim",
      },

    ],
  })
    .select("_id title")
    .sort({
      title: 1,
    });
}

async function getWorksCoordinator(axis) {
  return await Work.find({
    axisId: axis,
    /*"reviewAdmin.review.icAllow": "Sim",*/
  });
}

async function validateDoc(id) {
  return await User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        "payment.icValid": true,
      },
    },
    function (err, doc) {
      if (err) {
        console.log("erro ao atualizar o usuario: ", err);
      } else {
        console.log("update document success");
      }
    }
  );
}

async function invalidateDoc(id) {
  return await User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        "payment.icValid": false,
      },
    },
    function (err, doc) {
      if (err) {
        console.log("erro ao atualizar o usuario: ", err);
      } else {
        console.log("update document success");
      }
    }
  );
}

async function removeWork(req) {
  return await Work.findByIdAndRemove(
    {
      _id: req.params.id,
    },
    function (err, doc) {
      if (err) {
        console.log("erro ao remover trabalho: ", err);
      } else {
        for (let author of doc.authors) {
          User.findOneAndUpdate(
            {
              _id: author.userId,
            },
            {
              $pull: {
                works: req.params.id,
              },
            },
            function (err, doc) {
              if (err) {
                console.log("Erro ao remover trabalho do usuario ", err);
              } else {
                console.log("Sucesso ao remover o trabalho: ", err);
              }
            }
          );
        }
      }
    }
  );
}

async function removeAuthor(req) {
  return await User.findOneAndUpdate(
    {
      _id: req.params.authorId,
    },
    {
      $pull: {
        works: req.params.workId,
      },
    },
    function (err, doc) {
      if (err) {
        console.log("Erro ao capturar usuario para excluir trabalho: ", err);
      } else {
        Work.findOneAndUpdate(
          {
            _id: req.params.workId,
          },
          {
            $pull: {
              authors: {
                userId: req.params.authorId,
              },
            },
          },
          function (err, doc) {
            if (err) {
              console.log("Erro ao excluir o id do usuario no trabalho: ", err);
            } else {
              console.log("Sucesso ao excluoir o participante do trabalho: ", err);
            }
          }
        );
      }
    }
  );
}

async function insertAuthorWork(req) {
  return await User.findOne(
    {
      email: req.body.authorEmail,
    },
    function (err, doc) {
      if (err) {
        console.log("Erro ao capturar usuario para inserir o trabalho: ", err);
      } else {
        doc.works.push(req.body.workId);
        doc
          .save()
          .then((result) => {
            Work.findOneAndUpdate(
              {
                _id: req.body.workId,
              },
              {
                $push: {
                  authors: {
                    userId: result._id,
                    userEmail: result.email.toLowerCase(),
                  },
                },
              },
              function (err, doc) {
                if (err) {
                  console.log("Erro ao incluir o id do usuario no trabalho: ", err);
                } else {
                  console.log("Sucesso ao vincular trablho e participante: ", err);
                }
              }
            );
          })
          .catch((err) => {
            console.log("Erro ao capturar usuario para inserir o trabalho: ", err);
          });
      }
    }
  );
}

async function sendEmail(req) {

  let emailsSend;
  let attachment;

  let formulario = JSON.parse(req.body.formulario);

  console.log(`########## ENVIANDO EMAILS PARA GRUPO ${req.body.formulario.groupId} ##########`);

  switch (Number(formulario.groupId)) {
    case 1:
      emailsSend = EMAILS_GROUP_1.EMAILS_GROUP_1
      break;
    case 2:
      emailsSend = EMAILS_GROUP_2.EMAILS_GROUP_2
      break;
    case 3:
      emailsSend = EMAILS_GROUP_3.EMAILS_GROUP_3
      break;
    case 4:
      emailsSend = CONSTANTS.EMAILS_GROUP_1
      break;
    case 5:
      emailsSend = CONSTANTS.EMAILS_GROUP_1
      break;

  }

  if (req.files) {
    attachment = {};
    attachment.fileName = req.files.fileArray.name;
    attachment.file = req.files.fileArray.data;
  }

  let emailDestinationAux = [];
  let chunk = 12;
  let auxFor = 0;

  const idInterval = setInterval(function () {

    if (auxFor <= emailsSend.length) {

      emailDestinationAux = emailsSend.slice(auxFor, auxFor + chunk);
      if (emailDestinationAux.length) {

        emailSender.sendMailAWS(
          emailDestinationAux,
          formulario.title,
          formulario.description,
          attachment
        );

      }

    } else {
      console.log(`########## FIM DO ENVIO DE EMAILS PARA O GRUPO ${formulario.groupId} ##########`);
      clearInterval(idInterval);
    }

    auxFor += chunk;

  }, 1800);



  return true;

}
