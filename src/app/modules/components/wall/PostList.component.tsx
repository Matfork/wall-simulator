import React, { SyntheticEvent, useState } from 'react';
import PostComponent from './Post/Post.component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IPostState } from '../../../shared/redux/reducers/post.reducer';
import { IPost } from '../../../shared/interfaces/post.model';
import _ from 'lodash';
import { VISIBILITY_FILTER } from '../../../shared/enums/post.enums';
import './css/PostList.scss';

interface PostListProps {
  postList: IPostState;
}

const PostListComponent: React.SFC<PostListProps> = props => {
  const { data, loading } = props.postList;
  const [visibility, setVisibility] = useState(VISIBILITY_FILTER.ALL);

  const filterBy = (e: SyntheticEvent, cas: VISIBILITY_FILTER) => {
    e.preventDefault();
    setVisibility(cas);
  };

  const filteredData = _.filter(data, (post: IPost) => {
    return (
      visibility === VISIBILITY_FILTER.ALL || post.visibility === visibility
    );
  });

  return !loading ? (
    <div className="post-list-component">
      <div className="filters">
        <span>Filtrar por:</span>
        <a href="#" onClick={e => filterBy(e, VISIBILITY_FILTER.ALL)}>
          Todos
        </a>
        <a href="#" onClick={e => filterBy(e, VISIBILITY_FILTER.PUBLIC)}>
          Publico
        </a>
        <a href="#" onClick={e => filterBy(e, VISIBILITY_FILTER.FRIENDS)}>
          Amigos
        </a>
      </div>
      <div className="list">
        {filteredData && filteredData.length !== 0 ? (
          filteredData.map((post, i: number) => (
            <PostComponent key={i} post={post} />
          ))
        ) : (
          <div className="empty">
            Aun no hay posts relacionados a {visibility}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    postList: state.postList as IPostState
  };
};
const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListComponent);
