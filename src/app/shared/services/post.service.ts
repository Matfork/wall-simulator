import firebase from 'firebase/app';
import { _C } from '../utils/constants';
import { FirebaseService } from './firebase.service';
import { IPost } from '../interfaces/post.model';
import moment from 'moment';
import jsCookie from 'js-cookie';
import cookie from 'cookie';
import 'firebase/firestore';

FirebaseService.initialize();
const db = firebase.firestore().collection('posts');

export class PostService {
  public static get = async (ctx: any): Promise<any> => {
    // Getting userId based on request coming from server or client
    const userId = !_C.IS_BROWSER
      ? cookie.parse(ctx.req.headers.cookie)[_C.TOKEN_KEY]
      : jsCookie.get(_C.TOKEN_KEY);

    if (!userId) {
      return [];
    }

    const res = await db.where('userId', '==', userId).get();
    const posts: IPost[] = [];
    res.forEach(doc => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        content: data.content,
        visibility: data.visibility,
        userId: data.userId,
        created_at: data.created_at,
        updated_at: data.updated_at
      });
    });

    return posts;
  };

  public static insert = async (data: any) => {
    const toBeInserted = {
      userId: jsCookie.get(_C.TOKEN_KEY),
      content: data.content,
      visibility: data.visibility,
      created_at: moment().toDate(),
      updated_at: moment().toDate()
    };

    try {
      const docRef = db.doc();
      await docRef.set(toBeInserted);

      return {
        ...toBeInserted,
        id: docRef.id
      };
    } catch ($e) {
      return { error: $e };
    }

    // const inserted = await postsRef.push(data);
    // return inserted;
  };

  public static update = async (post: IPost): Promise<any> => {
    post.updated_at = moment().toDate();
    try {
      db.doc(post.id).update({
        content: post.content,
        updated_at: post.updated_at
      });

      return post;
    } catch ($e) {
      return { error: $e };
    }

    // const postRef = postsRef.child(post.id);
    // const updated = await postRef.update(post);
    // return updated;
  };

  public static delete = async (postId: string) => {
    try {
      db.doc(postId).delete();
      return postId;
    } catch ($e) {
      return { error: $e };
    }

    // const postToRemove = postsRef.child(postId);
    // const removed = await postToRemove.remove();
    // return removed;
  };
}
