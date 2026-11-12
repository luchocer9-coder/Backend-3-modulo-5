import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const requiredVars = ['PORT', 'MONGODB_URI', 'NODE_ENV'];

// server.js revisa esta lista al arrancar y frena la app con un log fatal
export const missingEnvVars = requiredVars.filter((variable) => !process.env[variable]);

export const config = Object.freeze({
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
});
