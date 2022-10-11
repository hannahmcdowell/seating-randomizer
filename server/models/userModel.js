const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 12;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  periods: [String],
  classes: [{
    period: String,
    roster: [String],
  }]
});

userSchema.pre('save', function(next) {
  const hash = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
  this.password = hash;
  next();
});

module.exports = mongoose.model('User', userSchema);