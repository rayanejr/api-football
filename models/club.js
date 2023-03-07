import mongoose from 'mongoose';

const clubSchema  = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coach_name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  trophies: {
    type: Number,
    default: 0
  },
  redCards: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  }
});

export default mongoose.model('club', clubSchema );
