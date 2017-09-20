import firebase from 'firebase'
import config from '../config'

const firebaseConfig = config.firebase;
firebase.initializeApp(firebaseConfig);

export default firebase;
