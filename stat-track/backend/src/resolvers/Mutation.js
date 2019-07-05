/**
 * You can reference ../generated/prisma.graphql for DB options
 */
const Mutations = {
  async createPlayer(parent, args, context, info) {
    // create a player in the Prisma DB
    const player = await context.database.mutation.createPlayer(
      {
        data: {
          ...args,
        },
      },
      // informs what to return
      info,
    );

    return player;
  },
  updatePlayer(parent, args, context, info) {
    // make a shallow copy
    const updates = { ...args };
    // remove the id from updates
    delete updates.id;
    // run the generated update method
    return context.database.mutation.updatePlayer(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info,
    );
  },
  async deletePlayer(parent, args, context, info) {
    const where = { id: args.id };
    // find the item
    const item = await context.database.query.player(
      { where },
      `{ id firstName lastName}`,
    );
    // TODO: check if they have perms
    // delete it
    return context.database.mutation.deletePlayer({ where }, info);
  },
  async createTeam(parent, args, context, info) {
    const team = await context.database.mutation.createTeam(
      {
        data: { ...args },
      },
      info,
    );
    return team;
  },
};

module.exports = Mutations;
