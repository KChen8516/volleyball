/**
 * Build resolvers to help match to existing Queries
 * parent = base schema
 * args = arguments
 * context = server context initialized for GraphQLServer
 * info = info about the Query
 */
const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  // creates a players Query
  async players(parent, args, context, info) {
    const players = await context.database.query.players({}, info);
    return players;
  },
  // shortcut for prisma
  player: forwardTo("database"),
  me(parent, args, context, info) {
    // check if there's a current userId
    if (!context.request.userId) {
      return null;
    }

    return context.database.query.user({ where: { id: context.request.userId } }, info);
  },
  async teams(parent, args, context, info) {
    const teams = await context.database.query.teams({}, info);
    return teams;
  },
  async users(parent, args, context, info) {
    // check if they are logged in
    if (!context.request.userId) {
      throw new Error("You must be logged in!");
    }
    // 1. check if the user has permissions to query all users
    // pass the user's permissions and an array of permissions
    // needed to pass the test
    hasPermission(context.request.user, [ "ADMIN", "PERMISSIONUPDATE" ]);
    // 2. if they do, query all the users
    return context.database.query.users({}, info);
  },
  team: forwardTo("database"),
  async games(parent, args, context, info) {
    const games = await context.database.query.games({}, info);
    return games;
  },
  game: forwardTo("database"),
  async stats(parent, args, context, info) {
    const stats = await context.database.query.stats({}, info);
    return stats;
  },
};

module.exports = Query;
