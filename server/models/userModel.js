const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('User', userSchema);