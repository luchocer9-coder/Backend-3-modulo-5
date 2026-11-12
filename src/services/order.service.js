import { orderRepository } from '../repositories/order.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { ORDER_STATUS, USER_ROLES } from '../constants/index.js';
import {
  InvalidIdError,
  OrderNotFoundError,
  UserNotFoundError,
  InvalidOrderUserError,
} from '../errors/custom-errors.js';
import { logger } from '../config/logger.config.js';

class OrderService {
  async getAll() {
    return orderRepository.getAll();
  }

  async getById(id) {
    if (!orderRepository.isValidId(id)) {
      throw new InvalidIdError(id);
    }

    const order = await orderRepository.getById(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    return order;
  }

  async create(data = {}) {
    const { user: userId, address, total, priority } = data;

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

    // Todo pedido nuevo empieza como pendiente
    const order = await orderRepository.create({
      user: userId,
      address,
      total,
      priority,
      status: ORDER_STATUS.PENDING,
    });

    logger.info(`Pedido ${order._id} creado para el usuario ${userId}`);
    return order;
  }
}

export const orderService = new OrderService();
