const Work = require("../models/work.model");

module.exports = {
  insertReviews,
  getWorks,
  insertReviewerReview,
  pedirRecurso,
  negarRecurso,
  aceitarRecurso,
  /*pedirRecursoAdmin,
  negarRecursoAdmin,
  aceitarRecursoAdmin,*/
};

/*async function pedirRecursoAdmin(workId, justificativa) {
  return await Work.findOneAndUpdate(
    {
      _id: workId,
    },
    {
      $set: {
        recursoAdmin: {
          justify: justificativa,
        },
      },
    },
    {
      new: true,
    }
  );
}

async function negarRecursoAdmin(workId, reply) {
  return await Work.findOneAndUpdate(
    {
      _id: workId,
    },
    {
      $set: {
        "recursoAdmin.icAllow": "Nao",
        "reviewAdmin.review.icAllow": "Nao",
        "recursoAdmin.reply": reply,
      },
    },
    {
      new: true,
    }
  );
}

async function aceitarRecursoAdmin(workId, reply) {
  return await Work.findOneAndUpdate(
    {
      _id: workId,
    },
    {
      $set: {
        "recursoAdmin.icAllow": "Sim",
        "reviewAdmin.review.icAllow": "Sim",
        "recursoAdmin.reply": reply,
      },
    },
    {
      new: true,
    }
  );
}*/

async function pedirRecurso(workId, justificativa) {
  return await Work.findOneAndUpdate(
    {
      _id: workId,
    },
    {
      $set: {
        recurso: {
          justify: justificativa,
        },
      },
    },
    {
      new: true,
    }
  );
}

async function negarRecurso(workId, reply) {
  return await Work.findOneAndUpdate(
    {
      _id: workId,
    },
    {
      $set: {
        "recurso.icAllow": "Nao",
        "recurso.reply": reply,
      },
    },
    {
      new: true,
    }
  );
}

async function aceitarRecurso(workId, reply) {
  return await Work.findOneAndUpdate(
    {
      _id: workId,
    },
    {
      $set: {
        "recurso.icAllow": "Sim",
        "recurso.reply": reply,
      },
    },
    {
      new: true,
    }
  );
}

async function insertReviews(reviews, user) {
  let review = {
    userId: user._id,
    userEmail: user.email,
    review: reviews,
  };

  /*  return await Work.findOneAndUpdate(
      {
        _id: reviews.workId,
      },
      {
        $set: {
          reviewAdmin: review,
        },
      },
      {
        new: true,
      }
    );*/
}

async function insertReviewerReview(reviews, user) {
  let review = {
    userId: user._id,
    userEmail: user.email,
    review: reviews,
  };

  if (user.reviewer.icCoordinator) {
    review.isReviewOfCoordinator = true;
  }

  return await Work.findOneAndUpdate(
    {
      _id: reviews.workId,
    },
    {
      $set: {
        reviewReviewer: review,
      },
    },
    {
      new: true,
    }
  );
}

async function getWorks(user) {
  return await Work.find({
    "reviewers.userId": user._id,
  });
}
