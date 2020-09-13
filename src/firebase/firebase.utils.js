import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD4Y3f067IdDFN3W3u2V5vxdfiz8DT3I6I",
  authDomain: "ecommerce-16abf.firebaseapp.com",
  databaseURL: "https://ecommerce-16abf.firebaseio.com",
  projectId: "ecommerce-16abf",
  storageBucket: "ecommerce-16abf.appspot.com",
  messagingSenderId: "616648685404",
  appId: "1:616648685404:web:b4947230419c93e5363399",
  measurementId: "G-RNJ2Q1F6H6"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
