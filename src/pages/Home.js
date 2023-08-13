import React from "react"
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

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



return(
    <>
        <h1>ดีครับ</h1>
        <p style={textStyle}>User Email: {user && user.email}</p>
        <div style={center}><a href="AddMovie">Add movie</a></div>
        <button style={buttonStyle} onClick={handleLogout}>Logout</button>
    </>
)

}

export default Home;