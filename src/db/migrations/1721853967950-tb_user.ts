import { MigrationInterface, QueryRunner } from "typeorm";

export class TbUser1721853967950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`
            CREATE TABLE tb_user (
                id uuid DEFAULT uuid_generate_v4(),
                username varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                CONSTRAINT user_pk PRIMARY KEY (id),
                CONSTRAINT user_username_unique UNIQUE (username)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS tb_user`);
    }
}
