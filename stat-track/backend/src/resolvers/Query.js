/**
 * Build resolvers to help match to existing Queries
 * parent = base schema
 * args = arguments
 * context = server context initialized for GraphQLServer
 * info = info about the Query
 */
const { forwardTo } = require("prisma-binding");
const Query = {
  // creates a players Query
  async players(parent, args, context, info) {
    const players = await context.database.query.players();
    return players;
  },
  // shortcut for prisma
  player: forwardTo("database"),
};

module.exports = Query;
