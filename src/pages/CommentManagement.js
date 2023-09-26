import React, { useState ,useEffect } from "react";
import { collection, getDocs, doc, getDoc ,orderBy,query} from 'firebase/firestore';
import { db } from '../firebase';

const Comment = () =>{

    const [commentsWithNames, setCommentsWithNames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
          try {
            const commentsQuery = collection(db, 'comment');
            const commentsSnapshot = await getDocs(query(commentsQuery, orderBy('commentDate', 'desc')));
            // getDocs(commentsQuery);
            const commentsData = [];
            for (const commentDoc of commentsSnapshot.docs) {
              const comment = commentDoc.data();
              const userId = comment.user_id;
              const MovieId = comment.movie_id;
    
              // Fetch the user's name based on user_id
              const userDocRef = doc(db, 'user', userId);
              const userDocSnapshot = await getDoc(userDocRef);
              const user = userDocSnapshot.data();

              // Fetch the user's name based on movie_id
              const movieDocRef = doc(db, 'Movies', MovieId);
              const movieDocSnapshot = await getDoc(movieDocRef);
              const movie = movieDocSnapshot.data();
    
              if (user) {
                commentsData.push({
                  comment: comment.comment,
                  userName: user.name,
                  movieName: movie.MovieName,
                });
              }
            }
            setCommentsWithNames(commentsData);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching comments:', error);
            setIsLoading(false);
          }
        };
    
        fetchComments();
      }, []);

    return !isLoading ?(
        <>
        <h1>Comment Management</h1>
      <ul>
        {commentsWithNames.map((e, index) => (
          <li key={index}>
            <p>User Name: {e.userName}</p>
            <p>Movie: {e.movieName}</p>
            <p>Comment: {e.comment}</p>
          </li>
        ))}
      </ul>
        </>
    ): null;
}

export default Comment;