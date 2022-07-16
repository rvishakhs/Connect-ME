import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA4w5Ikzf7LUaiPBgskhyUFqVSPGowHUYA",
    authDomain: "facebook-messenger-clone-72492.firebaseapp.com",
    projectId: "facebook-messenger-clone-72492",
    storageBucket: "facebook-messenger-clone-72492.appspot.com",
    messagingSenderId: "237871026805",
    appId: "1:237871026805:web:34274807a007e027dcde3c"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;