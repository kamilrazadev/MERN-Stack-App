import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDCFJf8VOaAfhWipadix4JBaKhL3UR57_o",
  authDomain: "ecom-store-api-storage.firebaseapp.com",
  projectId: "ecom-store-api-storage",
  storageBucket: "ecom-store-api-storage.appspot.com",
  messagingSenderId: "104867264168",
  appId: "1:104867264168:web:2967fc1a1f567f8c78749d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)