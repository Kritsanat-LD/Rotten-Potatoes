import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
// import { getImageUrls } from '../context/getImage';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const { user, logout , userName} = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
    }
  };

  const buttonStyle = {
    backgroundColor: 'red',
  };

  const textStyle = {
    textAlign: 'center',
    fontSize: '16px',
    color: 'darkblue',
  };

  const center = {
    textAlign: 'center',
  };

  // const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // useEffect(() => {
  //   const fetchImageUrls = async () => {
  //     try {
  //       const urls = await getImageUrls();
  //       setImageUrls(urls);
  //       setIsLoading(false); // Set loading to false after fetching data
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setIsLoading(false); // Set loading to false in case of an error
  //     }
  //   };
  //   fetchImageUrls();
  // }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Movies'));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


  // Render the entire component only when isLoading is false
  return !isLoading ? (
    // return(
    <>
      <h1>ดีครับ</h1>
      <p style={textStyle}>User Email: {user && user.email}</p>
      <div style={center}>
        <a href="AddMovie">Add movie</a>
      </div>
      <div style={center}>
        <a href="addmoviegenre">AddMoivieGenre</a>
      </div>
      <div style={center}>
        <a href="addactor">Add Actor</a>
      </div>
      <div style={center}>
        <a href="commentManagement">Comment</a>
      </div>

      <div>
        {data.map((movie) => (
          <div key={movie.id} style={center}>
            <h3>{movie.MovieName}</h3>
            <img width={50} src={movie.imageURL} alt={movie.MovieName} />
            <div dangerouslySetInnerHTML={{ __html: movie.Trailer }} />
          </div>
        ))}
      </div>
      <button style={buttonStyle} onClick={handleLogout}>
        Logout
      </button>
    </>
  ) : null; 
};

export default Home;