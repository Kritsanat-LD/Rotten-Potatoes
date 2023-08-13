import React, { useState } from "react";
import "./Login.css"

import {auth , app} from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate('')

    const handleLogin = (e) =>{
        console.log(e)
        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
            .then((userCredential) =>{
                console.log(userCredential)
                navigate("/home")
            })
            .catch((error) =>{
                // console.log(error)
                alert("You have no Account yet");
            });
    }

    

    return(
        <>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
            <div class="container">
                <label for="uname"><b>Username</b></label>
                <input type="email" placeholder="Enter Username" name="uname" value={email} onChange={(e)=>setEmail(e.target.value)} required/>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" value={password} onChange={(e)=>setPassword(e.target.value)} required/>

                <button type="submit" >Login</button>
                <br/>
            <a href="/signup" >Sign Up</a>
            </div>
            
            </form>
        </>
    );



};

export default Login;