import { ref, param, listOf, body, success, errorResponse, internalError, EXAMPLES } from '../helpers.js';

const notFound = errorResponse('No existe el producto', [EXAMPLES.PRODUCT_NOT_FOUND]);

export const productsPaths = {
  '/api/products': {
    get: {
      tags: ['Products'],
      summary: 'Listar productos disponibles',
      description: 'Devuelve solo los productos con estado AVAILABLE, ordenados por nombre.',
      responses: {
        200: success('Lista de productos', listOf('Product')),
        500: internalError,
      },
    },
    post: {
      tags: ['Products'],
      summary: 'Crear un producto',
      description: 'El estado se calcula solo: AVAILABLE si hay stock y OUT_OF_STOCK si no.',
      requestBody: body('ProductInput'),
      responses: {
        201: success('Producto creado', ref('Product')),
        400: errorResponse('Datos inválidos', [
          EXAMPLES.INVALID_PRODUCT_STATUS,
          EXAMPLES.VALIDATION_ERROR,
          EXAMPLES.INVALID_JSON,
        ]),
        500: internalError,
      },
    },
  },
  '/api/products/{id}': {
    get: {
      tags: ['Products'],
      summary: 'Obtener un producto',
      parameters: [param('IdParam')],
      responses: {
        200: success('Producto encontrado', ref('Product')),
        400: errorResponse('Id inválido', [EXAMPLES.INVALID_ID]),
        404: notFound,
        500: internalError,
      },
    },
    put: {
      tags: ['Products'],
      summary: 'Actualizar un producto',
      description: 'Si cambia el stock, el estado se recalcula.',
      parameters: [param('IdParam')],
      requestBody: body('ProductUpdateInput'),
      responses: {
        200: success('Producto actualizado', ref('Product')),
        400: errorResponse('Datos inválidos', [
          EXAMPLES.INVALID_ID,
          EXAMPLES.INVALID_PRODUCT_STATUS,
          EXAMPLES.VALIDATION_ERROR,
          EXAMPLES.INVALID_JSON,
        ]),
        404: notFound,
        500: internalError,
      },
    },
    delete: {
      tags: ['Products'],
      summary: 'Eliminar un producto',
      parameters: [param('IdParam')],
      responses: {
        204: { description: 'Producto eliminado. No devuelve contenido' },
        400: errorResponse('Id inválido', [EXAMPLES.INVALID_ID]),
        404: notFound,
        500: internalError,
      },
    },
  },
};
