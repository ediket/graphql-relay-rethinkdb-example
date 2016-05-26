import { GraphQLSchema } from 'graphql';
import query from './queries';
import mutation from './mutations';

const schema = new GraphQLSchema({
  query,
  mutation,
});

export default schema;
