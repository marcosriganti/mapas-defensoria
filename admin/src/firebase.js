import firebase from "firebase";
import "firebase/database";
import "firebase/auth";

import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
} from "./firebase_config";

export const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
};
export const firebase_app = firebase.initializeApp(firebaseConfig);

// const serviceAccount = {
//   type: process.env.REACT_APP_ADMIN_TYPE,
//   project_id: REACT_APP_PROJECT_ID,
//   private_key_id: process.env.REACT_APP_ADMIN_PRIVATE_KEY_ID,
//   private_key: process.env.REACT_APP_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
//   client_email: process.env.REACT_APP_ADMIN_CLIENT_EMAIL,
//   client_id: process.env.REACT_APP_ADMIN_CLIENT_ID,
//   auth_uri: process.env.REACT_APP_ADMIN_AUTH_URI,
//   token_uri: process.env.REACT_APP_ADMIN_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.REACT_APP_ADMIN_PROVIDER_URL,
//   client_x509_cert_url: process.env.REACT_APP_ADMIN_CLIENT_URL,
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
