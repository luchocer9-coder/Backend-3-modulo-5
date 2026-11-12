import mongoose from 'mongoose';
import { OrderModel } from '../models/order.model.js';

const PUBLIC_FIELDS = 'user address items total status priority createdAt';
const USER_FIELDS = 'name email';

class OrderRepository {
  isValidId(id) {
    return mongoose.isObjectIdOrHexString(id);
  }

  async getAll(filters = {}) {
    return OrderModel.find(filters)
      .select(PUBLIC_FIELDS)
      .populate('user', USER_FIELDS)
      .sort({ createdAt: -1 })
      .lean();
  }

  async getById(id) {
    return OrderModel.findById(id).select(PUBLIC_FIELDS).populate('user', USER_FIELDS).lean();
  }

  async create(data) {
    const order = await OrderModel.create(data);
    return order.toObject();
  }

  async updateStatus(id, status) {
    return OrderModel.findByIdAndUpdate(id, { status }, { returnDocument: 'after', runValidators: true })
      .select(PUBLIC_FIELDS)
      .populate('user', USER_FIELDS)
      .lean();
  }

  async delete(id) {
    return OrderModel.findByIdAndDelete(id).lean();
  }
}

export const orderRepository = new OrderRepository();
