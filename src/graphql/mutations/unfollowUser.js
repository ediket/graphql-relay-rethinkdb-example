import { GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import userTable from '../../tables/userTable';
import userType from '../types/userType';
import globalIdType from '../types/globalIdType';
import { pool } from '../../helpers/connection';

export default mutationWithClientMutationId({
  name: 'UnfollowUser',
  outputFields: {
    follower: { type: userType },
    followee: { type: userType },
  },
  inputFields: {
    followerId: { type: new GraphQLNonNull(globalIdType) },
    followeeId: { type: new GraphQLNonNull(globalIdType) },
  },
  async mutateAndGetPayload(args) {
    const { followeeId, followerId } = args;

    await pool.run(userTable.removeRelation('following', followeeId, followerId));

    return {
      follower: await pool.run(userTable.get(followerId)),
      followee: await pool.run(userTable.get(followeeId)),
    };
  },
});
