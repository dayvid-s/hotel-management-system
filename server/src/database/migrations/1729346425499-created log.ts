import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1729515025540 implements MigrationInterface {
  name = 'Default1729515025540'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "log" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "status" character varying(255), "description" character varying(10000) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "log"`);
  }

}
