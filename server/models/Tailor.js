import mongoose from '../config/database.js';

const baseTransform = (_doc, ret) => {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.__v;
  return ret;
};

const TailorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, transform: baseTransform },
    toObject: { virtuals: true, transform: baseTransform }
  }
);

const Tailor = mongoose.model('Tailor', TailorSchema);

export default Tailor;
