import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { getImageUrls } from '../context/getImage';


const Home = () =>{

    const { user, logout } = UserAuth();
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

      const textStyle = {
        textAlign: 'center',
        fontSize: '16px',
        color: 'darkblue',
      };

      const center = {
        textAlign: 'center'
      }



      const [imageUrls, setImageUrls] = useState([]);

      useEffect(() => {
        const fetchImageUrls = async () => {
          const urls = await getImageUrls();
          // console.log(urls)
          setImageUrls(urls);
        };
        fetchImageUrls();
      }, []);




return(
    <>
        <h1>ดีครับ</h1>
        <p style={textStyle}>User Email: {user && user.email}</p>
        <div style={center}><a href="AddMovie">Add movie</a></div>
        <div class="container">
            {imageUrls.map((url, index) => (
            <img width={200} height={200} key={index} src={url} alt={`Image ${index}`} />
          ))}
        </div>
        <button style={buttonStyle} onClick={handleLogout}>Logout</button>
    </>
)

}

export default Home;