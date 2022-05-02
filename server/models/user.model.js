const { number } = require('joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  socialname: {
    type: String
  },
  comprovanteAWS: {
    type: String
  },
  document: {
    type: String,
    required: true
  },
  pcdId: {
    type: Number
  },
  categoriaId: {
    type: Number
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email inválido'],
  },
  hashedPassword: {
    type: String,
    required: true
  },
  mailCodePassword: {
    type: String,
    select: false
  },
  icAcceptTerms: {
    type: Boolean,
    default: false
  },
  icForeign: {
    type: Boolean,
    default: false
  },
  icAdmin: {
    type: Boolean,
    default: false
  },
  isPCD: {
    type: Boolean,
    default: false
  },
  icEditor: {
    type: Boolean,
    default: false
  },
  deficiencyType: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  dateBirth: {
    type: Date
  },
  checkStandards: {
    type: Boolean,
    default: false
  },
  address: {
    street: String,
    complement: String,
    num: String,
    zip: String,
    city: String,
    district: String,
    country: String,
    state: String
  },

  boleto: {
    refTran: {
      type: Number
    },
    dtVenc: {
      type: Date
    },
    valor: {
      type: Number
    }
  },

  phones: {
    cellphone: String,
    telephone: String
  },

  modalityId: [{
    type: Number
  }],

  institution: {
    name: String,
    initials: String
  },
  axis: {
    icCoordinator: Boolean,
    icExpert: Boolean,
    name: String,
    imReceipt: Buffer
  },
  payment: {
    amount: Number,
    categoryId: Number,
    pathS3: String,
    pathReceiptPayment: String,
    icPaid: Boolean,
    icValid: Boolean
  },

  works: [{
    type: mongoose.Schema.Types.ObjectId
  }],

  cursosInscritos: [{
    idSchedule: {
      type: mongoose.Schema.Types.ObjectId
    },
    icModalityId: Number
  }],

  monitor: [{
    idSchedule: {
      type: mongoose.Schema.Types.ObjectId
    },
    icModalityId: Number
  }],

  mediador: [{
    idSchedule: {
      type: mongoose.Schema.Types.ObjectId
    },
    icModalityId: Number
  }],

  reviewer: {
    icModalityId: Number,
    icCoordinator: Boolean
  },

  roles: [{
    id: Number
  }]
}, {
  versionKey: false
});


module.exports = mongoose.model('User', UserSchema);
