const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const env = require('./env');

// * we've centralized env acces in env.js 
const adapter = new PrismaPg({
    connectionString : env.databaseUrl
});

const prisma = new PrismaClient({
    adapter
});

module.exports = prisma;


/*  
    CONNECTION POOL EXHAUSTION 
    create 1 prisma client and export it
    solves the connection pool Exhaustion problem reduces database overwhelming
    const prisma = new PrismaClient()
*/