import firebase from 'firebase'

var firebaseConfig = {
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default firebase;