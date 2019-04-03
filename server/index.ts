require('dotenv').config();
import express from 'express';
import admin from 'firebase-admin';
import next from 'next';
import bodyParser from 'body-parser';
import session from 'express-session';
import serverCreds from '../config/credentials/server';
import nextI18next from '../src/i18n';

const nextI18NextMiddleware = require('next-i18next/middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const port = !!dev ? 3000 : parseInt((process as any).env.PORT, 10) || 5000;
const host = !!dev ? 'localhost' : '0.0.0.0';
const handle = app.getRequestHandler();

let firebase: any = null;
//const FileStore = require('session-file-store')(session);

try {
  firebase = admin.initializeApp(
    {
      credential: admin.credential.cert(serverCreds as any),
      databaseURL: 'https://wall-simulator.firebaseio.com'
    },
    'server'
  );

  app.prepare().then(() => {
    const server = express();

    server.use(nextI18NextMiddleware(nextI18next));
    server.use(bodyParser.json());
    server.use(
      session({
        secret: 'willneveknow',
        saveUninitialized: true,
        resave: false,
        rolling: true,
        cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 }
        // store: new FileStore({ path: '/tmp/sessions', secret: 'geheimnis' }),
      })
    );

    server.use((req: any, _: any, next: any) => {
      req.firebaseServer = firebase;
      next();
    });

    server.get('/login/:id?', (req, res) => {
      const actualPage = '/auth/login';
      const queryParams = { ...req.params, ...req.query }; //e.g. { title: req.params.id}
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/wall', (req, res) => {
      const actualPage = '/wall/main';
      const queryParams = {};
      app.render(req, res, actualPage, queryParams);
    });

    // server.post('/api/login', (req: any, res: any) => {
    //   if (!req.body) return res.sendStatus(400);

    //   const token = req.body.token;
    //   firebase
    //     .auth()
    //     .verifyIdToken(token)
    //     .then((decodedToken: any) => {
    //       req.session.decodedToken = decodedToken;
    //       return decodedToken;
    //     })
    //     .then((decodedToken: any) => res.json({ status: true, decodedToken }))
    //     .catch((error: any) => res.json({ error }));
    // });

    // server.post('/api/logout', (req: any, res: any) => {
    //   req.session.decodedToken = null;
    //   res.json({ status: true });
    // });

    server.get('*', (req: any, res: any) => {
      return handle(req, res);
    });

    server.listen(port, host, (err: any) => {
      if (err) throw err;
      console.log(`> Ready on http://${host}:${port}`);
    });
  });
} catch ($e) {
  console.log($e);
}
