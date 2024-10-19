import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1729307028445 implements MigrationInterface {
  name = 'Default1729307028445'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "reservations" ("id" SERIAL NOT NULL, "checkInDate" TIMESTAMP NOT NULL, "checkOutDate" TIMESTAMP NOT NULL, "guestId" integer, "roomId" integer, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_bd6ff7a7399250f366e3df6bea6" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_73fa8fb7243b56914e00f8a0b14" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_73fa8fb7243b56914e00f8a0b14"`);
    await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_bd6ff7a7399250f366e3df6bea6"`);
    await queryRunner.query(`DROP TABLE "reservations"`);
  }

}
