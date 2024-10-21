import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1729537100353 implements MigrationInterface {
  name = 'Default1729537100353'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "roomId" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roomId"`);
  }

}
