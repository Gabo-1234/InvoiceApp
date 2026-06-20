import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  postCode: String,
  country: String
}, { _id: false });

const itemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number,
}, { _id: false });

const InvoiceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  tag: String,
  condition: { type: String, enum: ['paid', 'pending', 'draft'], default: 'draft' },
  price: Number,
  author: String,
  due: String,
  date: String,
  paymentDue: String,
  projectDescription: String,
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: [itemSchema],
});

export default mongoose.model('Invoice', InvoiceSchema);