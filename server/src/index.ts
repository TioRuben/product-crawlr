import express from "express";
import cors from "cors";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";
require("dotenv").config();
import { typeDefs, resolvers } from "./schema";
import { userLogin, userRegister, userLogout } from "./user-middleware";

const app = express();

const shopServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: ({ req }) => {
    return { user: req.session.user };
  }
});

app.use(cors());
app.use(
  session({
    secret: "product-crawlr",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use("/user/login", express.json(), userLogin);
app.use("/user/register", express.json(), userRegister);
app.use("/user/logout", express.json(), userLogout);

shopServer.applyMiddleware({ app, path: "/shop" });

const PORT = 9000;

app.listen(PORT, () => {
  console.log(`Product Crawler server running on port ${PORT}.`);
});
