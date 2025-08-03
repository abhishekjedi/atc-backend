-- CreateTable
CREATE TABLE `Airport` (
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `timezone` VARCHAR(191) NOT NULL,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Runway` (
    `id` VARCHAR(191) NOT NULL,
    `airportCode` VARCHAR(191) NOT NULL,
    `status` ENUM('available', 'maintenance', 'cooling_off') NOT NULL DEFAULT 'available',
    `capacityPerHour` INTEGER NOT NULL,
    `coolOffSeconds` INTEGER NOT NULL,
    `lastResetAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `currentCount` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Flight` (
    `flightId` VARCHAR(191) NOT NULL,
    `airportCode` VARCHAR(191) NOT NULL,
    `origin` VARCHAR(191) NULL,
    `destination` VARCHAR(191) NULL,
    `priority` INTEGER NOT NULL,
    `status` ENUM('normal', 'emergency') NOT NULL,
    `requestedAt` DATETIME(3) NOT NULL,
    `queuePosition` INTEGER NOT NULL,
    `assignedRunwayId` VARCHAR(191) NULL,
    `assignedAt` DATETIME(3) NULL,
    `landedAt` DATETIME(3) NULL,

    PRIMARY KEY (`flightId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flightId` VARCHAR(191) NOT NULL,
    `runwayId` VARCHAR(191) NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Assignment_flightId_key`(`flightId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Runway` ADD CONSTRAINT `Runway_airportCode_fkey` FOREIGN KEY (`airportCode`) REFERENCES `Airport`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_airportCode_fkey` FOREIGN KEY (`airportCode`) REFERENCES `Airport`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_flightId_fkey` FOREIGN KEY (`flightId`) REFERENCES `Flight`(`flightId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_runwayId_fkey` FOREIGN KEY (`runwayId`) REFERENCES `Runway`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
