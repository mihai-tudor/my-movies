import mongoose from 'mongoose';

// Declare Schema
const Movies = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: [2, 'Name too short, min 2!'],
      maxlength: [50, 'Name too long, max 50!'],
      required: true
    }
  },
  { timestamps: true },
);

// Declare Model to mongoose with Schema
mongoose.model('movies', Movies);

// Export Model to be used in Node
export default mongoose.model('movies');
