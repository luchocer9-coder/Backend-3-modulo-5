import { orderService } from '../services/order.service.js';

class OrderController {
  async getAll(req, res) {
    const orders = await orderService.getAll();
    res.status(200).json({ payload: orders });
  }

  async getById(req, res) {
    const order = await orderService.getById(req.params.id);
    res.status(200).json({ payload: order });
  }

  async create(req, res) {
    const order = await orderService.create(req.body);
    res.status(201).json({ payload: order });
  }
}

export const orderController = new OrderController();
