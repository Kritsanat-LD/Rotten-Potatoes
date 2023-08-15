import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

const addMovieInfoDB = async (data) => {
    try{
      const newDocRef = collection(db,'Movies');
      await addDoc(newDocRef,data);
      console.log('Movie info added to Firestore successfully');
    } catch (error){
      console.error('Error adding movie info to Firestore:', error);
    }
  };

  export { addMovieInfoDB };