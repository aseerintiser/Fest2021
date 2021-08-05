const mongoose = require("mongoose");

const progContestSchema = new mongoose.Schema({
  teamname: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  coachname: {
    type: String,
    required: true,
  },
  coachcontact: {
    type: String,
    required: true,
  },
  coachmail: {
    type: String,
    required: true,
  },
  coachtshirt: {
    type: String,
    required: true,
  },

  leadername: {
    type: String,
    required: true,
  },
  leadercontact: {
    type: String,
    required: true,
  },
  leadermail: {
    type: String,
    required: true,
  },
  leadertshirt: {
    type: String,
    required: true,
  },
  member1name: {
    type: String,
    required: true,
  },
  member1contact: {
    type: String,
    required: true,
  },
  member1mail: {
    type: String,
    required: true,
  },
  member1tshirt: {
    type: String,
    required: true,
  },
  member2name: {
    type: String,
    required: true,
  },
  member2contact: {
    type: String,
    required: true,
  },
  member2mail: {
    type: String,
    required: true,
  },
  member2tshirt: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  paid: {
    type: Number,
    required: true,
  },
  selected: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

});

const ProgContest = mongoose.model("prog-contest", progContestSchema);
module.exports = ProgContest;