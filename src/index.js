import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';

const server = express();

server.use('/graphql',
  graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true,
  })
);

export default server;
