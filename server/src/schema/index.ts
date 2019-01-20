import { products } from "../database";
import { users } from "../database";
import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Product {
    description: String!
    link: String!
    price: Float!
    vendorId: Int
    imageUrl: String
  }

  type User {
    id: ID!
    name: String!
    pw_hash: String!
  }

  type Query {
    allProducts: [Product!]!
    allUsers: [User!]!
  }
`;

export const resolvers = {
  Query: {
    allProducts: () => products.getAllProducts(),
    allUsers: (parent, _, context) => {
      console.log(context);
      return users.getAllUsers();
    }
  }
};
