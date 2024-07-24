import { MigrationInterface, QueryRunner } from "typeorm";

export class TbTask1721854008914 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE tb_task(
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                title varchar(255),
                description varchar(1000),
                status varchar(50) NOT NULL DEFAULT 'TO_DO',
                expiration_date timestamptz,
                CONSTRAINT task_pk PRIMARY KEY (id)
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS tb_task;`);
    }
}
