import BaseRedis, { Redis } from 'ioredis';
import { logger } from 'juno-js';

import { config } from '.';

// eslint-disable-next-line import/no-mutable-exports
let redis: Redis;

const initRedis = () => {
  redis = new BaseRedis({ host: config.redisHost, port: config.redisPort, password: config.redisPassword });

  redis.on('error', (e: any) => {
    logger.error('Redis connection failed', e);
    process.exit(0);
  });
};

export { initRedis, redis };
