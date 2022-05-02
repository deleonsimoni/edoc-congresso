const express = require("express");
const passport = require("passport");
const reviewCtrl = require("../controllers/reviews.controller");
const asyncHandler = require("express-async-handler");

const router = express.Router();
module.exports = router;

/*router.post(
  "/admin",
  passport.authenticate("jwt", {
    session: false,
  }),
  asyncHandler(insertAdminReview)
);*/

router.post(
  "/pedirRecurso/:workId",
  passport.authenticate("jwt", {
    session: false,
  }),
  asyncHandler(pedirRecurso)
);

router.post(
  "/negarRecurso/:workId",
  passport.authenticate("jwt", {
    session: false,
  }),
  asyncHandler(negarRecurso)
);

router.post(
  "/aceitarRecurso/:workId",
  passport.authenticate("jwt", {
    session: false,
  }),
  asyncHandler(aceitarRecurso)
);

/*router.post(
  "/pedirRecursoAdmin/:workId",
  passport.authenticate("jwt", {
    session: false,
  }),
  asyncHandler(pedirRecursoAdmin)
);

router.post(
  "/negarRecursoAdmin/:workId",
  passport.authenticate("jwt", {
    session: false,
  }),
  asyncHandler(negarRecursoAdmin)
);

router.post(
  "/aceitarRecursoAdmin/:workId",
  passport.authenticate("jwt", {
    session: false,
  }),
  asyncHandler(aceitarRecursoAdmin)
);*/

router.post(
  "/reviewer",
  passport.authenticate("jwt", {
    session: false,
  }),
  asyncHandler(insertReviewerReview)
);

router.get(
  "/getWorks",
  passport.authenticate("jwt", {
    session: false,
  }),
  asyncHandler(getWorks)
);

async function pedirRecurso(req, res) {
  let reviews = await reviewCtrl.pedirRecurso(
    req.params.workId,
    req.body.justificativaRecurso
  );
  res.json(reviews);
}

async function negarRecurso(req, res) {
  let reviews = await reviewCtrl.negarRecurso(
    req.params.workId,
    req.body.reply
  );
  res.json(reviews);
}

async function aceitarRecurso(req, res) {
  let reviews = await reviewCtrl.aceitarRecurso(
    req.params.workId,
    req.body.reply
  );
  res.json(reviews);
}

/*async function pedirRecursoAdmin(req, res) {
  let reviews = await reviewCtrl.pedirRecursoAdmin(
    req.params.workId,
    req.body.justificativaRecurso
  );
  res.json(reviews);
}

async function negarRecursoAdmin(req, res) {
  console.log(req.body);

  if (req.user.icAdmin) {
    let reviews = await reviewCtrl.negarRecursoAdmin(
      req.params.workId,
      req.body.reply
    );
    res.json(reviews);
  } else {
    res.sendStatus(401);
  }
}

async function aceitarRecursoAdmin(req, res) {
  console.log(req.body);
  if (req.user.icAdmin) {
    let reviews = await reviewCtrl.aceitarRecursoAdmin(
      req.params.workId,
      req.body.reply
    );
    res.json(reviews);
  } else {
    res.sendStatus(401);
  }
}

async function insertAdminReview(req, res) {
  if (req.user.icAdmin) {
    let reviews = await reviewCtrl.insertReviews(req.body, req.user);
    res.json(reviews);
  } else {
    res.sendStatus(401);
  }
}*/

async function insertReviewerReview(req, res) {
  if (req.user.reviewer) {
    let reviews = await reviewCtrl.insertReviewerReview(req.body, req.user);
    res.json(reviews);
  } else {
    res.sendStatus(401);
  }
}

async function getWorks(req, res) {
  if (req.user.reviewer) {
    let works = await reviewCtrl.getWorks(req.user);
    res.json(works);
  } else {
    res.sendStatus(401);
  }
}
