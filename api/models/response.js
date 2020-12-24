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
  date: {
    type: Date,
    default: Date.now,
  },
  prequestionnaire: Schema.Types.Mixed,
  postquestionnaire: Schema.Types.Mixed,
 
});

module.exports = responseSchema;
