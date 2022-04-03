import { MigrationInterface, QueryRunner } from 'typeorm'

export class renameRequestStatus1648978990781 implements MigrationInterface {
  name = 'renameRequestStatus1648978990781'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."requests_status_enum" RENAME TO "requests_status_enum_old"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."requests_status_enum" AS ENUM('awaiting', 'approved', 'declined')`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" ALTER COLUMN "status" TYPE "public"."requests_status_enum" USING "status"::"text"::"public"."requests_status_enum"`,
    )
    await queryRunner.query(`DROP TYPE "public"."requests_status_enum_old"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."requests_status_enum_old" AS ENUM('requesting', 'approved', 'declined')`,
    )
    await queryRunner.query(
      `ALTER TABLE "requests" ALTER COLUMN "status" TYPE "public"."requests_status_enum_old" USING "status"::"text"::"public"."requests_status_enum_old"`,
    )
    await queryRunner.query(`DROP TYPE "public"."requests_status_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."requests_status_enum_old" RENAME TO "requests_status_enum"`,
    )
  }
}
