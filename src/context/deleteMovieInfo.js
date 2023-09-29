import { db } from '../firebase';
import { deleteDoc , doc} from 'firebase/firestore';

const deleteMovieInfoDB = async (data) => {
    try{
        await deleteDoc(doc(db, "Movies", data));
        console.log('Movie info added to Firestore successfully');
    } catch (error){
        console.error('Error adding movie info to Firestore:', error);
    }
  };

  export { deleteMovieInfoDB };