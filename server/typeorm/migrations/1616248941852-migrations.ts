import {MigrationInterface, QueryRunner} from "typeorm";

export class migrations1616248941852 implements MigrationInterface {
    name = 'migrations1616248941852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_41704a57004fc60242d7996bd8` ON `accounts`");
        await queryRunner.query("CREATE TABLE `location` (`id` varchar(36) NOT NULL, `country` varchar(255) NULL, `province` varchar(255) NULL, `city` varchar(255) NULL, `address` text NULL, `createAt` timestamp NULL, `updateAt` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_entity` (`id` varchar(36) NOT NULL, `username` varchar(225) NOT NULL, `email` varchar(225) NOT NULL, `first_name` varchar(225) NULL, `last_name` varchar(225) NULL, `createAt` timestamp NULL, `updateAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP, `password` varchar(255) NOT NULL, `accountsId` varchar(36) NULL, UNIQUE INDEX `IDX_9b998bada7cff93fcb953b0c37` (`username`), UNIQUE INDEX `IDX_415c35b9b3b6fe45a3b065030f` (`email`), UNIQUE INDEX `REL_98d1e2a54cb4f9529404b297de` (`accountsId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `accounts` DROP COLUMN `phone_verify`");
        await queryRunner.query("ALTER TABLE `accounts` ADD `phone_verified_at` timestamp NULL");
        await queryRunner.query("ALTER TABLE `accounts` ADD `locationId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `accounts` ADD UNIQUE INDEX `IDX_7bda73c73a959f34539273d02e` (`locationId`)");
        await queryRunner.query("ALTER TABLE `accounts` CHANGE `createAt` `createAt` timestamp NULL");
        await queryRunner.query("ALTER TABLE `accounts` CHANGE `updateAt` `updateAt` timestamp NULL ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_7bda73c73a959f34539273d02e` ON `accounts` (`locationId`)");
        await queryRunner.query("ALTER TABLE `accounts` ADD CONSTRAINT `FK_7bda73c73a959f34539273d02ee` FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_entity` ADD CONSTRAINT `FK_98d1e2a54cb4f9529404b297de3` FOREIGN KEY (`accountsId`) REFERENCES `accounts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_entity` DROP FOREIGN KEY `FK_98d1e2a54cb4f9529404b297de3`");
        await queryRunner.query("ALTER TABLE `accounts` DROP FOREIGN KEY `FK_7bda73c73a959f34539273d02ee`");
        await queryRunner.query("DROP INDEX `REL_7bda73c73a959f34539273d02e` ON `accounts`");
        await queryRunner.query("ALTER TABLE `accounts` CHANGE `updateAt` `updateAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `accounts` CHANGE `createAt` `createAt` timestamp NOT NULL");
        await queryRunner.query("ALTER TABLE `accounts` DROP INDEX `IDX_7bda73c73a959f34539273d02e`");
        await queryRunner.query("ALTER TABLE `accounts` DROP COLUMN `locationId`");
        await queryRunner.query("ALTER TABLE `accounts` DROP COLUMN `phone_verified_at`");
        await queryRunner.query("ALTER TABLE `accounts` ADD `phone_verify` timestamp NULL");
        await queryRunner.query("DROP INDEX `REL_98d1e2a54cb4f9529404b297de` ON `user_entity`");
        await queryRunner.query("DROP INDEX `IDX_415c35b9b3b6fe45a3b065030f` ON `user_entity`");
        await queryRunner.query("DROP INDEX `IDX_9b998bada7cff93fcb953b0c37` ON `user_entity`");
        await queryRunner.query("DROP TABLE `user_entity`");
        await queryRunner.query("DROP TABLE `location`");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_41704a57004fc60242d7996bd8` ON `accounts` (`phone`)");
    }

}
