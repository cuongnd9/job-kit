# sequelize-kit

A simple 🎲 KIT to start a new Node project.

## Preparation

- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (*optional)
- [Docker Compose](https://docs.docker.com/compose/) (*optional)
- [Dockstation](https://dockstation.io/) (*optional)

## How to use?

### Update config.ts file (src/components/config.ts)

```typescript
const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 9000,
  pgHost: process.env.PG_HOST || '127.0.0.1',
  pgPort: (process.env.PG_PORT as number | undefined) || 5432,
  pgDB: process.env.PG_DB || 'postgres',
  pgUser: process.env.PG_USER || 'postgres',
  pgPassword: process.env.PG_PASSWORD || 'postgres',
};

export default config;
```

### Start application

```sh
yarn
yarn start:dev
```

### Use with Docker + Docker Compose

```sh
yarn docker-compose:start
yarn docker-compose:stop
yarn docker-compose:rebuild
```

🙌 Awesome

## License

MIT © [Cuong Tran](https://github.com/103cuong)
