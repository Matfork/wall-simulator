import React, { useState, useEffect } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { Button } from 'antd';
import { IPost } from '../../../../shared/interfaces/post.model';
import { onPostUpdateRequest } from '../../../../shared/redux/actions/post.action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WithNamespaces, withNamespaces } from 'react-i18next';
import { _C } from '../../../../shared/utils/constants';
import 'react-quill/dist/quill.snow.css';
import './css/EditPost.scss';

interface EditPostProps {
  post: IPost;
  onPostUpdateRequest: Function;
  onCancelEditMode: () => void;
}

let ReactQuill: any;

const EditPostComponent: React.SFC<EditPostProps & WithNamespaces> = props => {
  const { post, onCancelEditMode, t } = props;
  const [content, setContent] = useState(post.content);
  const [quillActive, setQuillActive] = useState(false);

  useEffect(() => {
    if (!!_C.IS_BROWSER) {
      ReactQuill = require('react-quill');
      setQuillActive(true);
    }
  }, []);

  const handleSubmit = () => {
    props.onPostUpdateRequest({
      ...post,
      content
    });

    onCancelEditMode();
  };

  return (
    <div className="edit-post-component">
      {!!quillActive && ReactQuill ? (
        <ReactQuill
          className="np-txtArea"
          onChange={(value: any) => {
            setContent(value);
          }}
          value={content}
          theme="snow"
          modules={{
            toolbar: [[{ align: [] }, 'image']]
          }}
          placeholder={t('edit.txtArea.dynamic_placeholder')}
        />
      ) : (
        <TextArea
          className="np-txtArea"
          rows={4}
          value={content}
          placeholder={'edit.txtArea.placeholder'}
          onChange={e => {
            setContent(e.target.value);
          }}
        />
      )}

      <div className="options">
        <div>
          <Button type="ghost" onClick={() => onCancelEditMode()}>
            {t('edit.cancel')}
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            disabled={content === '' || content === post.content}
            onClick={() => handleSubmit()}
          >
            {t('edit.submit')}
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
)(withNamespaces('wall')(EditPostComponent));
