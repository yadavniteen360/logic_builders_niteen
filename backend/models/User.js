const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['influencer', 'brand'], required: true },
  // Optional fields
  niche: { type: String, default: 'general' },
  followers: { type: Number, default: 0 },
  location: { type: String, default: 'Not specified' }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  console.log('--- PASSWORD HASHING DEBUG ---');
  console.log('Hashing password for user: ', this.email);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log('Password hashed successfully');
  console.log('------------------------------');
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
