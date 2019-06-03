import mongoose from 'mongoose';

// Declare Schema
const Movies = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true
    },
    title: {
      type: String,
      trim: true,
      minlength: [2, 'Name too short, min 2!'],
      maxlength: [50, 'Name too long, max 50!'],
      required: true
    },
    plot: {
      type: String,
      trim: true,
      maxlength: [255, 'Description too long, max 255!']
    },
    imageUrl: {
      type: String,
      trim: true,
      maxlength: [255, 'Link URL too long, max 255!']
    },
    directors: {
      type: String,
      trim: true,
      maxlength: [255, 'Directors too long, max 255!']
    },
    cast: {
      type: String,
      trim: true,
      maxlength: [255, 'Cast too long, max 255!']
    }
  },
  { timestamps: true },
);

// Declare Model to mongoose with Schema
mongoose.model('movies', Movies);

// Export Model to be used in Node
export default mongoose.model('movies');
