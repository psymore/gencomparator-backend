/*
  Warnings:

  - You are about to drop the column `filledTemplate` on the `prompt_template` table. All the data in the column will be lost.
  - You are about to drop the column `textfield` on the `prompt_template` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `prompt_template` table. All the data in the column will be lost.
  - The `cssFrameworks` column on the `prompt_template` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "prompt_template" DROP COLUMN "filledTemplate",
DROP COLUMN "textfield",
DROP COLUMN "title",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "fields" JSONB,
ADD COLUMN     "isActive" BOOLEAN,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "titleExists" BOOLEAN,
DROP COLUMN "cssFrameworks",
ADD COLUMN     "cssFrameworks" JSONB;
