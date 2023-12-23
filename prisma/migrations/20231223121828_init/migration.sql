-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "Name" TEXT DEFAULT 'Anonymous',
    "MagicLink" TEXT,
    "MagicLinkExpired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Api_keys" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prompt_template" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT,
    "textfields" TEXT,
    "CSS_frameworks" TEXT,
    "promptTemplateLoginRegister" TEXT NOT NULL DEFAULT 'This is a response {{linkStyle}} template',
    "llm_name_id" TEXT,
    "api_key_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prompt_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "prompt_id" TEXT,
    "template_name" TEXT NOT NULL,
    "pTLoginRegister" TEXT,
    "prompt_template_id" SERIAL NOT NULL,
    "status" BOOLEAN,
    "response" TEXT,
    "parameters" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "api_keysId" TEXT,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Api_keys_name_key" ON "Api_keys"("name");

-- AddForeignKey
ALTER TABLE "Api_keys" ADD CONSTRAINT "Api_keys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt_template" ADD CONSTRAINT "Prompt_template_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt_template" ADD CONSTRAINT "Prompt_template_llm_name_id_fkey" FOREIGN KEY ("llm_name_id") REFERENCES "Api_keys"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
