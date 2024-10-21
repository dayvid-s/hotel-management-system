import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1729536717538 implements MigrationInterface {
  name = 'Default1729536717538'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "guests" ADD "email" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "guests" DROP COLUMN "email"`);
  }

}
