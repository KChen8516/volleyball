const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/**
 * You can reference ../generated/prisma.graphql for DB options
 */
const Mutations = {
  async createPlayer(parent, args, context, info) {
    // restrict player creation to registered users
    if (!context.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    // create a player in the Prisma DB
    const player = await context.database.mutation.createPlayer(
      {
        data: {
          ...args,
          team: {
            connect: {
              // teamId passed by AddPlayer component
              id: args.team,
            },
          },
          // this is how you create a relationship between
          // user and player
          user: {
            connect: {
              id: context.request.userId,
            },
          },
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
    // restrict team creation to registered users
    if (!context.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    const team = await context.database.mutation.createTeam(
      {
        data: {
          ...args,
          // this is how you create a relationship between
          // user and player
          user: {
            connect: {
              id: context.request.userId,
            },
          },
        },
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
  async signin(parent, { email, password }, context, info) {
    // 1. check if there's a user with that email
    const user = await context.database.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for ${email}`);
    }
    // 2. check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password!");
    }
    // 3. generate the jwt token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    console.log("token created >>>", token);
    // 4. set the cookie with the token
    context.response.cookie("token", token, {
      httpOnly: true, // prevent JS access to the token
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    });

    if (context.request.headers["user-agent"].indexOf("iPad") > -1) {
      console.log("MOBILE DEVICE DETECTED");
      console.log("CONTEXT RESPONSE OBJECT >>>", context.response);
    }
    // 5. return the user
    return user;
  },
  async signout(parent, args, context, info) {
    // user clearCookie from cookieParser
    context.response.clearCookie("token");
    return { message: "You've been successfully sign out!" };
  },
  async createGame(parent, args, context, info) {
    let payload = { data: { ...args, stats: [] } };

    // optionally include a user if one is logged in
    if (context.request.userId) {
      payload.data.user = { connect: { id: context.request.userId } };
    }

    const game = await context.database.mutation.createGame(payload, info);

    // optionally include a user if one is logged in
    // if (context.request.userId) {
    //   game.data["user"] = { connect: { id: context.request.userId } };
    // }

    return game;
  },
  updateGame(parent, args, context, info) {
    // make a shallow copy
    const updates = { ...args };
    // remove the id from updates
    delete updates.id;

    // TODO: fix the relationship between stats and games so that both can be fetched indepdently

    // run the generated update method
    return context.database.mutation.updateGame(
      {
        where: {
          id: args.id,
        },
        data: {
          stats: {
            create: updates.stats,
          },
        },
      },
      info,
    );
  },
};

module.exports = Mutations;
