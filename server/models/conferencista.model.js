const mongoose = require('mongoose');

const ConferencistaSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  imagePathS3: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, {
  versionKey: false
});


module.exports = mongoose.model('Conferencista', ConferencistaSchema);
