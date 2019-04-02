import React, { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { Select, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onPostInsertRequest } from '../../../shared/redux/actions/post.action';
import { VISIBILITY_FILTER } from '../../../shared/enums/post.enums';
import './css/CreateNewPost.scss';

const { Option } = Select;

interface CreateNewPostProps {
  onPostInsertRequest: Function;
}

const CreateNewPostComponent: React.SFC<CreateNewPostProps> = props => {
  const [newContent, setNewContent] = useState('');
  const [visibility, setVisibility] = useState(VISIBILITY_FILTER.PUBLIC);

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
      <TextArea
        className="np-txtArea"
        rows={4}
        value={newContent}
        placeholder={'¿Qué esta pasando?'}
        onChange={e => {
          setNewContent(e.target.value);
        }}
      />

      <div className="options">
        <div>
          <Select
            defaultValue={visibility}
            onChange={newValue => setVisibility(newValue)}
          >
            <Option value={VISIBILITY_FILTER.PUBLIC}> Publico </Option>
            <Option value={VISIBILITY_FILTER.FRIENDS}> Amigos </Option>
          </Select>
        </div>
        <div>
          <Button
            type="primary"
            disabled={newContent === ''}
            onClick={() => handleSubmit()}
          >
            Publicar
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
)(CreateNewPostComponent);
