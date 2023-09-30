import React, { useState , useEffect } from "react";
import { addMovieGenreDB } from "../context/addMovieInfo";
import { db } from '../firebase';
import { collection, getDocs ,orderBy, query} from 'firebase/firestore';
import admingenrecss from "../css/admingenre.module.css"
import NavbarAdmin from "./navbaradmin";
const AddMovieGenre = () =>{

    const [movieGenre,setMovieGenre] = useState('')
    const [movieGenresList, setMovieGenresList] = useState([]);

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

    // const handleDeleteGenre = async (genreId) => {
    //     try {
    //         await deleteMovieGenreDB(genreId); // Use your delete function here
    //         console.log('Movie genre deleted successfully');
    //     } catch (error) {
    //         console.error('Error deleting genre:', error);
    //     }
    // }

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
          } catch (error) {
            console.error('Error fetching movie genres:', error);
          }
        };
        fetchGenres();
      }, [movieGenre]);

    return(
        <>
        {/* <h1>Add Movie Genre</h1>
        <label><b>Movie Genre</b></label>
        <input type="text" placeholder="Enter Movie Genre" value={movieGenre} onChange={(e) => setMovieGenre(e.target.value)} required/><br/>
        <button onClick={handleAddGenre} >Add Genre</button>
        <br/><br/><br/>
        <h2>Genre List</h2><br/>
            {movieGenresList.map((genre)=>(
            <div key={genre.id}>
            {genre.MovieGenre}
            
            </div>
        ))} */}
        <NavbarAdmin />
         <div class={admingenrecss.containeraddandbtn}>
      <div class={admingenrecss.form}>
        <div class={admingenrecss.inputbox}>
          <input class={admingenrecss.input} type="text" placeholder="Enter Movie Genre" value={movieGenre} onChange={(e) => setMovieGenre(e.target.value)} required />
        </div>
        <button onClick={handleAddGenre} class={admingenrecss.alinkbtn}>Add Genre</button>
      </div>
    </div>

    <div class={admingenrecss.showgenres}>
      <label class={admingenrecss.title}>Genre List</label>
      {movieGenresList.map((genre)=>(
      <p  key={genre.id} class={admingenrecss.list}> {genre.MovieGenre}</p>
       ))}
       
    </div>
        </>
    )

}

export default AddMovieGenre;