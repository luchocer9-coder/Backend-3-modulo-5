import { ref, param, listOf, body, success, errorResponse, internalError, EXAMPLES } from '../helpers.js';

const notFound = errorResponse('No existe el pedido', [EXAMPLES.ORDER_NOT_FOUND]);

export const ordersPaths = {
  '/api/orders': {
    get: {
      tags: ['Orders'],
      summary: 'Listar pedidos',
      description: 'Devuelve los pedidos del más nuevo al más viejo, con los datos del cliente.',
      responses: {
        200: success('Lista de pedidos', listOf('Order')),
        500: internalError,
      },
    },
    post: {
      tags: ['Orders'],
      summary: 'Crear un pedido',
      description:
        'Crea un pedido en estado PENDING para un usuario con rol USER. El total se calcula a partir de los items. ' +
        'También crea su entrega en estado PENDING_ASSIGNMENT, sin repartidor.',
      requestBody: body('OrderInput'),
      responses: {
        201: success('Pedido creado', ref('Order')),
        400: errorResponse('Datos inválidos', [
          EXAMPLES.INVALID_ID,
          EXAMPLES.INVALID_ORDER_USER,
          EXAMPLES.INVALID_ORDER_ITEMS,
          EXAMPLES.VALIDATION_ERROR,
          EXAMPLES.INVALID_JSON,
        ]),
        404: errorResponse('No existe el usuario', [EXAMPLES.USER_NOT_FOUND]),
        500: internalError,
      },
    },
  },
  '/api/orders/{id}': {
    get: {
      tags: ['Orders'],
      summary: 'Obtener un pedido',
      parameters: [param('IdParam')],
      responses: {
        200: success('Pedido encontrado', ref('Order')),
        400: errorResponse('Id inválido', [EXAMPLES.INVALID_ID]),
        404: notFound,
        500: internalError,
      },
    },
  },
  '/api/orders/{id}/status': {
    patch: {
      tags: ['Orders'],
      summary: 'Cambiar el estado de un pedido',
      description:
        'Solo se permiten estos cambios: PENDING → PREPARING o CANCELLED; PREPARING → SHIPPED o CANCELLED; ' +
        'SHIPPED → DELIVERED. DELIVERED y CANCELLED son estados finales.',
      parameters: [param('IdParam')],
      requestBody: body('OrderStatusInput'),
      responses: {
        200: success('Estado actualizado', ref('Order')),
        400: errorResponse('Estado o id inválido', [
          EXAMPLES.INVALID_ORDER_STATUS,
          EXAMPLES.INVALID_ID,
          EXAMPLES.INVALID_JSON,
        ]),
        404: notFound,
        500: internalError,
      },
    },
  },
};
