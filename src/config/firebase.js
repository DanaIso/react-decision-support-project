
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyD3lAE9BQx-xqjEDq0fdn00BX_X_UqeNFg",
  authDomain: "infopro-4ef82.firebaseapp.com",
  projectId: "infopro-4ef82",
  storageBucket: "infopro-4ef82.appspot.com",
  messagingSenderId: "473570297293",
  appId: "1:473570297293:web:99f75d79346146f60e7084"
})

export const auth = app.auth()
export const db = app.firestore()
export default app