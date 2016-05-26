import { GraphQLObjectType } from 'graphql';
import createUser from './createUser';
import followUser from './followUser';
import unfollowUser from './unfollowUser';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser,
    followUser,
    unfollowUser,
  }),
});
