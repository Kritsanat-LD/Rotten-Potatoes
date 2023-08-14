import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { uploadImage } from '../context/UploadImg';

const AddMovie = () =>{

  const [movieName,setMovieName] = useState('')
  const [movieType,setMovietype] = useState('')
  const [duration,setDuration] = useState()
  const [rate,setRate] = useState('')

    const hanldleAddmovie = async (e) =>{
      
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


      const [selectedImage, setSelectedImage] = useState(null);

      const handleImageUpload = async () => {
        if (selectedImage) {
          await uploadImage(selectedImage);
          setSelectedImage(null);
        }
      };

      const handleImageSelection = (event) => {
        setSelectedImage(event.target.files[0]);
      };

    return(
        <>
            <h1>Add Movie</h1>
            <a href="/home">Home</a>
        <form>
            <div class="container">
                <label><b>Movie Name</b></label>
                <input type="text" placeholder="Enter Movie Name" required/>
            </div>

            <input type="file" onChange={handleImageSelection} />
            <button onClick={handleImageUpload} >Upload Image</button>

        </form>
            <button style={buttonStyle} onClick={handleLogout}>Logout</button>
        </>
    )

}

export default AddMovie;