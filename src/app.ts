import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import { PlayerResolver } from './modules/player/resolvers';
import { TeamResolver } from './modules/team/resolvers';
import { CompetitionResolver } from './modules/competititon/resolvers';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { NotFoundError, RateLimitExceededError } from './common/handlers';

export const prisma = new PrismaClient();

export async function createApp() {
  const app = express();

  app.use(cors());
  app.use(json());

  const schema = await buildSchema({
    resolvers: [PlayerResolver, CompetitionResolver, TeamResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    formatError: (formattedError, error) => {
      if (
        error instanceof GraphQLError &&
        error.originalError instanceof NotFoundError
      ) {
        return {
          message: error.message,
          extensions: {
            code: 'NOT_FOUND',
          },
        };
      }

      if (
        error instanceof GraphQLError &&
        error.originalError instanceof RateLimitExceededError
      ) {
        return {
          message: 'Rate limit exceeded. Please try again later.',
          extensions: {
            code: 'RATE_LIMIT_EXCEEDED',
          },
        };
      }

      console.error(error);

      return {
        message: 'An unexpected error occurred. Please try again later.',
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      };
    },
  });

  await apolloServer.start();

  app.use('/graphql', expressMiddleware(apolloServer));

  return app;
}
