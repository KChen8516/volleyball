const cookieParser = require("cookie-parser");
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
// TODO: use express middleware to populate current user

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
