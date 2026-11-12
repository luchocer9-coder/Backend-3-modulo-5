import { schemas } from './components/schemas.js';
import { parameters } from './components/parameters.js';
import { usersPaths } from './paths/users.paths.js';
import { productsPaths } from './paths/products.paths.js';
import { ordersPaths } from './paths/orders.paths.js';
import { deliveriesPaths } from './paths/deliveries.paths.js';
import { mocksPaths } from './paths/mocks.paths.js';
import { loggerPaths } from './paths/logger.paths.js';

export const openapiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'ShipNow API',
    version: '1.0.0',
    description:
      'API REST de ShipNow para gestionar usuarios, pedidos y entregas. ' +
      'Su propósito es centralizar el ciclo de un envío: el cliente hace un pedido, ' +
      'se le asigna un repartidor y se sigue la entrega hasta que llega a destino. ' +
      'También incluye herramientas internas para generar datos de prueba y verificar los logs.\n\n' +
      'Todos los errores responden con el formato ErrorResponse. Cualquier ruta que no exista responde 404 ROUTE_NOT_FOUND. ' +
      'La API no tiene autenticación.',
  },
  servers: [{ url: 'http://localhost:8080', description: 'Servidor local' }],
  tags: [
    { name: 'Users', description: 'Clientes y repartidores' },
    { name: 'Orders', description: 'Pedidos de los clientes' },
    { name: 'Deliveries', description: 'Entregas de los pedidos y asignación de repartidores' },
    { name: 'Mocks', description: 'Generación y carga de datos de prueba' },
    { name: 'Logger', description: 'Herramienta interna para validar los logs' },
    { name: 'Products', description: 'Catálogo de productos' },
  ],
  paths: {
    ...usersPaths,
    ...ordersPaths,
    ...deliveriesPaths,
    ...mocksPaths,
    ...loggerPaths,
    ...productsPaths,
  },
  components: { schemas, parameters },
};
