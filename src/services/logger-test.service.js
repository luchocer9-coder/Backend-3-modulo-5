import { logger, LOG_LEVELS, MIN_LEVEL } from '../config/logger.config.js';

class LoggerTestService {
  run() {
    logger.debug('Prueba de logger: nivel debug');
    logger.http('Prueba de logger: nivel http');
    logger.info('Prueba de logger: nivel info');
    logger.warning('Prueba de logger: nivel warning');
    logger.error('Prueba de logger: nivel error');
    logger.fatal('Prueba de logger: nivel fatal');

    const levels = Object.keys(LOG_LEVELS);
    const visibleLevels = levels.filter((level) => LOG_LEVELS[level] <= LOG_LEVELS[MIN_LEVEL]);

    return {
      message: 'Se generó un log de prueba en cada nivel',
      levels,
      minLevel: MIN_LEVEL,
      visibleLevels,
      files: {
        error: 'logs/error-AAAA-MM-DD.log (solo error y fatal)',
        combined: `logs/combined-AAAA-MM-DD.log (desde ${MIN_LEVEL})`,
      },
    };
  }
}

export const loggerTestService = new LoggerTestService();
