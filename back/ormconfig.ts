import { ConfigModule } from '@nestjs/config'
import typeOrmConfig from './src/type_orm_config'

ConfigModule.forRoot({
  isGlobal: true,
  load: [typeOrmConfig],
})

export default typeOrmConfig()
