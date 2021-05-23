const mongoose = require('mongoose');

const OperationSchema = mongoose.Schema({
  concept: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date,
  },
  type: {
    type: String,
    enum: ['Ingreso', 'Egreso'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
});
module.exports = mongoose.model('Operation', OperationSchema);
