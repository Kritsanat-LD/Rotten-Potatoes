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

  const itemsPerPage = 7; // จำนวนรายการต่อหน้า
  const [currentPage, setCurrentPage] = useState(1); // หน้าเริ่มต้น

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
  setCurrentPage(page);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


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
    const fetchData = async () => {
      try {
        let querySnapshot;
        if(selectedGenre.MovieGenre){
            const q = query(
                collection(db,"Movies"),
                where("MovieGenres",'array-contains',{ label: selectedGenre.MovieGenre , value: selectedGenre.id})
            );
            querySnapshot = await getDocs(q)
        }else{
          const q = query(collection(db, "Movies"), orderBy("Score", "desc"));
          querySnapshot = await getDocs(q);
        }

        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          Score: parseFloat(doc.data().Score, 10),
        }));
        fetchedData.sort((a, b) => b.Score - a.Score);
        setData(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedGenre]);

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
              <span className={AdminManagementCss.loader}></span>
        ) : data.length===0?(
          <p>No movies found</p>
        ) : (
          <>
                    {itemsToDisplay.map((movie) => (
  <div key={movie.id} className={AdminManagementCss.content}>
    <Link to={`/FrontMovieDetail/${movie.id}`} >
      <img width={162} height={232} className={AdminManagementCss.img} src={movie.imageURL} alt={movie.MovieName} />
    </Link>
    <div className={AdminManagementCss.contentinfo}>
      <Link to={`/FrontMovieDetail/${movie.id}`} className={AdminManagementCss.contenttitle}>
        <a>
          {movie.MovieName.length > 15? 
          `${movie.MovieName.slice(0, 15)}...`
          : movie.MovieName}</a>
      </Link>
      <p className={AdminManagementCss.contentscore}>Score: {(movie.Score/10)*100} %</p>
      <Link to={`/movieUpdateDetails/${movie.id}`} className={AdminManagementCss.contentbtnedit}>
        <FontAwesomeIcon icon={faPencil} />
      </Link>
      <button className={AdminManagementCss.contentbtndelete} onClick={() => handleDeleteMovie(movie.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  </div>
))}      
          </>
        )}
        </div>
        <div className={AdminManagementCss.pagination}>
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={ `${currentPage === page ? AdminManagementCss.activePage :'' } ${AdminManagementCss.button_next} ` }
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieManagement;