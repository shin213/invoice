import { Company } from './companies/company'
import { InvoiceFormat } from './invoice-formats/invoice-format'
import { User } from './users/user'
import { InvoiceFormatLog } from './invoice-format-logs/invoice-format-log'

export default {
  type: 'postgres' as const,
  host: process.env.DATABASE_HOST || 'db',
  port: Number(process.env.DATABASE_PORT || 5432),
  username: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'dev_sample',
  database: process.env.POSTGRES_DB || 'main_db',
  entities: [Company, InvoiceFormat, User, InvoiceFormatLog],
  migrations: ['./src/migrations/*.ts'],
  cli: {
    migrationsDir: './src/migrations',
  },
  synchronize: false,
}
