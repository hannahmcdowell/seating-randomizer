const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  periods: [String],
  classes: [{
    period: String,
    roster: [String],
  }]
});

module.exports = mongoose.model('User', userSchema);