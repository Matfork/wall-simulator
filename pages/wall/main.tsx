import React from 'react';
import redirect from '../../src/app/shared/utils/redirect';
import CreateNewPost from '../../src/app/modules/components/wall/CreateNewPost.component';
import PostList from '../../src/app/modules/components/wall/PostList.component';
import Head from '../../src/app/shared/components/NextHead/Head';
import { AuthService } from '../../src/app/shared/services/auth.service';
import { _C } from '../../src/app/shared/utils/constants';
import { withLayout } from '../../src/app/shared/hoc/withLayout';
import { connect } from 'react-redux';
import { onPostLoadRequest } from '../../src/app/shared/redux/actions/post.action';
import { bindActionCreators } from 'redux';
import './css/main.scss';

class c extends React.Component {
  render() {
    return (
      <div className="wall-page">
        <div>
          <h1>Muro Social</h1>
        </div>
        <CreateNewPost />
        <PostList />
      </div>
    );
  }
}
const WallMain = withLayout(c);

class SWallMain extends React.Component {
  static async getInitialProps(ctx: any) {
    if (!AuthService.isAuth(ctx)) {
      redirect('/../auth/login', ctx);
    }

    if (!ctx.store.getState().placeholderData) {
      ctx.store.dispatch(onPostLoadRequest(ctx));
    }

    return {
      namespacesRequired: ['wall']
    };
  }

  render() {
    return (
      <React.Fragment>
        <Head title="Wall" />
        <style global jsx>{`
          body {
            background: #e9ebee;
          }
        `}</style>
        <WallMain />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ onPostLoadRequest }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(SWallMain);
