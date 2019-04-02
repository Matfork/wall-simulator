import React, { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { Button } from 'antd';
import { IPost } from '../../../../shared/interfaces/post.model';
import { onPostUpdateRequest } from '../../../../shared/redux/actions/post.action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './css/EditPost.scss';

interface EditPostProps {
  post: IPost;
  onPostUpdateRequest: Function;
  onCancelEditMode: () => void;
}

const EditPostComponent: React.SFC<EditPostProps> = props => {
  const { post, onCancelEditMode } = props;
  const [content, setContent] = useState(post.content);

  const handleSubmit = () => {
    props.onPostUpdateRequest({
      ...post,
      content
    });

    onCancelEditMode();
  };

  return (
    <div className="edit-post-component">
      <TextArea
        className="np-txtArea"
        rows={4}
        value={content}
        placeholder={'Edite su post'}
        onChange={e => {
          setContent(e.target.value);
        }}
      />

      <div className="options">
        <div>
          <Button type="ghost" onClick={() => onCancelEditMode()}>
            Cancelar
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            disabled={content === '' || content === post.content}
            onClick={() => handleSubmit()}
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ onPostUpdateRequest }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(EditPostComponent);
