const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({


  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  
  axis: {
    type: String
  },

  monitor: {
    type: String
  },

  mediator: {
    type: String
  },
  

  worksPoster: [{
    work: {
      type: mongoose.Schema.Types.ObjectId
    },
    workTitle: {
      type: String,
    },
    workAuthor: [{}],
    linkPPT:{
      type: String,
    }
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
    linkAudio: {
      type: String
    },
    linkLibras: {
      type: String
    }
  }],

  subscribers: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
    userEmail: {
      type: String
    },
  }],

  createAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Poster', ScheduleSchema);
