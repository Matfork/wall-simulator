import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { allPosts, allPostsQueryVars } from './PostList';

function Submit({ createPost }: any) {
  function handleSubmit(event: any) {
    event.preventDefault();

    const form = event.target;

    const formData = new (window as any).FormData(form);
    createPost(formData.get('title'), formData.get('url'));

    form.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit</h1>
      <input placeholder="title" name="title" type="text" required />
      <input placeholder="url" name="url" type="url" required />
      <button type="submit">Submit</button>
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  );
}

const createPost = gql`
  mutation createPost($title: String!, $url: String!) {
    createPost(title: $title, url: $url) {
      id
      title
      votes
      url
      createdAt
    }
  }
`;

export default graphql(createPost, {
  props: ({ mutate }: any) => ({
    createPost: (title: any, url: any) =>
      mutate({
        variables: { title, url },
        update: (proxy: any, { data: { createPost } }: any) => {
          const data = proxy.readQuery({
            query: allPosts,
            variables: allPostsQueryVars
          });
          proxy.writeQuery({
            query: allPosts,
            data: {
              ...data,
              allPosts: [createPost, ...data.allPosts]
            },
            variables: allPostsQueryVars
          });
        }
      })
  })
})(Submit);
