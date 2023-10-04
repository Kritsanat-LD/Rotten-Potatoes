import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { uploadImage } from '../context/UploadImg';
import { doc, getDoc , getDocs , collection , updateDoc } from 'firebase/firestore';
import AdminCss from "../css/admin.module.css"
import { MultiSelect } from 'react-multi-select-component';
import NavbarAdmin from "./navbaradmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const UpdateDetails = () => {
  const { id } = useParams(); // Get the "id" parameter from the URL

  const [isLoading, setIsLoading] = useState(true);
  const [trailer, setTrailer] = useState('')
  const [duration, setDuration] = useState(null)
  const [movieName, setMovieName] = useState('')
  const [movieInfo, setMovieInfo] = useState('')
  const [showDate, setShowDate] = useState(null)
  const [rate, setRate] = useState('')
  const [movieGenresSelect, setMovieGenresSelect] = useState([]);
  const [movieGenreData, setMovieGenreData] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details based on the "id" parameter
        const movieDocRef = doc(db, 'Movies', id);
        const movieDocSnapshot = await getDoc(movieDocRef);
        const movieData = movieDocSnapshot.data();

        if (movieData) {
          setMovieName(movieData.MovieName)
          setMovieInfo(movieData.MovieInfo)
          setShowDate(movieData.ShowDate)
          setDuration(movieData.Duration)
          setTrailer(movieData.Trailer)
          setRate(movieData.Rate)
          setMovieGenresSelect(movieData.MovieGenres)
          setOldImage(movieData.imageURL)
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]); // Fetch movie details whenever the "id" parameter changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Movie Genre'));
        const movieData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        movieData.sort((a, b) => a.MovieGenre.localeCompare(b.MovieGenre));
        setMovieGenreData(movieData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const options = movieGenreData.map((genre) => ({
    label: genre.MovieGenre,
    value : genre.id
  }));

  const handleImageSelection = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpdateMovie = async () =>{
    let imageURL = null;
    if(selectedImage){
      imageURL = await uploadImage(selectedImage);
    }else{
      imageURL = oldImage;
    }
    const newDocRef = doc(db, "Movies", id);
    await updateDoc(newDocRef, {
      MovieName: movieName,
      MovieInfo: movieInfo,
      MovieGenres: movieGenresSelect, // Now an array of genres
      Duration: parseInt(duration),
      ShowDate: showDate,
      Rate: rate,
      Trailer: trailer,
      imageURL: imageURL,
    });
    window.alert('อัพละนะ');
  }

  return (
    <>
    <NavbarAdmin/>
    <section class={AdminCss.warpper}>
        <section class={AdminCss.container}>
        <a href="/MovieManagement"class={AdminCss.gobackbtn}><FontAwesomeIcon icon={faArrowLeft} /></a>
          <header class={AdminCss.header}>Update Movie</header>
          <div class={AdminCss.form}>

          <div class={AdminCss.inputbox}>
              <label class={AdminCss.label}>Movie Name</label>
              <input class={AdminCss.input} type="text" placeholder="Enter Movie Name" value={movieName} onChange={(e) => setMovieName(e.target.value)} required />
            </div>

            <div class={AdminCss.inputbox}>
              <label class={AdminCss.label}>Movie Info</label>
              <input class={AdminCss.input} type="text" placeholder="Enter Movie Info" value={movieInfo} onChange={(e) => setMovieInfo(e.target.value)} required />
            </div>

            <div class={AdminCss.inputbox}>
              <label class={AdminCss.label}>Trailer</label>
              <input class={AdminCss.input} type="text" placeholder="Enter Trailer" value={trailer} onChange={(e) => setTrailer(e.target.value)} required />
            </div>

            <div class={AdminCss.column}>
              <div class={AdminCss.inputbox}>
                <label class={AdminCss.label}>Movie Duration</label>
                <input class={AdminCss.input} type="number" placeholder="Enter Movie Duration" value={duration} onChange={(e) => setDuration(e.target.value)} required />
              </div>
              
              <div class={AdminCss.inputbox}>
                <label class={AdminCss.label}>Release Date</label>
                <input class={AdminCss.input} type="date" value={showDate} onChange={(e) => setShowDate(e.target.value)} placeholder="Enter Release Date" required />
              </div>
            </div>

            <div class={AdminCss.inputbox}>
              <label class={AdminCss.label}>Select Genres</label>
              <MultiSelect
                options={options}
                value={movieGenresSelect}
                onChange={setMovieGenresSelect}
                labelledBy={"Select"}
                isCreatable={true}
              />
            </div>

            <div class={AdminCss.inputbox}>
              <label class={AdminCss.label}>Select Movie Rate</label>
              <div class={AdminCss.selectbox}>
                <select value={rate} onChange={(e) => setRate(e.target.value)} class={AdminCss.dropdown}>
                  <option value="">Select Movie Rate</option>
                  <option value="G">General Audiences (G)</option>
                  <option value="PG">Parental Guidances Suggested (PG)</option>
                  <option value="PG-13">Parents Strongly Cautioned (PG-13)</option>
                  <option value="R">Restricted (R)</option>
                  <option value="NC-17">No one 17 and under admitted (NC-17)</option>
                </select>
              </div>
            </div>

            <div class={AdminCss.inputbox}>
              <label class={AdminCss.label}>Movie Image</label>
              <input onChange={handleImageSelection} type="file" class={AdminCss.inputfile}/>
            </div>

            <button onClick={handleUpdateMovie} class={AdminCss.addmovie}>Add Movie</button>

            </div>
        </section>
      </section>
    </>
  );
};

export default UpdateDetails;