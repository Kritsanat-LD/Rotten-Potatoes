import React, { useState , useEffect } from "react";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import {auth , app , db , storage} from "../firebase"
import {ref,uploadBytes,getDownloadURL,listAll,list,} from "firebase/storage";
import { v4 } from "uuid";

const AddMovie = () =>{

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

      const [imageUpload, setImageUpload] = useState(null);
      const [imageUrls, setImageUrls] = useState([]);
    
      const imagesListRef = ref(storage, "images/");
      const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageUrls((prevUrls) => new Set([...prevUrls, url])); // Use Set to avoid duplicates
          });
        });
      };
    
      useEffect(() => {
        listAll(imagesListRef).then((response) => {
          const uniqueUrls = new Set(); // Use a Set to temporarily store unique URLs
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              uniqueUrls.add(url);
            });
          });
          setImageUrls(Array.from(uniqueUrls)); // Convert Set back to an array and update state
        });
      }, []);

    return(
        <>
            <h1>Add Movie</h1>

        <form>
            <div class="container">
                <label><b>Movie Name</b></label>
                <input type="text" placeholder="Enter Movie Name" required/>
            </div>

            <input type="file" onChange={(event) => {setImageUpload(event.target.files[0]);}}/>
            <button onClick={uploadFile}> Upload Image</button>

        </form>

            <button style={buttonStyle} onClick={handleLogout}>Logout</button>
        </>
    )

}

export default AddMovie;