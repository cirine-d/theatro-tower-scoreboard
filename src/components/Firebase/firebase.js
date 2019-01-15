import app from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCk5agGoyKGCpQOS4TOsFVjYAM4wJr0jLs",
  authDomain: "theatro-tower-scoreboard.firebaseapp.com",
  databaseURL: "https://theatro-tower-scoreboard.firebaseio.com",
  projectId: "theatro-tower-scoreboard",
  storageBucket: "theatro-tower-scoreboard.appspot.com",
  messagingSenderId: "393035898464"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  //*** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
