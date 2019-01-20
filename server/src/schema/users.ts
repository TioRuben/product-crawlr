import { users } from "../database";
import { gql } from "apollo-server-core";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    pw_hash: String!
  }

  type Query {
    allUsers: [User!]!
  }
`;

const resolvers = {
  Query: {
    allUsers: () => users.getAllUsers()
  }
};

export default { typeDefs, resolvers };
