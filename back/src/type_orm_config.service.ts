import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configService = new ConfigService()
    return {
      type: 'mysql' as const,
      host: configService.get('DATABASE_HOST', 'db'),
      port: Number(configService.get('DATABASE_PORT', 3306)),
      username: configService.get('DATABASE_USERNAME', 'admin'),
      password: configService.get<string>('DATABASE_PASSWORD', 'dev_sample'),
      database: configService.get<string>('DATABASE_NAME', 'main_db'),
      entities: [join(__dirname + '../**/*.entity{.ts,.js}')],
      synchronize: false,
    }
  }
}