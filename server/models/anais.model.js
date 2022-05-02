const mongoose = require('mongoose');

const AnaisSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  },
  summary: [{
      name: {
        type: String
      },
      link: {
        type: String
      },
    }
  ],
  createAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


module.exports = mongoose.model('Anais', AnaisSchema);
