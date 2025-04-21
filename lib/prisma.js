import { PrismaClient } from '@/lib/generated/prisma';

export const db = globalThis.prisma || new PrismaClient();  

if(process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

// globalThis.prisma : This is a global variable that holds the PrismaClient instance., is 
// reused across multiple requests in development mode to avoid creating too many database connections.
// without this line, a new PrismaClient instance would be created for each request, which can lead to
// performance issues and connection limits being reached in development mode.