const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  async signup(parent, args, context, info) {
    // enforce a consistently stored case
    args.email = args.email.toLowerCase();
    // one-way hash the password
    // 1. accept the password and create a hash with it
    // (password, salt length || your own salt)
    const hash = await bcrypt.hash(args.password, 10);

    // create the user in the DB
    const user = await context.database.mutation.createUser(
      {
        data: {
          ...args,
          password: hash,
          permissions: { set: [ "USER" ] },
        },
      },
      info,
    );
    // create the JWT for the new user
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    context.response.cookie("token", token, {
      httpOnly: true, // prevent JS access to the token
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    });

    return user;
  },
};

module.exports = Mutations;
