import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import * as tq from 'type-graphql';

import { resolvers } from '@generated/type-graphql';

import { context } from './context';
import TransactionCountResolver from './transactions-count-resolver';

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers:  resolvers.concat(TransactionCountResolver),
    validate: false
  })

  new ApolloServer({ schema, context: context }).listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000`,
    ),
  )
}

app()