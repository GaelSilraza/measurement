import { MigrationInterface, QueryRunner } from "typeorm";
import { defaultEquipmentsSeed } from '../seeds/equipment';

export class Migrations1727314612290 implements MigrationInterface {
    name = 'Migrations1727314612290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "measurements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" double precision NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "equipment_id" character varying(150) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3c0e7812563f27fd68e8271661b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c0e7812563f27fd68e8271661" ON "measurements" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c3288228b9f2d0920d24ade37b" ON "measurements" ("timestamp") `);
        await queryRunner.query(`CREATE TABLE "equipments" ("id" character varying(12) NOT NULL, "name" character varying(150) NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_250348d5d9ae4946bcd634f3e6" ON "equipments" ("id") `);
        await queryRunner.query(`ALTER TABLE "measurements" ADD CONSTRAINT "FK_3f5bccebe12af28d07694ee4548" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(defaultEquipmentsSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurements" DROP CONSTRAINT "FK_3f5bccebe12af28d07694ee4548"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_250348d5d9ae4946bcd634f3e6"`);
        await queryRunner.query(`DROP TABLE "equipments"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c3288228b9f2d0920d24ade37b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c0e7812563f27fd68e8271661"`);
        await queryRunner.query(`DROP TABLE "measurements"`);
    }

}
