const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  requirements: { type: String, required: true },
  niche: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
