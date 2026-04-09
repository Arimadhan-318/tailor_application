import mongoose from '../config/database.js';

const baseTransform = (_doc, ret) => {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.__v;
  return ret;
};

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      default: ''
    },
    address: {
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

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;
