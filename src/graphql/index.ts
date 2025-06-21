import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import logger from "../../winston.config.ts";
import dotenv from "dotenv";
import typeDefs from "./typeDefs/index.ts";
import resolvers from "./resolvers/index.ts";
import { makeExecutableSchema } from "@graphql-tools/schema";

const PORT = process.env.PORT ?? 4001; // Setting the port from environment variable or defaulting to 3002

dotenv.config();

// Function to start the server
const startServer = async () => {
  const app = express(); // Creating an instance of an Express application

  // Middleware to parse JSON request bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const rawSchema = makeExecutableSchema({ typeDefs, resolvers });

  // Creating a new Apollo Server instance with type definitions and resolvers
  const server = new ApolloServer({
    schema: rawSchema,
  });

  try {
    await server.start();

    // Setting up the GraphQL endpoint with middleware
    app.use("/graphql", expressMiddleware(server));

    app.listen(PORT, () => {
      logger.common.info(
        `Server is running on http://localhost:${PORT}/graphql`
      );
    });
  } catch (error) {
    logger.common.error("Server startup error:", error); // Logging any errors that occur during server startup
  }
};

// Invoking the function to start the server
startServer();
