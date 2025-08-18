const { PrismaClient } = require('@prisma/client');

declare global {
  var prisma: undefined | InstanceType<typeof PrismaClient>;
}

let prisma;

if (!global.prisma) {
  prisma = new PrismaClient();
  if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
} else {
  prisma = global.prisma;
}

module.exports = prisma;
