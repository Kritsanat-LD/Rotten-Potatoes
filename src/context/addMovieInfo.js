import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

const addMovieInfoDB = async (data) => {
    const newDocRef = await addDoc(collection(db, 'Movie'), data);
    console.log('Data added to Firestore successfully with ID:', newDocRef.id);
  };

  export { addMovieInfoDB };