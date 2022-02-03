import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from 'src/type_orm_config.service'

export const baseTestImports = () => [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useClass: TypeOrmConfigService,
  }),
]
