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
      info,
    );

    return player;
  },
};

module.exports = Mutations;
