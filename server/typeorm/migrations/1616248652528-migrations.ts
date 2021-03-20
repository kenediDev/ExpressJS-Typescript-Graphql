import {MigrationInterface, QueryRunner} from "typeorm";

export class migrations1616248652528 implements MigrationInterface {
    name = 'migrations1616248652528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `accounts_entity` (`id` varchar(36) NOT NULL, `avatar` binary NULL, `pin` tinyint NULL, `phone` varchar(225) NULL, `phone_verified_at` timestamp NULL, `createAt` timestamp NULL, `updateAt` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_entity` (`id` varchar(36) NOT NULL, `username` varchar(225) NOT NULL, `email` varchar(225) NOT NULL, `first_name` varchar(225) NULL, `last_name` varchar(225) NULL, `createAt` timestamp NULL, `updateAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP, `password` varchar(255) NOT NULL, `accountsId` varchar(36) NULL, UNIQUE INDEX `IDX_9b998bada7cff93fcb953b0c37` (`username`), UNIQUE INDEX `IDX_415c35b9b3b6fe45a3b065030f` (`email`), UNIQUE INDEX `REL_98d1e2a54cb4f9529404b297de` (`accountsId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_entity` ADD CONSTRAINT `FK_98d1e2a54cb4f9529404b297de3` FOREIGN KEY (`accountsId`) REFERENCES `accounts_entity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_entity` DROP FOREIGN KEY `FK_98d1e2a54cb4f9529404b297de3`");
        await queryRunner.query("DROP INDEX `REL_98d1e2a54cb4f9529404b297de` ON `user_entity`");
        await queryRunner.query("DROP INDEX `IDX_415c35b9b3b6fe45a3b065030f` ON `user_entity`");
        await queryRunner.query("DROP INDEX `IDX_9b998bada7cff93fcb953b0c37` ON `user_entity`");
        await queryRunner.query("DROP TABLE `user_entity`");
        await queryRunner.query("DROP TABLE `accounts_entity`");
    }

}
