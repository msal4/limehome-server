import { PrismaClient } from "@prisma/client";

// used for mocking the prisma client for tests.
const prisma = new PrismaClient();

export default prisma;
