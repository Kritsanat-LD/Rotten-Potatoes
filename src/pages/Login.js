import React, { useState } from "react";
import "../css/Login.module.css"
import LoginCss from "../css/Login.module.css"
import { auth, app } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate('')

    const handleLogin = (e) => {
        console.log(e)
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/home")
            })
            .catch((error) => {
                alert("You have no Account yet");
            });
    }



    return (
        <>
            <div className={LoginCss.container}>
                <div className={LoginCss.card}>
                    <form className={LoginCss.form} onSubmit={handleLogin}>
                        <h2 className={LoginCss.title}>Login</h2>

                        <label className={LoginCss.label} htmlFor="uname"><b>E-mail</b></label>
                        <input className={LoginCss.input} type="email" placeholder="Enter E-mail" name="uname" value={email} onChange={(e) => setEmail(e.target.value)} required />


                        <label className={LoginCss.label} htmlFor="psw"><b>Password</b></label>
                        <input className={LoginCss.input} type="password" placeholder="Enter Password" name="psw" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <button className={LoginCss.btn} type="submit" >Login</button>

                        <div className={LoginCss.switch}>Don't have an account? <a className={LoginCss.a}href="/signup">Sign up</a></div>
                        
                    </form>
                </div>
            </div>



        </>
    );



};

export default Login;