const express = require("express");
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const userCtrl = require("../controllers/user.controller");
const adminCtrl = require("../controllers/admin.controller");
const emailSender = require("../controllers/email.controller");
const templateEmail = require("../config/templateEmails");
const fileUpload = require("express-fileupload");

const router = express.Router();
module.exports = router;

router.use(
  passport.authenticate("jwt", {
    session: false,
  })
);

router.get(
  "/usrs?:page",
  passport.authenticate("jwt", {
    session: false,
  }),
  getUsers
);

router.get(
  "/worksPaginated",
  passport.authenticate("jwt", {
    session: false,
  }),
  getWorksPaginated
);

router.get(
  "/getUserWorks/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  asyncHandler(getUserWorks)
);
router.get(
  "/works/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  getWorks
);
router.get(
  "/worksValids/:id/:modality",
  passport.authenticate("jwt", {
    session: false,
  }),
  getWorksValids
);

router.get(
  "/metrics",
  passport.authenticate("jwt", {
    session: false,
  }),
  getMetrics
);
router.get(
  "/generateReport",
  passport.authenticate("jwt", {
    session: false,
  }),
  generateReport
);

router.post(
  "/validatePayment/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  validatePayment
);
router.post(
  "/invalidatePayment/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  invalidatePayment
);
router.post(
  "/validateDoc/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  validateDoc
);
router.post(
  "/invalidateDoc/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  invalidateDoc
);
router.post(
  "/rainbown/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  deleteByEmail
);
router.post(
  "/editUser",
  passport.authenticate("jwt", {
    session: false,
  }),
  editUser
);
router.post(
  "/editUser",
  passport.authenticate("jwt", {
    session: false,
  }),
  editUser
);
router.post(
  "/insertAuthorWork",
  passport.authenticate("jwt", {
    session: false,
  }),
  asyncHandler(insertAuthorWork)
);
router.post(
  "/alterUserWorkFile/xxiendiperio2022/:idWork",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    fileUpload(),
  ],
  asyncHandler(alterUserWorkFile)
);
router.post(
  "/uploadWork/xxiendiperio2022/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    fileUpload(),
  ],
  asyncHandler(uploadWork)
);

router.post(
  "/sendEmail",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    fileUpload(),
  ],
  asyncHandler(sendEmail)
);


router.delete(
  "/removeWork/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  asyncHandler(removeWork)
);

router.delete(
  "/removeAuthor/:authorId/:workId",
  passport.authenticate("jwt", {
    session: false,
  }),
  asyncHandler(removeAuthor)
);

async function getUsers(req, res) {
  const user = req.user;
  if (user.icAdmin || user.coordinator || user.reviewer) {
    let users = await adminCtrl.getUsers(req);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function getWorksPaginated(req, res) {
  const user = req.user;
  if (user.icAdmin || user.coordinator || user.reviewer) {
    let users = await adminCtrl.getWorksPaginated(req);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function generateReport(req, res) {
  const user = req.user;
  if (user.icAdmin) {
    let users = await adminCtrl.generateReport(req);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function alterUserWorkFile(req, res) {
  if (req.user.icAdmin) {
    let response = await adminCtrl.alterUserWorkFile(req);
    res.json(response);
  } else {
    res.sendStatus(401);
  }
}

async function deleteByEmail(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.deleteByEmail(req.params.id);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function uploadWork(req, res) {
  if (req.user.icAdmin) {
    let response = await adminCtrl.submitWork(req);

    if (!response) {
      console.log("Notificando email submissao");
      let formulario = JSON.parse(req.body.formulario);
      for (let i = 0; i < formulario.authors.length; i++) {
        if (!formulario.authors[i].email) {
          continue;
        } else {
          emailSender.sendMail(
            formulario.authors[i].email,
            "Trabalho Submetido com Sucesso",
            templateEmail.trabalhoSubmetido
          );
        }
      }
    }

    res.json(response);
  } else {
    res.sendStatus(401);
  }
}

async function sendEmail(req, res) {
  if (req.user.icAdmin) {
    let response = await adminCtrl.sendEmail(req);
    res.json(response);
  } else {
    res.sendStatus(401);
  }
}

async function getUsers(req, res) {
  const user = req.user;
  if (user.icAdmin || user.coordinator || user.reviewer) {
    let users = await adminCtrl.getUsers(req);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function editUser(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.editUser(req.body);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function getUserWorks(req, res) {
  const user = req.user;
  if (user.icAdmin || user.coordinator || user.reviewer) {
    let users = await adminCtrl.getUserWorks(req.params.id);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function getWorks(req, res) {
  const user = req.user;
  if (user.icAdmin) {
    const works = await adminCtrl.getWorks(req.params.id);
    res.json(works);
  }
  if (user.reviewer && user.reviewer.icCoordinator) {
    const works = await adminCtrl.getWorksCoordinator(req.params.id);
    res.json(works);
  } else {
    res.sendStatus(401);
  }
}

async function getWorksValids(req, res) {
  const user = req.user;
  if (user.icAdmin) {
    const works = await adminCtrl.getWorksValids(req.params.id, req.params.modality);
    res.json(works);
  } else if (user.reviewer && user.reviewer.icCoordinator) {
    const works = await adminCtrl.getWorksCoordinator(req.params.id);
    res.json(works);
  } else {
    res.sendStatus(401);
  }
}

async function validatePayment(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.validatePayment(req.params.id);
    emailSender.sendMail(users.email, "Pagamento Homologado", templateEmail.pagamentoHomologado);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function invalidatePayment(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.invalidatePayment(req.params.id);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function getMetrics(req, res) {
  let metrics = await adminCtrl.recoverMetrics();
  res.json(metrics);
}

async function validateDoc(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.validateDoc(req.params.id);
    emailSender.sendMail(users.email, "Documento Aprovado", templateEmail.documentoValido);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function invalidateDoc(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.invalidateDoc(req.params.id);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function removeWork(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.removeWork(req);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function removeAuthor(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.removeAuthor(req);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function insertAuthorWork(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.insertAuthorWork(req);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}
