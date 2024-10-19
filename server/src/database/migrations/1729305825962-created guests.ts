import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1729305825962 implements MigrationInterface {
  name = 'Default1729305825962'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "guests" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "roomId" integer, "requests" character varying, CONSTRAINT "UQ_33a0c57f77e3857109b926d5135" UNIQUE ("cpf"), CONSTRAINT "PK_4948267e93869ddcc6b340a2c46" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "guests"`);
  }

}
