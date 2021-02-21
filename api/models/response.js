const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const responseSchema = new Schema({
  usertoken: {
    type: String,
    required: true,
    unique: true,
  },
  evalPeriods: Schema.Types.Array,
  treatment: String,
  responses: Schema.Types.Mixed,
  learning1: Schema.Types.Mixed,
  attention1: Schema.Types.Mixed,
  date: {
    type: Date,
    default: Date.now,
  },
  mid1: Schema.Types.Mixed,
  mid2: Schema.Types.Mixed,
  prequestionnaire: Schema.Types.Mixed,
  postquestionnaire: Schema.Types.Mixed,
});

module.exports = responseSchema;
