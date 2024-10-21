import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1729538802395 implements MigrationInterface {
  name = 'Default1729538802395'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rooms" ADD "checkIn" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "rooms" ADD "checkOut" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "checkOut"`);
    await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "checkIn"`);
  }

}
