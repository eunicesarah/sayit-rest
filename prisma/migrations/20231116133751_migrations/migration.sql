-- CreateTable
CREATE TABLE `psikolog` (
    `psikolog_id` INTEGER NOT NULL AUTO_INCREMENT,
    `psikolog_email` VARCHAR(45) NOT NULL,
    `psikolog_name` VARCHAR(45) NOT NULL,
    `psikolog_password` VARCHAR(255) NOT NULL,
    `psikolog_klinik` VARCHAR(45) NULL,
    `psikolog_phone` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`psikolog_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservation` (
    `reservation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `psikolog_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `datetime` DATETIME(0) NOT NULL,

    INDEX `psikolog_id_idx`(`psikolog_id`),
    PRIMARY KEY (`reservation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback` (
    `feedback_id` INTEGER NOT NULL AUTO_INCREMENT,
    `feedback_content` VARCHAR(255) NOT NULL,
    `reservation_id` INTEGER NULL,

    INDEX `reservation_id_idx`(`reservation_id`),
    PRIMARY KEY (`feedback_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reservation` ADD CONSTRAINT `psikolog_id` FOREIGN KEY (`psikolog_id`) REFERENCES `psikolog`(`psikolog_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `reservation_id` FOREIGN KEY (`reservation_id`) REFERENCES `reservation`(`reservation_id`) ON DELETE CASCADE ON UPDATE CASCADE;
