import app from './app.js';
import { config, missingEnvVars } from './config/env.config.js';
import { connectDB } from './config/database.config.js';
import { logger } from './config/logger.config.js';

// Registra la falla y deja que el proceso termine solo, así los logs llegan al archivo
const stopWithFatal = (message, error) => {
  logger.fatal(message, error ? { stack: error.stack } : {});
  process.exitCode = 1;
};

const start = async () => {
  if (missingEnvVars.length > 0) {
    stopWithFatal(`Faltan variables de entorno: ${missingEnvVars.join(', ')}. El servidor no se inicia`);
    return;
  }

  try {
    await connectDB();
  } catch (error) {
    stopWithFatal(`No se pudo conectar a MongoDB: ${error.message}`, error);
    return;
  }

  app.listen(config.port, () => {
    logger.info(`Servidor ShipNow escuchando en el puerto ${config.port} (${config.nodeEnv})`);
  });
};

start();
