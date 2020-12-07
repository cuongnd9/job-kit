import path from 'path';
import { logger, globalOptions } from 'juno-js';

import { migrate, config, initRedis } from './components';
import { sequelize, initSequelize } from './models/sequelize';
import { createApp } from './app';

globalOptions.environment = config.nodeEnv;

const main = async () => {
  try {
    initRedis();
    initSequelize();
    if (config.nodeEnv !== 'development') {
      const pathToMigration = path.join(__dirname, 'migrations');
      await migrate(sequelize, pathToMigration).up().catch((error) => logger.error('Migrate error', error));
    }
    createApp();
  } catch (error) {
    logger.error('Global error', error);
  }
};

main();
