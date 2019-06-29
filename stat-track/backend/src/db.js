/**
 * Connect to our Prisma DB so we can query it with JS
 */
const { Prisma } = require("prisma-binding");
const database = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false,
});

module.exports = database;
