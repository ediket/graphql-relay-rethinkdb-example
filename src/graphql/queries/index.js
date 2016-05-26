import { GraphQLObjectType } from 'graphql';
import { nodeField } from '../nodeDefinitions';
import { userConnectionField } from '../types/userType';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    users: userConnectionField,
  }),
});

export default queryType;
