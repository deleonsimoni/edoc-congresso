const mongoose = require('mongoose');

const ChatAdminSchema = new mongoose.Schema({

  author: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
  },

  chat: [{
      publisher: {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        icAdmin: {
          type: Boolean,
          default: false
        }
      },
      loved: {
        type: Boolean,
        default: false
      },
      content: {
        type: String,
        required: true
      },
  }],
  icReply: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  
  
});


module.exports = mongoose.model('ChatAdmin', ChatAdminSchema);
