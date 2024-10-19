import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1729346425497 implements MigrationInterface {
  name = 'Default1729346425497'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "service_requests" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "guestId" integer, CONSTRAINT "PK_ee60bcd826b7e130bfbd97daf66" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "service_requests" ADD CONSTRAINT "FK_55cd13dfe3ae14654f27dfddb88" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "service_requests" DROP CONSTRAINT "FK_55cd13dfe3ae14654f27dfddb88"`);
    await queryRunner.query(`DROP TABLE "service_requests"`);
  }

}
