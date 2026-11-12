import { logger } from '../config/logger.config.js';

// Registra cada petición cuando termina: método, ruta, status y duración
export const httpLogger = (req, res, next) => {
  const startedAt = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startedAt;
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration} ms`);
  });

  next();
};
