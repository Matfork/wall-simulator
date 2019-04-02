import firebase from 'firebase/app';
import { _C } from '../utils/constants';
import jsCookie from 'js-cookie';
import cookie from 'cookie';
import 'firebase/auth';

export class AuthService {
  public static login = async (data: any): Promise<any> => {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password);

    if (result.user) {
      jsCookie.set(_C.TOKEN_KEY, result.user.uid);
    }

    return result;
  };

  public static logout = async (): Promise<any> => {
    const result = await firebase.auth().signOut();
    jsCookie.remove(_C.TOKEN_KEY);
    return result;
  };

  public static isAuth = (ctx: any) => {
    if (!_C.IS_BROWSER && ctx && ctx.req && ctx.req.headers) {
      //for server
      const cookies = ctx.req.headers.cookie;

      if (typeof cookies === 'string') {
        const data = cookie.parse(cookies);
        return data[_C.TOKEN_KEY] ? true : false;
      }
      return false;
    } else {
      //for client
      return jsCookie.get(_C.TOKEN_KEY) ? true : false;
    }
  };
}
