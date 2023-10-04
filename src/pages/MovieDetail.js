import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

const MovieDetail = () => {
  const [trailer, setTrailer] = useState('');
  const [duration, setDuration] = useState(null);
  const [movieName, setMovieName] = useState('');
  const [movieInfo, setMovieInfo] = useState('');
  const [showDate, setShowDate] = useState(null);
  const [rate, setRate] = useState('');
  const [movieGenresSelect, setMovieGenresSelect] = useState([]);
  const [oldImage, setOldImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDocRef = doc(db, 'Movies', id);
        const movieDocSnapshot = await getDoc(movieDocRef);
        const movieData = movieDocSnapshot.data();
        if (movieData) {
          setMovieName(movieData.MovieName);
          setMovieInfo(movieData.MovieInfo);
          setShowDate(movieData.ShowDate);
          setDuration(movieData.Duration);
          setTrailer(movieData.Trailer);
          setRate(movieData.Rate);
          setMovieGenresSelect(movieData.MovieGenres);
          setOldImage(movieData.imageURL);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const displayGenres = () => {
    if (movieGenresSelect.length === 0) return '';
    return movieGenresSelect.map((genre, index) => (
      <span key={index}>{genre.label}{index !== movieGenresSelect.length - 1 ? ', ' : ''}</span>
    ));
  };

  return (
    <>
      <img width={162} height={232} src={oldImage} alt={oldImage} /><br />
      <a>Movie Name: {movieName}</a><br />
      <a>Movie info: {movieInfo}</a><br />
      <a>Trailer: {trailer}</a><br />
      <a>Durtation: {duration}</a><br />
      <a>Release Date: {showDate}</a><br />
      <a>Rate: {rate}</a><br />
      <div>
        <a>Genre: {displayGenres()}</a>
      </div>
    </>
  );
};

export default MovieDetail;
