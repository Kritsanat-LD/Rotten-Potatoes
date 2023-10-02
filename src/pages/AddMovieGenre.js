import React, { useState , useEffect } from "react";
import { addMovieGenreDB } from "../context/addMovieInfo";
import {deleteMovieGenreDB} from '../context/deleteMovieInfo'
import { db } from '../firebase';
import { collection, getDocs ,orderBy, query} from 'firebase/firestore';
import admingenrecss from "../css/admingenre.module.css"
import NavbarAdmin from "./navbaradmin";

const AddMovieGenre = () =>{

    const [movieGenre,setMovieGenre] = useState('')
    const [movieGenresList, setMovieGenresList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const handleDeleteGenre = async (genre) => {
        try {
            await deleteMovieGenreDB(genre); // Use your delete function here
            console.log('Movie genre deleted successfully');
        } catch (error) {
            console.error('Error deleting genre:', error);
        }
        window.alert('delete genre successfull')
        window.location.reload();
    }

    useEffect(() => {
        // Fetch movie genres from Firebase
        const fetchGenres = async () => {
          try {
            const querySnapshot = await getDocs(query(collection(db, 'Movie Genre'),orderBy('MovieGenre')));
            const movieData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMovieGenresList(movieData);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching movie genres:', error);
            setIsLoading(false);
          }
        };
        fetchGenres();
      }, [movieGenre]);

    return(
        <>
        <NavbarAdmin />
         <div class={admingenrecss.containeraddandbtn}>
            <div class={admingenrecss.form}>
              <div class={admingenrecss.inputbox}>
                <input class={admingenrecss.input} type="text" placeholder="Enter Movie Genre" value={movieGenre} onChange={(e) => setMovieGenre(e.target.value)} required />
              </div>
              <button onClick={handleAddGenre} class={admingenrecss.alinkbtn}>Add Genre</button>
            </div>
          </div>

    {/* <h2>Genre List</h2><br/>
            {movieGenresList.map((genre)=>(
            <div key={genre.id}>
            {genre.MovieGenre}
            <button>eiei</button>
            </div>
        ))}  */}

          <div class={admingenrecss.showgenres}>
            <label class={admingenrecss.title}>Genre List</label>
            {isLoading ?(
              <p>Loading...</p>
            ) :(
              <>
              {movieGenresList.map((genre)=>(
                <div key={genre.id} class={admingenrecss.list}> 
                  {genre.MovieGenre}<br/>
                  <button onClick={() => handleDeleteGenre(genre)}>Delete</button>
                </div>
                ))}
              </>
            )}
          </div>
        </>
    )
}

export default AddMovieGenre;