const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({


  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  coordinators: [{
    name: String,
    isCoordinator: {
      type: Boolean,
      default: false
    }
  }],
  startTime: {
    type: String,
  },
  classification: {
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
  themeSpeeches: {
    type: String,
  },
  theme: {
    type: Number,
  },
  date: {
    type: String
  },
  virtual: {
    linkYoutube: {
      type: String
    },
    linkAudio: {
      type: String
    },
    linkLibras: {
      type: String
    }
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Simposio', ScheduleSchema);
