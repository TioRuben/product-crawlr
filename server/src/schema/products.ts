import { products } from "../database";
import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Product {
    description: String!
    link: String!
    price: Float!
    vendorId: Int
  }

  type Query {
    allProducts: [Product!]!
  }
`;

const resolvers = {
  Query: {
    allProducts: () => products.getAllProducts()
  }
};

export default { typeDefs, resolvers };
