import { orderRepository } from '../repositories/order.repository.js';
import { deliveryRepository } from '../repositories/delivery.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { ORDER_STATUS, ORDER_STATUS_TRANSITIONS, USER_ROLES } from '../constants/index.js';
import {
  InvalidIdError,
  OrderNotFoundError,
  UserNotFoundError,
  InvalidOrderUserError,
  InvalidOrderItemsError,
  InvalidOrderStatusError,
} from '../errors/custom-errors.js';
import { logger } from '../config/logger.config.js';

// El total siempre se calcula a partir de los items, nunca se recibe del cliente
export const calculateOrderTotal = (items) =>
  items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);

const ensureValidId = (id) => {
  if (!orderRepository.isValidId(id)) {
    throw new InvalidIdError(id);
  }
};

class OrderService {
  async getAll() {
    return orderRepository.getAll();
  }

  async getById(id) {
    ensureValidId(id);
    const order = await orderRepository.getById(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    return order;
  }

  async create(data = {}) {
    const { user: userId, address, items, priority } = data;

    if (!userRepository.isValidId(userId)) {
      throw new InvalidIdError(userId);
    }

    const user = await userRepository.getById(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    if (user.role !== USER_ROLES.USER) {
      throw new InvalidOrderUserError(userId, user.role);
    }

    if (!Array.isArray(items) || items.length === 0) {
      throw new InvalidOrderItemsError();
    }

    // Todo pedido nuevo empieza como pendiente
    const order = await orderRepository.create({
      user: userId,
      address,
      items,
      total: calculateOrderTotal(items),
      priority,
      status: ORDER_STATUS.PENDING,
    });

    // Cada pedido nace con su entrega, todavía sin repartidor
    try {
      await deliveryRepository.create({ order: order._id });
    } catch (error) {
      await orderRepository.delete(order._id);
      throw error;
    }

    logger.info(`Pedido ${order._id} creado para el usuario ${userId}`);
    logger.warning(`Pedido ${order._id} sin repartidor asignado`);
    return order;
  }

  async updateStatus(id, status) {
    ensureValidId(id);
    const order = await orderRepository.getById(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    const allowed = ORDER_STATUS_TRANSITIONS[order.status];

    if (!allowed.includes(status)) {
      throw new InvalidOrderStatusError(order.status, status, allowed);
    }

    const updatedOrder = await orderRepository.updateStatus(id, status);
    logger.info(`Pedido ${id} pasó de ${order.status} a ${status}`);
    return updatedOrder;
  }
}

export const orderService = new OrderService();
