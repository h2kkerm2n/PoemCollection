const mongoose = require("mongoose");

const PoemSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    trim: true,
  },
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
//MODEL
const Poem = mongoose.model("Poem", PoemSchema);

module.exports = Poem;
