import { products, wishlist } from "../database";
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
    filteredProducts(
      filter: String
      orderBy: String
      asc: Boolean
      offset: Int
      limit: Int
    ): [Product!]!

    userWishList: [Product!]!

    allUsers: [User!]!
  }
`;

export const resolvers = {
  Query: {
    filteredProducts: (parent, args, context, info) =>
      products.getProducts(
        args.filter,
        args.orderBy,
        args.asc,
        args.limit,
        args.offset
      ),
    userWishList: (parent, args, context, info) => wishlist.getWishList(1),
    allUsers: (parent, _, context) => {
      console.log(context);
      return users.getAllUsers();
    }
  }
};
