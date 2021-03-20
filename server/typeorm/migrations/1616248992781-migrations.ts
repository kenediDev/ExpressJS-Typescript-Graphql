import {MigrationInterface, QueryRunner} from "typeorm";

export class migrations1616248992781 implements MigrationInterface {
    name = 'migrations1616248992781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_93e37a8413a5745a9b52bc3c0c1`");
        await queryRunner.query("DROP INDEX `IDX_41704a57004fc60242d7996bd8` ON `accounts`");
        await queryRunner.query("DROP INDEX `REL_93e37a8413a5745a9b52bc3c0c` ON `user`");
        await queryRunner.query("CREATE TABLE `location` (`id` varchar(36) NOT NULL, `country` varchar(255) NULL, `province` varchar(255) NULL, `city` varchar(255) NULL, `address` text NULL, `createAt` timestamp NULL, `updateAt` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `accounts` DROP COLUMN `phone_verify`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `locationId`");
        await queryRunner.query("ALTER TABLE `accounts` ADD `phone_verified_at` timestamp NULL");
        await queryRunner.query("ALTER TABLE `accounts` ADD `locationId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `accounts` ADD UNIQUE INDEX `IDX_7bda73c73a959f34539273d02e` (`locationId`)");
        await queryRunner.query("ALTER TABLE `user` ADD `password` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `accounts` CHANGE `createAt` `createAt` timestamp NULL");
        await queryRunner.query("ALTER TABLE `accounts` CHANGE `updateAt` `updateAt` timestamp NULL ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `user` CHANGE `email` `email` varchar(225) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `createAt` `createAt` timestamp NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_7bda73c73a959f34539273d02e` ON `accounts` (`locationId`)");
        await queryRunner.query("ALTER TABLE `accounts` ADD CONSTRAINT `FK_7bda73c73a959f34539273d02ee` FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `accounts` DROP FOREIGN KEY `FK_7bda73c73a959f34539273d02ee`");
        await queryRunner.query("DROP INDEX `REL_7bda73c73a959f34539273d02e` ON `accounts`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `createAt` `createAt` timestamp NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `email` `email` varchar(225) NULL");
        await queryRunner.query("ALTER TABLE `accounts` CHANGE `updateAt` `updateAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `accounts` CHANGE `createAt` `createAt` timestamp NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `password`");
        await queryRunner.query("ALTER TABLE `accounts` DROP INDEX `IDX_7bda73c73a959f34539273d02e`");
        await queryRunner.query("ALTER TABLE `accounts` DROP COLUMN `locationId`");
        await queryRunner.query("ALTER TABLE `accounts` DROP COLUMN `phone_verified_at`");
        await queryRunner.query("ALTER TABLE `user` ADD `locationId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `accounts` ADD `phone_verify` timestamp NULL");
        await queryRunner.query("DROP TABLE `location`");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_93e37a8413a5745a9b52bc3c0c` ON `user` (`locationId`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_41704a57004fc60242d7996bd8` ON `accounts` (`phone`)");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_93e37a8413a5745a9b52bc3c0c1` FOREIGN KEY (`locationId`) REFERENCES `country`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
