/**
 * Use GraphQL Yoga that extends express and apollo-server to connect
 * to Prisma
 */
const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const database = require("./db");

const createServer = () => {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query,
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    // provides the db context on each request?
    context: (req) => ({ ...req, database }),
  });
};

module.exports = createServer;
