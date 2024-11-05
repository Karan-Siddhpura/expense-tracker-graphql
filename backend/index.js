import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import mergedResolvers from "./reslovers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`Server is running at port 4000`);
