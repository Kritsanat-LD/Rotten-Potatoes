import { db } from '../firebase';
import { collection, deleteDoc , doc,  getDocs, query, where} from 'firebase/firestore';

const deleteMovieInfoDB = async (data) => {
    try{
        await deleteCommentOnMovieDelete(data)
        await deleteDoc(doc(db, "Movies", data));
        console.log('Movie info added to Firestore successfully');
    } catch (error){
        console.error('Error adding movie info to Firestore:', error);
    }
  };

const deleteCommentOnMovieDelete = async (data) =>{
    try{
        const querySnapshot = await getDocs(query(collection(db,"comment"),where("movie_id","==",data)))
        querySnapshot.forEach(async (doc)=>{
            await deleteDoc(doc.ref);
        });
        console.log('Comment deleted successfully');
    }catch(error){
        console.error('Error deleting comment:', error);
    }
}

export { deleteMovieInfoDB };