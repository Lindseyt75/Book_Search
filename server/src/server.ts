import express from "express";
import path from "node:path";
import type { Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import dotenv from "dotenv";
import { typeDefs, resolvers } from "./schemas/index.js";
import db from "./config/connection.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

// const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

// Create a Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

//Create an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  db;

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  if (process.env.NODE_ENV !== "development") {
    app.use(express.static(path.join(__dirname, "../../client/dist")));

    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();