import { AppError } from '../errors/custom-errors.js';
import { ERRORS } from '../errors/error-dictionary.js';
import { logger } from '../config/logger.config.js';

// Convierte cualquier error en un AppError del diccionario
const toAppError = (err) => {
  if (err instanceof AppError) return err;

  if (err.type === 'entity.parse.failed') {
    return new AppError(ERRORS.INVALID_JSON);
  }

  if (err.name === 'CastError') {
    return new AppError(ERRORS.INVALID_ID, { field: err.path, value: err.value });
  }

  if (err.name === 'ValidationError') {
    const fields = Object.values(err.errors).map((fieldError) => ({
      field: fieldError.path,
      message: fieldError.message,
    }));
    return new AppError(ERRORS.VALIDATION_ERROR, { fields });
  }

  if (err.code === 11000) {
    return new AppError(ERRORS.DUPLICATE_KEY, { fields: Object.keys(err.keyValue ?? {}) });
  }

  return new AppError(ERRORS.INTERNAL_ERROR);
};

// Errores esperados (4xx) -> warning. Errores del servidor (5xx) -> error, con su stack
const logError = (appError, err, req) => {
  const details = appError.details ? ` ${JSON.stringify(appError.details)}` : '';
  const summary = `${appError.code} en ${req.method} ${req.originalUrl}: ${appError.message}${details}`;

  if (appError.statusCode >= 500) {
    const original = appError === err ? (err.cause ?? err) : err;
    logger.error(summary, { stack: original.stack });
    return;
  }

  logger.warning(summary);
};

export const errorHandler = (err, req, res, next) => {
  const appError = toAppError(err);

  logError(appError, err, req);

  res.status(appError.statusCode).json({
    status: 'error',
    statusCode: appError.statusCode,
    code: appError.code,
    message: appError.message,
    details: appError.details,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
};
