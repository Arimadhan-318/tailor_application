import mongoose from '../config/database.js';

const baseTransform = (_doc, ret) => {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.__v;
  return ret;
};

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    dressType: {
      type: String,
      required: true,
      trim: true
    },
    tailorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tailor',
      required: true
    },
    givenDate: {
      type: Date,
      required: true
    },
    deliveryDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Delivered'],
      default: 'Pending',
      required: true
    },
    notes: {
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

const Order = mongoose.model('Order', OrderSchema);

export default Order;
