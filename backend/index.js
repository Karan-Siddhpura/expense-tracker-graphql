import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import mergedResolvers from "./reslovers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
});

const { url } = await startStandaloneServer(server);

console.log(`Server is ready ${url}`);
