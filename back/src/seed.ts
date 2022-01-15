import { createConnection } from 'typeorm'
import * as yaml from 'js-yaml'
import * as fs from 'fs'
import connConfigs from './type_orm_config'

async function loadSeeds(): Promise<void> {
  const connection = await createConnection(connConfigs)

  const file = yaml.load(fs.readFileSync(`./src/seed.yml`, 'utf8')) as Record<
    string,
    unknown[]
  >
  for (const [entityName, objs] of Object.entries(file)) {
    for (const data of objs) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(entityName)
        .values(data)
        .execute()
    }
  }
  await connection.close()
}

loadSeeds()
