import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PostVoteButton from './PostVoteButton';

function PostVoteUp({ upvote, votes, id }: any) {
  return (
    <PostVoteButton
      id={id}
      votes={votes}
      className="upvote"
      onClickHandler={() => upvote(id, votes + 1)}
    />
  );
}

const upvotePost = gql`
  mutation updatePost($id: ID!, $votes: Int) {
    updatePost(id: $id, votes: $votes) {
      id
      __typename
      votes
    }
  }
`;

export default graphql(upvotePost, {
  props: ({ ownProps, mutate }: any) => ({
    upvote: (id: any, votes: any) =>
      mutate({
        variables: { id, votes },
        optimisticResponse: {
          __typename: 'Mutation',
          updatePost: {
            __typename: 'Post',
            id: ownProps.id,
            votes: ownProps.votes + 1
          }
        }
      })
  })
} as any)(PostVoteUp);
