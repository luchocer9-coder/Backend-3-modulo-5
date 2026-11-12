import mongoose from 'mongoose';
import { config } from './env.config.js';
import { logger } from './logger.config.js';

export const connectDB = async () => {
  logger.debug('Conectando a MongoDB...');
  await mongoose.connect(config.mongoUri);
  logger.info('Conexión a MongoDB establecida');

  mongoose.connection.on('disconnected', () => logger.warning('Se perdió la conexión con MongoDB'));
  mongoose.connection.on('reconnected', () => logger.info('Conexión con MongoDB restablecida'));
  mongoose.connection.on('error', (error) => logger.error('Error en la conexión con MongoDB', error));
};
