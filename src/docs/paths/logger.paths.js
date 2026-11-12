import { ref, json } from '../helpers.js';

export const loggerPaths = {
  '/api/loggerTest': {
    get: {
      tags: ['Logger'],
      summary: 'Probar todos los niveles del logger',
      description:
        'Herramienta interna de validación, no es una funcionalidad del negocio. Genera un log en cada nivel ' +
        '(debug, http, info, warning, error y fatal) para comprobar que aparecen en consola y en los archivos de logs/. ' +
        'En development se ven todos; en production, desde info.',
      responses: {
        200: json('Logs generados y niveles visibles según el entorno', ref('LoggerTestResult')),
      },
    },
  },
};
