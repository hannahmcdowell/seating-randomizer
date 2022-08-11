const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 12;

// if implmenting login, change so that username must be unique.
const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  periods: [String],
  classes: [{
    period: String,
    roster: [String],
  }]
});

userSchema.pre('save', (next) => {
  const hash = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
  this.password = hash;
  next();
});

module.exports = mongoose.model('User', userSchema);