import { redis as baseRedis, Redis } from '4pet-sdk';

import { config } from '.';

// eslint-disable-next-line import/no-mutable-exports
let redis: Redis;

const initRedis = () => {
  redis = baseRedis({ host: config.redisHost, port: config.redisPort });
};

export { initRedis, redis };
