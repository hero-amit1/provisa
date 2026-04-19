const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  date: { type: String },
  time: { type: String },
  country: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
