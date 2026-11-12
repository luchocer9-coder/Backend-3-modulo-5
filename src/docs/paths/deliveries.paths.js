import { ref, param, listOf, body, success, errorResponse, internalError, EXAMPLES } from '../helpers.js';

const notFound = errorResponse('No existe la entrega', [EXAMPLES.DELIVERY_NOT_FOUND]);

export const deliveriesPaths = {
  '/api/deliveries': {
    get: {
      tags: ['Deliveries'],
      summary: 'Listar entregas',
      description: 'Devuelve las entregas de la más nueva a la más vieja, con su pedido y su repartidor.',
      responses: {
        200: success('Lista de entregas', listOf('Delivery')),
        500: internalError,
      },
    },
  },
  '/api/deliveries/{id}': {
    get: {
      tags: ['Deliveries'],
      summary: 'Obtener una entrega',
      parameters: [param('IdParam')],
      responses: {
        200: success('Entrega encontrada', ref('Delivery')),
        400: errorResponse('Id inválido', [EXAMPLES.INVALID_ID]),
        404: notFound,
        500: internalError,
      },
    },
  },
  '/api/deliveries/{id}/status': {
    patch: {
      tags: ['Deliveries'],
      summary: 'Cambiar el estado de una entrega o asignar repartidor',
      description:
        'Solo se permiten estos cambios: PENDING_ASSIGNMENT → ASSIGNED o CANCELLED; ASSIGNED → IN_TRANSIT o CANCELLED; ' +
        'IN_TRANSIT → DELIVERED. Para pasar a ASSIGNED hay que enviar driver, el id de un usuario con rol DRIVER. ' +
        'Al pasar a DELIVERED se guarda la fecha de entrega.',
      parameters: [param('IdParam')],
      requestBody: body('DeliveryStatusInput'),
      responses: {
        200: success('Estado actualizado', ref('Delivery')),
        400: errorResponse('Estado, repartidor o id inválido', [
          EXAMPLES.INVALID_DELIVERY_STATUS,
          EXAMPLES.INVALID_DELIVERY_DRIVER,
          EXAMPLES.INVALID_ID,
          EXAMPLES.INVALID_JSON,
        ]),
        404: notFound,
        500: internalError,
      },
    },
  },
};
