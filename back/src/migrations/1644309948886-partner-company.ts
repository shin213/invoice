import { MigrationInterface, QueryRunner } from 'typeorm'

export class partnerCompany1644309948886 implements MigrationInterface {
  name = 'partnerCompany1644309948886'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."partner_companies_prefecture_enum" AS ENUM('北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県')`,
    )
    await queryRunner.query(
      `CREATE TABLE "partner_companies" ("id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "phone_number" character varying(50), "postal_code" character varying(50), "prefecture" "public"."partner_companies_prefecture_enum", "city" character varying(50), "rest_address" character varying(256), "code" character varying(256), "general_contractor_id" integer NOT NULL, CONSTRAINT "PK_fbf9fbdabb7bdd27a0dda2ea64b" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "phone_number" character varying(50)`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "postal_code" character varying(50)`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."companies_prefecture_enum" AS ENUM('北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県')`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "prefecture" "public"."companies_prefecture_enum"`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "city" character varying(50)`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "rest_address" character varying(256)`,
    )
    await queryRunner.query(
      `ALTER TABLE "partner_companies" ADD CONSTRAINT "FK_ccc9ed777f15834f9d0299d0738" FOREIGN KEY ("general_contractor_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "partner_companies" DROP CONSTRAINT "FK_ccc9ed777f15834f9d0299d0738"`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies" DROP COLUMN "rest_address"`,
    )
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "city"`)
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "prefecture"`)
    await queryRunner.query(`DROP TYPE "public"."companies_prefecture_enum"`)
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "postal_code"`)
    await queryRunner.query(
      `ALTER TABLE "companies" DROP COLUMN "phone_number"`,
    )
    await queryRunner.query(`DROP TABLE "partner_companies"`)
    await queryRunner.query(
      `DROP TYPE "public"."partner_companies_prefecture_enum"`,
    )
  }
}
