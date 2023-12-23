-- DropForeignKey
ALTER TABLE "Prompt_template" DROP CONSTRAINT "Prompt_template_user_id_fkey";

-- AlterTable
ALTER TABLE "Prompt_template" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "promptTemplateLoginRegister" SET DEFAULT 'This is a response of random template';

-- AddForeignKey
ALTER TABLE "Prompt_template" ADD CONSTRAINT "Prompt_template_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
