import React, { useState, useEffect } from "react";
import { uploadImage } from '../context/UploadImg';
import { addMovieInfoDB } from "../context/addMovieInfo";
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import AdminCss from "../css/admin.module.css"
import { MultiSelect } from 'react-multi-select-component';
import NavbarAdmin from "./navbaradmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AddMovie = () => {

  const [movieName, setMovieName] = useState('')
  const [movieInfo, setMovieInfo] = useState('')
  const [movieGenresSelect, setMovieGenresSelect] = useState([]);
  const [movieGenreData, setMovieGenreData] = useState([])
  const [duration, setDuration] = useState(null)
  const [showDate, setShowDate] = useState(null)
  const [rate, setRate] = useState('')
  const [trailer, setTrailer] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);


  const handleImageSelection = (event) => {
    setSelectedImage(event.target.files[0]);
  };

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

  const handleUploadMovie = async () => {
    try {
      let imageURL = null;
      if (selectedImage) {
        imageURL = await uploadImage(selectedImage);
      }

      const data = {
        MovieName: movieName,
        MovieInfo: movieInfo,
        MovieGenres: movieGenresSelect, // Now an array of genres
        Duration: parseInt(duration),
        ShowDate: showDate,
        Rate: rate,
        Trailer: trailer,
        imageURL: imageURL,
        Score: 0
      };

      await addMovieInfoDB(data);
      console.log('Movie data added successfully');
    } catch (error) {
      console.error('Error uploading image or adding movie info:', error);
    }

    // Clear the input fields and selections
    setMovieName('');
    setMovieInfo('');
    setMovieGenresSelect([]); // Clear selected genres
    setDuration('');
    setShowDate(null);
    setRate('');
    setTrailer('');
    setSelectedImage(null);

    window.alert('Data added successfully!');
    window.location.reload();
  };

  const options = movieGenreData.map((genre) => ({
    label: genre.MovieGenre
  }));

  return (
    <>
      <NavbarAdmin />

      <section class={AdminCss.warpper}>
        <section class={AdminCss.container}>
        <a href="/MovieManagement"class={AdminCss.gobackbtn}><FontAwesomeIcon icon={faArrowLeft} /></a>
          <header class={AdminCss.header}>Add Movie</header>
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
              <input onChange={handleImageSelection} type="file" class={AdminCss.inputfile} />
            </div>

            <button onClick={handleUploadMovie} class={AdminCss.addmovie}>Add Movie</button>
          </div>
        </section>
      </section>


    </>
  )

}

export default AddMovie;