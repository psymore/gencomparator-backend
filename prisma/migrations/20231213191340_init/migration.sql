-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_keys" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_template" (
    "id" TEXT NOT NULL,
    "prompt_template_id" INTEGER,
    "title" TEXT,
    "textfields" TEXT,
    "CSS_frameworks" TEXT,
    "text" TEXT NOT NULL,
    "llm_name_id" TEXT NOT NULL,
    "api_key_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompt_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt" (
    "id" TEXT NOT NULL,
    "prompt_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "prompt_template_id" INTEGER,
    "api_key_id" TEXT NOT NULL,
    "status" BOOLEAN,
    "response" TEXT,
    "parameters" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "api_keys_name_key" ON "api_keys"("name");

-- CreateIndex
CREATE UNIQUE INDEX "api_keys_key_key" ON "api_keys"("key");

-- AddForeignKey
ALTER TABLE "prompt_template" ADD CONSTRAINT "prompt_template_llm_name_id_fkey" FOREIGN KEY ("llm_name_id") REFERENCES "api_keys"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt" ADD CONSTRAINT "prompt_api_key_id_fkey" FOREIGN KEY ("api_key_id") REFERENCES "api_keys"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
