import React, { useState, useEffect } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { Select, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onPostInsertRequest } from '../../../shared/redux/actions/post.action';
import { VISIBILITY_FILTER } from '../../../shared/enums/post.enums';
import { _C } from '../../../shared/utils/constants';
import { WithNamespaces, withNamespaces } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import './css/CreateNewPost.scss';

interface CreateNewPostProps {
  onPostInsertRequest: Function;
}

const { Option } = Select;
let ReactQuill: any;

const CreateNewPostComponent: React.SFC<
  CreateNewPostProps & WithNamespaces
> = props => {
  const { t } = props;
  const [newContent, setNewContent] = useState('');
  const [visibility, setVisibility] = useState(VISIBILITY_FILTER.PUBLIC);
  const [quillActive, setQuillActive] = useState(false);

  useEffect(() => {
    if (!!_C.IS_BROWSER) {
      ReactQuill = require('react-quill');
      setQuillActive(true);
    }
  }, []);

  const handleSubmit = () => {
    props.onPostInsertRequest({
      visibility,
      content: newContent
    });

    setVisibility(VISIBILITY_FILTER.PUBLIC);
    setNewContent('');
  };

  return (
    <div className="create-new-post-component">
      {!!quillActive && ReactQuill ? (
        <ReactQuill
          className="np-txtArea"
          onChange={(value: any) => {
            setNewContent(value);
          }}
          value={newContent}
          theme="snow"
          modules={{
            toolbar: [[{ align: [] }, 'image']]
          }}
          placeholder={t('create.txtArea.dynamic_placeholder')}
        />
      ) : (
        <TextArea
          className="np-txtArea"
          rows={4}
          value={newContent}
          placeholder={t('create.txtArea.placeholder')}
          onChange={e => {
            setNewContent(e.target.value);
          }}
        />
      )}

      <div className="options">
        <div>
          <Select
            defaultValue={visibility}
            onChange={newValue => setVisibility(newValue)}
          >
            <Option value={VISIBILITY_FILTER.PUBLIC}>
              {t('create.visibility.options.public')}
            </Option>
            <Option value={VISIBILITY_FILTER.FRIENDS}>
              {t('create.visibility.options.friends')}
            </Option>
          </Select>
        </div>
        <div>
          <Button
            type="primary"
            disabled={newContent === ''}
            onClick={() => handleSubmit()}
          >
            {t('create.submit')}
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ onPostInsertRequest }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(withNamespaces('wall')(CreateNewPostComponent));
