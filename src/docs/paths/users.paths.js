import { ref, param, listOf, body, success, errorResponse, internalError, EXAMPLES } from '../helpers.js';

const notFound = errorResponse('No existe el usuario', [EXAMPLES.USER_NOT_FOUND]);

export const usersPaths = {
  '/api/users': {
    get: {
      tags: ['Users'],
      summary: 'Listar usuarios',
      description: 'Devuelve todos los usuarios ordenados por nombre, sin contraseña.',
      responses: {
        200: success('Lista de usuarios', listOf('User')),
        500: internalError,
      },
    },
    post: {
      tags: ['Users'],
      summary: 'Crear un usuario',
      description: 'Crea un usuario con rol USER. La contraseña se guarda encriptada y no se devuelve.',
      requestBody: body('UserInput'),
      responses: {
        201: success('Usuario creado', ref('User')),
        400: errorResponse('Datos inválidos', [EXAMPLES.INVALID_PASSWORD, EXAMPLES.VALIDATION_ERROR, EXAMPLES.INVALID_JSON]),
        409: errorResponse('El email ya está registrado', [EXAMPLES.DUPLICATE_KEY]),
        500: internalError,
      },
    },
  },
  '/api/users/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Obtener un usuario',
      parameters: [param('IdParam')],
      responses: {
        200: success('Usuario encontrado', ref('User')),
        400: errorResponse('Id inválido', [EXAMPLES.INVALID_ID]),
        404: notFound,
        500: internalError,
      },
    },
    put: {
      tags: ['Users'],
      summary: 'Actualizar un usuario',
      description: 'Actualiza nombre, email o contraseña. El rol no se puede cambiar.',
      parameters: [param('IdParam')],
      requestBody: body('UserUpdateInput'),
      responses: {
        200: success('Usuario actualizado', ref('User')),
        400: errorResponse('Datos inválidos', [
          EXAMPLES.INVALID_ID,
          EXAMPLES.INVALID_PASSWORD,
          EXAMPLES.VALIDATION_ERROR,
          EXAMPLES.INVALID_JSON,
        ]),
        404: notFound,
        409: errorResponse('El email ya está registrado', [EXAMPLES.DUPLICATE_KEY]),
        500: internalError,
      },
    },
    delete: {
      tags: ['Users'],
      summary: 'Eliminar un usuario',
      parameters: [param('IdParam')],
      responses: {
        204: { description: 'Usuario eliminado. No devuelve contenido' },
        400: errorResponse('Id inválido', [EXAMPLES.INVALID_ID]),
        404: notFound,
        500: internalError,
      },
    },
  },
};
