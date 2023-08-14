import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { uploadImage } from '../context/UploadImg';
import { addMovieInfoDB } from "../context/addMovieInfo";

const AddMovie = () =>{

  const [movieName,setMovieName] = useState('')
  const [movieType,setMovietype] = useState('')
  const [duration,setDuration] = useState(null)
  const [showDate,setShowDate] = useState(null)
  const [rate,setRate] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);

      const handleImageSelection = (event) => {
        setSelectedImage(event.target.files[0]);
      };

      const handleUploadMovie = async () =>{
        console.log(rate)
        addMovieInfoDB({
          MovieName : movieName,
          Type : movieType,
          Duration : parseInt(duration),
          ShowDate : showDate,
          Rate : rate
        });
        setMovieName('')
        setMovietype('')
        setDuration('')
        setShowDate(null)
        setRate('')

        if (selectedImage) {
          await uploadImage(selectedImage);
          setSelectedImage(null);
        }

        window.alert('Data added successfully!');
        window.location.reload()
      }



      const { logout } = UserAuth();
      const navigate = useNavigate();
  
      const handleLogout = async () => {
          try {
            await logout();
            navigate('/');
            console.log('You are logged out')
          } catch (e) {
            console.log(e.message);
          }
        };
  
  
      const buttonStyle = {
          backgroundColor : 'red'
        };

    return(
        <>
            <h1>Add Movie</h1>
            <a href="/home">Home</a>
        <form>
            <div class="container">
                <label><b>Movie Name</b></label>
                <input type="text" placeholder="Enter Movie Name" value={movieName} onChange={(e) => setMovieName(e.target.value)} required/><br/>
                <label><b>Movie Type</b></label>
                <input type="text" placeholder="ไม่รู้เอาแบบไหน ใส่ๆไปก่อน" value={movieType} onChange={(e) => setMovietype(e.target.value)} required/><br/>
                <label><b>Movie Duration</b></label>
                <input type="number" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} required/><br/>
                <label><b>Movie Show Date</b></label>
                <input type="date" placeholder="Show Date" value={showDate} onChange={(e) => setShowDate(e.target.value)} required/><br/>
                <label><b>Movie Rate</b></label>
                <select value={rate} onChange={(e) => setRate(e.target.value)}>
                  <option value="">Select Movie Rate</option>
                  <option value="G">General Audiences (G)</option>
                  <option value="PG">Parental Guidances Suggested (PG)</option>
                  <option value="PG-13">Parents Strongly Cautioned (PG-13)</option>
                  <option value="R">Restricted (R)</option>
                  <option value="NC-17">No one 17 and under admitted (NC-17)</option>
              </select>
            </div>

            <input type="file" onChange={handleImageSelection} />
            <button onClick={handleUploadMovie} >Upload Image</button>

        </form>
            <button style={buttonStyle} onClick={handleLogout}>Logout</button>
        </>
    )

}

export default AddMovie;