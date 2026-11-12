import { deliveryService } from '../services/delivery.service.js';

class DeliveryController {
  async getAll(req, res) {
    const deliveries = await deliveryService.getAll();
    res.status(200).json({ payload: deliveries });
  }

  async getById(req, res) {
    const delivery = await deliveryService.getById(req.params.id);
    res.status(200).json({ payload: delivery });
  }

  async updateStatus(req, res) {
    const delivery = await deliveryService.updateStatus(req.params.id, req.body);
    res.status(200).json({ payload: delivery });
  }
}

export const deliveryController = new DeliveryController();
