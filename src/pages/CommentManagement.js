import React, { useState, useEffect } from 'react';
import { collection, getDocs, query ,doc,getDoc,orderBy} from 'firebase/firestore';
import { db } from '../firebase';
import { deleteCommentDB } from '../context/deleteMovieInfo';

const Comment = () => {
  const [commentsWithNames, setCommentsWithNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(''); // State to store the selected movie name
  const [movieNames, setMovieNames] = useState([]); // State to store the list of movie names

  

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        };

        const commentsQuery = collection(db, 'comment');
        const commentsSnapshot = await getDocs(query(commentsQuery, orderBy('commentDate', 'desc')));
        const commentsData = [];
        const movieNamesData = [];

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
          movieNamesData.push(movie.MovieName)

          if (user) {
            commentsData.push({
              id: commentDoc.id,
              comment: comment.comment,
              userName: user.name,
              movieName: movie.MovieName,
              time: Intl.DateTimeFormat('en-US', options).format(comment.commentDate.toDate()),
            });
          }
        }
        setCommentsWithNames(commentsData);
        setMovieNames(movieNamesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setIsLoading(false);
      }
    };
    
    fetchComments();
  }, []);

  const handleDeleteComment = async (commentID) => {
    try {
      await deleteCommentDB(commentID);
      console.log('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
    window.alert('Delete comment successful');
    window.location.reload();
  };

  // Filter comments based on the selected movie
  const filteredComments = commentsWithNames.filter((comment) => {
    return selectedMovie === '' || comment.movieName === selectedMovie;
  });

  return (
    <>
      <h1>Comment Management</h1>
      <label>Select a Movie: </label>
      <select
        value={selectedMovie}
        onChange={(e) => setSelectedMovie(e.target.value)}
      >
        <option value="">All Movies</option>
        {movieNames.map((movieName) => (
          <option key={movieName} value={movieName}>
            {movieName}
          </option>
        ))}
      </select>
      <ul>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {filteredComments.map((e, index) => (
              <div key={index}>
                <p>User Name: {e.userName}</p>
                <p>Movie: {e.movieName}</p>
                <p>Comment: {e.comment}</p>
                <p>Time : {e.time}</p>
                <button onClick={() => handleDeleteComment(e.id)}>Delete</button>
                <br />
                <br />
              </div>
            ))}
          </>
        )}
      </ul>
      </>
    );
}

export default Comment;