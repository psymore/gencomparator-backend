import { PrismaClient } from "@prisma/client";
import { fieldEncryptionExtension } from "prisma-field-encryption";

const globalClient = new PrismaClient();
const prisma = new PrismaClient();

export const prismaEncrypted = globalClient.$extends(
  fieldEncryptionExtension({
    encryptionKey: process.env.ENCRYPTION_KEY,
  })
);

export default prisma;
