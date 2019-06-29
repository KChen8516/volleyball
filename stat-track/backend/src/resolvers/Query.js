/**
 * Build resolvers to help match to existing Queries
 * parent = base schema
 * args = arguments
 * context = server context initialized for GraphQLServer
 * info = info about the Query
 */
const Query = {
  // creates a players Query
  async players(parent, args, context, info) {
    const players = await context.database.query.players();
    return players;
  },
};

module.exports = Query;
