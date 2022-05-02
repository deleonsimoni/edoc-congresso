const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({


  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  titles: [],

  books: [{
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    resume: {
      type: String,
    },
    linkSale: {
      type: String,
    },
    nameMiniature: {
      type: String,
    }

  }],
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  place: {
    type: String,
  },
  address: {
    type: String,
  },
  theme: {
    type: String,
  },
  virtual: {
    linkZoom: {
      type: String
    },
    linkAudio: {
      type: String
    },
    linkLibras: {
      type: String
    }
  },
  date: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('LancamentoDeLivros', ScheduleSchema);
