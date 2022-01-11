import { join } from 'path'

export default {
  type: 'postgres' as const,
  host: process.env.DATABASE_HOST || 'db',
  port: Number(process.env.DATABASE_PORT || 5432),
  username: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'dev_sample',
  database: process.env.POSTGRES_DB || 'main_db',
  entities: [join(__dirname + '../**/*.entity{.ts,.js}')],
  migrations: ['./src/migrations/*.ts'],
  cli: {
    migrationsDir: './src/migrations',
  },
  synchronize: false,
}
