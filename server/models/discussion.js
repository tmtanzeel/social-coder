const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const discussionSchema = new Schema({
  question: String,
  date: String,
  askedby: String,
  answers: [String],
  tags: [String]
})

module.exports = mongoose.model('discussion', discussionSchema, 'discussions');
