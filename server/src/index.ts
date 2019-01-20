import * as express from "express";
import * as cors from "cors";
import { ApolloServer } from "apollo-server-express";
require("dotenv").config();
import { users, products } from "./schema";

const app = express();
const usersServer = new ApolloServer({
  typeDefs: users.typeDefs,
  resolvers: users.resolvers
});
const productsServer = new ApolloServer({
  typeDefs: products.typeDefs,
  resolvers: products.resolvers
});

app.use(cors());

usersServer.applyMiddleware({ app, path: "/users" });
productsServer.applyMiddleware({ app, path: "/products" });

const PORT = 9000;

app.listen(PORT, () => {
  console.log(`Product Crawler GraphQL server running on port ${PORT}.`);
});
