import React, { useState , useEffect } from "react";
import { uploadImage } from '../context/UploadImg';
import { addMovieInfoDB } from "../context/addMovieInfo";
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';


const AddMovie = () =>{

  const [movieName,setMovieName] = useState('')
  const [movieInfo,setMovieInfo] = useState('')
  const [movieGenreData,setMovieGenreData] = useState([])
  const [movieGenreSelect,setMovieGenreSelect] = useState('')
  const [duration,setDuration] = useState(null)
  const [showDate,setShowDate] = useState(null)
  const [rate,setRate] = useState('')
  const [trailer,setTrailer] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);


  const handleImageSelection = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSelectGenre = (event) =>{
    setMovieGenreSelect(event.target.value);
  }

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

  const handleUploadMovie = async () =>{

    try{
      let imageURL = null;
      if (selectedImage) {
        imageURL = await uploadImage(selectedImage);
        console.log(imageURL)
      }
      const data = {
        MovieName : movieName,
        MovieInfo : movieInfo,
        MovieGenre : movieGenreSelect,
        Duration : parseInt(duration),
        ShowDate : showDate,
        Rate : rate,
        Trailer : trailer,
        imageURL: imageURL,
        Score : 0
      };

      await addMovieInfoDB(data);
      console.log('Movie data added successfully');
    }catch(error){
      console.error('Error uploading image or adding movie info:', error);
    }

    setMovieName('')
    setMovieInfo('')
    setMovieGenreSelect('')
    setDuration('')
    setShowDate(null)
    setRate('')
    setTrailer('')
    setSelectedImage(null)


    window.alert('Data added successfully!');
    window.location.reload()
  }

    return(
        <>
            <h1>Add Movie</h1>
            <p>หลังบ้าน</p>
            <a href="/home">Home</a>
        
          <div class="container">
                <label><b>Movie Name</b></label>
                <input type="text" placeholder="Enter Movie Name" value={movieName} onChange={(e) => setMovieName(e.target.value)} required/><br/>
                <label><b>Movie Info</b></label>
                <input type="text" placeholder="Enter Movie Info" value={movieInfo} onChange={(e) => setMovieInfo(e.target.value)} required/><br/>
                <select value={movieGenreSelect} onChange={handleSelectGenre}>
                  <option value="">Select a movie</option>
                    {movieGenreData.map((genre) => (
                      <option key={genre.id} value={genre.MovieGenre}>
                        {genre.MovieGenre}
                      </option>
                    ))}
                </select>
                <label><b>Movie Duration</b></label>
                <input type="number" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} required/><br/>
                <label><b>Release Date</b></label>
                <input type="date" placeholder="Release Date" value={showDate} onChange={(e) => setShowDate(e.target.value)} required/><br/>
                <label><b>Movie Rate</b></label>
                <select value={rate} onChange={(e) => setRate(e.target.value)}>
                  <option value="">Select Movie Rate</option>
                  <option value="G">General Audiences (G)</option>
                  <option value="PG">Parental Guidances Suggested (PG)</option>
                  <option value="PG-13">Parents Strongly Cautioned (PG-13)</option>
                  <option value="R">Restricted (R)</option>
                  <option value="NC-17">No one 17 and under admitted (NC-17)</option>
              </select>
              <label><b>Trailer</b></label>
              <input type="text" placeholder="Trailer" value={trailer} onChange={(e) => setTrailer(e.target.value)} required/><br/>
              <label><b>Poster</b></label>
              <input type="file" onChange={handleImageSelection}/>
              <button onClick={handleUploadMovie} >Add Movie</button>
            </div>
                </>
    )

}

export default AddMovie;