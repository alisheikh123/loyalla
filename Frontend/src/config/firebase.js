import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6zazSIloPqQZMOMM5WE8IbVojzwCeq4A",
  authDomain: "trakker-71037.firebaseapp.com",
  databaseURL: "https://trakker-71037-default-rtdb.firebaseio.com",
  projectId: "trakker-71037",
  storageBucket: "trakker-71037.appspot.com",
  messagingSenderId: "809816818108",
  appId: "1:809816818108:web:997227ae327f4cb79d2bb9",
  measurementId: "G-1G88HQE6MB"
};

const app = initializeApp(firebaseConfig);

export default app;