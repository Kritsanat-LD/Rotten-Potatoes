import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query,where } from 'firebase/firestore';
import { deleteMovieInfoDB } from '../context/deleteMovieInfo';
import AdminManagementCss from "../css/adminmanagement.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import NavbarAdmin from './navbaradmin';
import { Link } from 'react-router-dom';

const MovieManagement = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState({}); // State for selected genre
  const [movieGenres, setMovieGenres] = useState([]); // State for movie genres

  useEffect(() => {
    // Fetch movie genres from Firebase
    const fetchGenres = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'Movie Genre'),orderBy('MovieGenre')));
        const movieData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovieGenres(movieData);
      } catch (error) {
        console.error('Error fetching movie genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    // Fetch movies from Firebase based on the selected genre
    const fetchData = async () => {
      try {
        let querySnapshot;
        if(selectedGenre.MovieGenre){
            const q = query(
                collection(db,"Movies"),
                where("MovieGenres",'array-contains',{ label: selectedGenre.MovieGenre , value: selectedGenre.id}),
            );
            querySnapshot = await getDocs(q)
        }else{
          // If no genre is selected, fetch all movies
          querySnapshot = await getDocs(collection(db, 'Movies'));
        }

        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedGenre]); // Run this effect whenever the selected genre changes

  const handleGenreChange = (event) => {
    const selectedGenreValue = event.target.value;
  
    if (selectedGenreValue === '') {
      setSelectedGenre({}); // or null if you prefer
    } else {
      const selectedGenreObject = JSON.parse(selectedGenreValue);
      setSelectedGenre(selectedGenreObject);
    }
  };

      const handleDeleteMovie = async (movieId) => {
        try {
            console.log(movieId);
            await deleteMovieInfoDB(movieId); // Use your delete function here
            console.log('delete successful')
        } catch (error) {
            console.error('Error deleting genre:', error);
        }
        window.alert('Data deleted successfully!');
        window.location.reload();
    }

  return (
    <>
      <NavbarAdmin/>
      <div className={AdminManagementCss.container}>
       <div className={AdminManagementCss.selectbox}>
        <select
          value={selectedGenre ? JSON.stringify(selectedGenre) : ''}
          onChange={handleGenreChange}
          className={AdminManagementCss.dropdown}
        >
          <option value="">All Genres</option>
          {movieGenres.map((genre) => (
            <option key={genre.id} value={JSON.stringify(genre)}>
              {genre.MovieGenre}
            </option>
          ))}
        </select>
        <a className={AdminManagementCss.alinkbtn} href="/AddMovie">Add Movie</a>
        <a className={AdminManagementCss.alinkbtn} href="/addmoviegenre">Add Genres</a>
      </div>
      <div className={AdminManagementCss.warpper}>
        {isLoading ? (
          <p>Loading...</p>
        ) : data.length===0?(
          <p>No movies found</p>
        ) : (
          <>
            {data.map((movie) => (
              <div key={movie.id} className={AdminManagementCss.content}>
                <img width={162} height={232} src={movie.imageURL} alt={movie.MovieName} />
                <div className={AdminManagementCss.contentinfo}>
                  <p className={AdminManagementCss.contenttitle}>{movie.MovieName}</p>
                  <Link to={`/movieUpdateDetails/${movie.id}`} className={AdminManagementCss.contentbtnedit}><FontAwesomeIcon icon={faPencil} /></Link>
                  <buutton className={AdminManagementCss.contentbtndelete} onClick={() => handleDeleteMovie(movie.id)}><FontAwesomeIcon icon={faTrash} /></buutton>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      </div>
    </>
  );
};

export default MovieManagement;