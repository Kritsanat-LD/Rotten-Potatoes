import React, { useState } from "react";
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';


const AddMovieGenre = () =>{

    const [movieGenre,setMovieGenre] = useState('')

    const addMovieGenreDB = async (data) => {
        try{
          const newDocRef = collection(db,'Movie Genre');
          await addDoc(newDocRef,data);
          console.log('Movie genre added to Firestore successfully');
        } catch (error){
          console.error('Error adding movie genre to Firestore:', error);
        }
    };

    const handleAddGenre = async () =>{
        try{
            const data = {
                MovieGenre : movieGenre,
            };
            await addMovieGenreDB(data);
            console.log('Movie genre added successfully');
        }catch(error){
            console.error('Error add genre:', error);
        }
        setMovieGenre('')
        window.alert('Data added successfully!');
    }

    return(
        <>
        <h1>Add Movie Genre</h1>
        <label><b>Movie Name</b></label>
        <input type="text" placeholder="Enter Movie Genre" value={movieGenre} onChange={(e) => setMovieGenre(e.target.value)} required/><br/>
        <button onClick={handleAddGenre} >Add Movie</button>
        </>
    )

}

export default AddMovieGenre;