export default {
  type: 'service_account',
  project_id: process.env.FIREBASE_SERVER_PROJECT_ID,
  private_key_id: process.env.FIREBASE_SERVER_PRIVATE_KEY_ID,
  client_email: process.env.FIREBASE_SERVER_CLIENT_EMAIL,
  private_key: (process.env.FIREBASE_SERVER_PRIVATE_KEY as any).replace(
    /\\n/g,
    '\n'
  ),
  client_id: process.env.FIREBASE_SERVER_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIREBASE_SERVER_CLIENT_X509_CERT_URL
};
