const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 9000,
  pgHost: process.env.PG_HOST || '0.0.0.0',
  pgPort: (process.env.PG_PORT as number | undefined) || 5432,
  pgDB: process.env.PG_DB || 'postgres',
  pgUser: process.env.PG_USER || 'postgres',
  pgPassword: process.env.PG_PASSWORD || 'postgres',
  redisHost: process.env.REDIS_HOST || 'redis',
  redisPort: (process.env.REDIS_PORT as number | undefined) || 6379,
  redisPassword: process.env.REDIS_PASSWORD || 'redis',
};

export { config };
