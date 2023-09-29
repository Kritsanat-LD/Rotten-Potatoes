import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query,where } from 'firebase/firestore';
import AdminManagementCss from "../css/adminmanagement.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import NavbarAdmin from './navbaradmin';
const MovieManagement = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(''); // State for selected genre
  const [movieGenres, setMovieGenres] = useState([]); // State for movie genres

  useEffect(() => {
    // Fetch movie genres from Firebase
    const fetchGenres = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Movie Genre'));
        const movieData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        movieData.sort((a, b) => a.MovieGenre.localeCompare(b.MovieGenre));
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
        if(selectedGenre){
            const q = query(
                collection(db,"Movies"),
                where("MovieGenres",'array-contains',{ label: selectedGenre}),
            );
            querySnapshot = await getDocs(q)
        }else {
          // If no genre is selected, fetch all movies
          querySnapshot = await getDocs(collection(db, 'Movies'));
        }

        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(fetchedData)
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
    setSelectedGenre(event.target.value); // Update selected genre state
  };

  return (
    <>
      {/* <h1>Movie Management</h1>
      <br /><br />
     
      <div class={AdminManagementCss.selectbox}>
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        class={AdminManagementCss.dropdown}
      >
        <option value="">Select a Movie Genre</option>
        {movieGenres.map((genre) => (
          <option key={genre.id} value={genre.MovieGenre}>
            {genre.MovieGenre}
          </option>
        ))}
      </select>
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {data.map((movie) => (
              <div key={movie.id}>
                <img width={50} src={movie.imageURL} alt={movie.MovieName} />
                <p>{movie.MovieName}</p>
                <br /><br />
              </div>
            ))}
          </>
        )}
      </div> */}
      <NavbarAdmin/>
      <div className={AdminManagementCss.container}>
       <div className={AdminManagementCss.selectbox}>
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className={AdminManagementCss.dropdown}
        >
          <option value="">All Genres</option>
          {movieGenres.map((genre) => (
            <option key={genre.id} value={genre.MovieGenre}>
              {genre.MovieGenre}
            </option>
          ))}
        </select>
        <a className={AdminManagementCss.alinkbtn} href="/AddMovie">Add movie</a>
      </div>
      <div className={AdminManagementCss.warpper}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {data.map((movie) => (
              <div key={movie.id} className={AdminManagementCss.content}>
                <img width={162} height={232} src={movie.imageURL} alt={movie.MovieName} />
                <div className={AdminManagementCss.contentinfo}>
                  <p className={AdminManagementCss.contenttitle}>{movie.MovieName}</p>
                  <a className={AdminManagementCss.contentbtnedit} href="#"><FontAwesomeIcon icon={faPencil} /></a>
                  <a className={AdminManagementCss.contentbtndelete} href="#"><FontAwesomeIcon icon={faTrash} /></a>
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