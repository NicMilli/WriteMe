const mongoose = require('mongoose');

const badgeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Badge', badgeSchema);
