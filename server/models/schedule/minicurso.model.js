const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({


  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  work: {
    type: mongoose.Schema.Types.ObjectId
  },
  workTitle: {
    type: String,
  },
  workAuthor: [{
    fullname: String
  }],

  dates: [{

    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    date: {
      type: String
    },
    linkZoom: {
      type: String
    },
    linkYoutube: {
      type: String
    },
    linkAudio: {
      type: String
    },
    linkLibras: {
      type: String
    }

  }],

  monitor: {
    type: String
  },

  place: {
    type: String,
  },

  address: {
    type: String,
  },

  axis: {
    type: String
  },

  qtdSubscribers: {
    type: String,
  },

  subscribers: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
    userEmail: {
      type: String
    },
  }],

  authors: {
    type: String
  },

  resumePropose: {
    type: String
  },


  createAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Minicurso', ScheduleSchema);
