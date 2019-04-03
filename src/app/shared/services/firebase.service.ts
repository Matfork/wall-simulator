import firebase from 'firebase/app';
import clientCredentials from '../../../../config/credentials/client';
import { _C } from '../utils/constants';

export class FirebaseService {
  public static initialize = async (): Promise<any> => {
    if (!firebase.apps.length) {
      return await firebase.initializeApp(clientCredentials);
    }
  };
}
