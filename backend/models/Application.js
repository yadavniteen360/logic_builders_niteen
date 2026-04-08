const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  influencer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

// Prevent duplicate applications
applicationSchema.index({ influencer: 1, campaign: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
