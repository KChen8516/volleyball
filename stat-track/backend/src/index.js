const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// use express middleware to handle cookies (JWT)
// cookieParser provides an obj rather than a string to work with
// 1. accept the request
// 2. parse any cookies available
// 3. send the cookie along with request
server.express.use(cookieParser());

// decode the jwt in localstorage so we can get the user id on each request.
server.express.use((req, res, next) => {
  // grab the cookie available by cookieParser
  const { token } = req.cookies;
  // decode the token
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put userId on future requests for access
    req.userId = userId;
  }
  next();
});

// create middleware to populate the user on each request
server.express.use(async (req, res, next) => {
  if (!req.userId) return next();
  const user = db.query.user(
    { where: { id: req.userId } },
    "{id, permissions, email, name}",
  );
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  (deets) => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  },
);
