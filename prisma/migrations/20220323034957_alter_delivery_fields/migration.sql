-- AlterTable
ALTER TABLE "deliveries" ALTER COLUMN "id_deliveryman" DROP NOT NULL,
ALTER COLUMN "end_at" DROP NOT NULL,
ALTER COLUMN "end_at" DROP DEFAULT;
