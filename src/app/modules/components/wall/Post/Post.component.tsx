import React, { useState } from 'react';
import { IPost } from '../../../../shared/interfaces/post.model';
import EditPostComponent from './EditPost.component';
import { Popconfirm } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onPostDeleteRequest } from '../../../../shared/redux/actions/post.action';
import 'react-quill/dist/quill.snow.css';
import './css/Post.scss';

interface PostProps {
  post: IPost;
  onPostDeleteRequest: Function;
}

const PostComponent: React.SFC<PostProps> = props => {
  const { post } = props;
  const [editMode, setEditMode] = useState(false);

  const handleDeletePost = () => {
    props.onPostDeleteRequest(post.id);
  };

  return (
    <div className="post-component">
      {!editMode ? (
        <React.Fragment>
          {/* <div className="p-content">{post.content}</div> */}
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="p-content ql-editor"
          />
          <div className="p-options">
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setEditMode(true);
              }}
            >
              Editar
            </a>
            <Popconfirm
              title="Estas seguro?"
              onConfirm={() => handleDeletePost()}
              okText="Si"
              cancelText="No"
              placement="topRight"
              icon={null}
            >
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                }}
              >
                Eliminar
              </a>
            </Popconfirm>
            ,
          </div>
        </React.Fragment>
      ) : (
        <EditPostComponent
          post={post}
          onCancelEditMode={() => setEditMode(false)}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ onPostDeleteRequest }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(PostComponent);
