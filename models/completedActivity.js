import mongoose from 'mongoose';

const completedActivitySchema = new mongoose.Schema({
  place: { type: String },
  date: { type: Date, required: true },
  duration: {
    type: {
      hours: Number,
      minutes: Number
    },
    required: true
  },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sport: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport', required: true },
  categories: {
    type: [
      {
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        percentage: Number,
        required: false
      }
    ]
  }
});

const CompletedActivity = mongoose.model('CompletedActivity', completedActivitySchema);
export default CompletedActivity;
