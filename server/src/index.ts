import express from "express";
import cors from "cors";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";
require("dotenv").config();
import { typeDefs, resolvers } from "./schema";

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

shopServer.applyMiddleware({ app, path: "/shop" });

const PORT = 9000;

app.listen(PORT, () => {
  console.log(`Product Crawler GraphQL server running on port ${PORT}.`);
});
