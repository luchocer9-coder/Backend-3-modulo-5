import swaggerUi from 'swagger-ui-express';
import { openapiSpec } from '../docs/openapi.js';

export const setupSwagger = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));
};
