const mongoose = require("mongoose");

const WorkSchema = new mongoose.Schema(
  {
    protocol: {
      type: Number,
    },
    title: {
      type: String,
    },
    modalityId: {
      type: Number,
    },
    axisId: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    pathS3DOC: {
      type: String,
    },
    pathS3PDF: {
      type: String,
    },
    mainAuthor: {
      type: String,
    },
    reviewers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        userEmail: {
          type: String,
        },
        review: {
          icAllow: String,
          question1: String,
          question2: String,
          question3: String,
          question4: String,
          question5: String,
          question6: String,
          question7: String,
          question8: String,
          question9: String,
          description: String,
        },
      },
    ],
    /*reviewAdmin: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      userEmail: {
        type: String,
      },
      review: {
        icAllow: String,
        question1: String,
        question2: String,
        question3: String,
        question4: String,
      },
    },*/
    reviewReviewer: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      userEmail: {
        type: String,
      },

      isReviewOfCoordinator: {
        type: Boolean,
      },

      review: {
        icAllow: String,
        question1: String,
        question2: String,
        question3: String,
        question4: String,
        question5: String,
        question6: String,
        question7: String,
        question8: String,
        question9: String,
        justify: String,
      },
    },
    /*  recursoAdmin: {
        justify: String,
        reply: String,
        icAllow: String,
      },*/
    recurso: {
      justify: String,
      reply: String,
      icAllow: String,
    },
    authors: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        userEmail: {
          type: String,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Work", WorkSchema);
