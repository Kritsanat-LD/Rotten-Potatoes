import React, { useState, useEffect } from "react";
import { addMovieGenreDB } from "../context/addMovieInfo";
import { deleteMovieGenreDB } from '../context/deleteMovieInfo'
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import admingenrecss from "../css/admingenre.module.css"
import NavbarAdmin from "./navbaradmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddMovieGenre = () => {

  const [movieGenre, setMovieGenre] = useState('')
  const [movieGenresList, setMovieGenresList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const openPopup = (genre) => {
    setSelectedGenre(genre);
    console.log(genre)
    setPopupVisible(true);
  };

  const closePopup = (event) => {
 
      setPopupVisible(false);
    
  };
  // const handleAddGenre = async () =>{
  //     try{
  //         const data = {
  //             MovieGenre : movieGenre,
  //         };
  //         await addMovieGenreDB(data);
  //         console.log('Movie genre added successfully');
  //     }catch(error){
  //         console.error('Error add genre:', error);
  //     }
  //     setMovieGenre('')
  //     window.alert('Data added successfully!');
  // }

  // const handleDeleteGenre = async (genre) => {
  //     try {
  //         await deleteMovieGenreDB(genre); // Use your delete function here
  //         console.log('Movie genre deleted successfully');
  //     } catch (error) {
  //         console.error('Error deleting genre:', error);
  //     }
  //     window.alert('delete genre successfull')
  //     window.location.reload();
  // }

  const handleAddGenre = async () => {
    return toast.promise(
      async (resolve) => {
        try {
          const data = {
            MovieGenre: movieGenre,
          };
          await addMovieGenreDB(data);
          console.log('Movie genre added successfully');
        } catch (error) {
          console.error('Error add genre:', error);
        }
        setMovieGenre('')

      },
      {
        pending: 'Adding genre, please wait...',
        success: 'Genre added successfully!',
        error: 'Error adding genre. Please try again later.',
      }

    )
  };
  const handleDeleteGenre = async (genre) => {
    return toast.promise(
      async (resolve) => {
        try {
          await deleteMovieGenreDB(genre); // Use your delete function here
          console.log('Movie genre deleted successfully');
        } catch (error) {
          console.error('Error deleting genre:', error);
        }
      },
      {
        pending: 'Deleting genre, please wait...',
        success: 'Genre deleted successfully!',
        error: 'Error deleting genre. Please try again later.',
      }
    ).then(() => {
       {
        // Remove the deleted genre from the state
        setMovieGenresList((prevGenres) => prevGenres.filter((genres) => genres.id !== genre.id));
      }
    });
  };

  

  useEffect(() => {
    // Fetch movie genres from Firebase
    const fetchGenres = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'Movie Genre'), orderBy('MovieGenre')));
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

  return (
    <>
      <NavbarAdmin />
      <div className={admingenrecss.containeraddandbtn}>
        <a href="/MovieManagement" className={admingenrecss.gobackbtn}><FontAwesomeIcon icon={faArrowLeft} className={admingenrecss.backicon} /></a>
        <div className={admingenrecss.form}>
          <div className={admingenrecss.inputbox}>
            <input className={admingenrecss.input} type="text" placeholder="Enter Movie Genre" value={movieGenre} onChange={(e) => setMovieGenre(e.target.value)} required />
          </div>
          <button onClick={handleAddGenre} className={admingenrecss.alinkbtn}>Add Genre</button>
        </div>
      </div>

      {/* <h2>Genre List</h2><br/>
            {movieGenresList.map((genre)=>(
            <div key={genre.id}>
            {genre.MovieGenre}
            <button>eiei</button>
            </div>
        ))}  */}

      <div className={admingenrecss.showgenres}>
        <label className={admingenrecss.title}>Genre List</label>
        {isLoading ? (
            <span className={admingenrecss.loader}></span>
        ) : (
          <>
            {movieGenresList.map((genre) => (
              <div key={genre.id} className={admingenrecss.list}>
                {genre.MovieGenre}<br />
                <button className={admingenrecss.deletebtn} onClick={() => openPopup(genre)} id="popupbtn">Delete</button>
              </div>
            ))}
          </>
        )}
      </div>
      {isPopupVisible && (
      <div className={admingenrecss.allpage} id="popupcontainer">
      <div className={admingenrecss.containerpopup}>
      <div className={admingenrecss.popupTitle}>Delete Genre?</div>
      <div className={admingenrecss.popupline}></div>
      <div className={admingenrecss.popupcontent}>
        <label className={admingenrecss.popuptext}>Are you sure to delete "{selectedGenre.MovieGenre}"</label>
        {/* <img
          src="https://scontent.fbkk29-1.fna.fbcdn.net/v/t1.15752-9/394457892_1672833233241862_4956274021755319669_n.png?_nc_cat=101&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=uGd8vjxbn0cAX_8KoVG&_nc_ht=scontent.fbkk29-1.fna&_nc_e2o=s&oh=03_AdSpRgL0hbBfnp1awbr_q-v0aZ3oVVgIRw4hfNfTPCDpBg&oe=655C8869"
          className={admingenrecss.popupimg}
          alt="Movie Poster"
        /> */}
      </div>
      <div className={admingenrecss.buttonsContainer}>
        <button className={admingenrecss.acceptbtn} onClick={() => handleDeleteGenre(selectedGenre)}>Yes</button>
        <button className={admingenrecss.rejectbtn} onClick={closePopup} >No</button>
      </div>
    </div>
    
    </div>
     )}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  )
}

export default AddMovieGenre;