import Router from 'next/router';
import { _C } from './constants';

export default (target: string, ctx: any = null) => {
  if (!_C.IS_BROWSER && ctx && ctx.res) {
    // console.log('server', target);
    // server
    // 303: "See other"
    ctx.res.writeHead(303, { Location: target });
    ctx.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target);
  }
};
