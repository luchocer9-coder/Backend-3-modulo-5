import { ref, param, json, errorResponse, EXAMPLES } from '../helpers.js';

const invalidQty = errorResponse('Cantidad inválida', [EXAMPLES.NEGATIVE_MOCK_QTY, EXAMPLES.INVALID_MOCK_QTY]);
const seedForbidden = errorResponse('Carga no permitida con NODE_ENV=production', [EXAMPLES.MOCK_SEED_FORBIDDEN]);
const seedFailed = errorResponse('MongoDB falló durante la carga. Se borra lo que se llegó a guardar', [
  EXAMPLES.MOCK_SEED_FAILED,
]);

const SEED_NOTE = 'No lleva body: la cantidad se envía en el parámetro qty de la URL.';

export const mocksPaths = {
  '/api/mocks/users': {
    get: {
      tags: ['Mocks'],
      summary: 'Generar usuarios mock sin guardarlos',
      description: 'Devuelve usuarios simulados con rol USER o DRIVER. No se guardan en la base.',
      parameters: [param('QtyParam')],
      responses: {
        200: json('Usuarios simulados', { type: 'array', items: ref('MockUser') }),
        400: invalidQty,
      },
    },
  },
  '/api/mocks/drivers': {
    get: {
      tags: ['Mocks'],
      summary: 'Generar repartidores mock sin guardarlos',
      description: 'Devuelve usuarios simulados con rol DRIVER. No se guardan en la base.',
      parameters: [param('QtyParam')],
      responses: {
        200: json('Repartidores simulados', { type: 'array', items: ref('MockUser') }),
        400: invalidQty,
      },
    },
  },
  '/api/mocks/dataset': {
    get: {
      tags: ['Mocks'],
      summary: 'Generar pedidos mock relacionados sin guardarlos',
      description:
        'qty es la cantidad de pedidos. Genera además qty/2 clientes y qty/3 repartidores, redondeando hacia arriba, ' +
        'y una entrega por pedido. Cada pedido pertenece a un cliente y cada entrega a un pedido. No se guardan en la base.',
      parameters: [param('QtyParam')],
      responses: {
        200: json('Usuarios, pedidos y entregas relacionados', ref('MockDataset')),
        400: invalidQty,
      },
    },
  },
  '/api/mocks/seed': {
    post: {
      tags: ['Mocks'],
      summary: 'Insertar usuarios de prueba en MongoDB',
      description: `Genera e inserta usuarios con rol USER o DRIVER. Su contraseña es mock1234. ${SEED_NOTE}`,
      parameters: [param('QtyParam')],
      responses: {
        201: json('Usuarios insertados', ref('SeedUsersResult')),
        400: invalidQty,
        403: seedForbidden,
        500: seedFailed,
      },
    },
  },
  '/api/mocks/seed/dataset': {
    post: {
      tags: ['Mocks'],
      summary: 'Insertar usuarios, pedidos y entregas de prueba en MongoDB',
      description: `Inserta un set relacionado igual al de GET /api/mocks/dataset. ${SEED_NOTE}`,
      parameters: [param('QtyParam')],
      responses: {
        201: json('Registros insertados por colección', ref('SeedDatasetResult')),
        400: invalidQty,
        403: seedForbidden,
        500: seedFailed,
      },
    },
  },
};
