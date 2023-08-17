import React, { useState } from "react";
import "./Login.css"

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
                // console.log(userCredential)
                navigate("/home")
            })
            .catch((error) => {
                // console.log(error)
                alert("You have no Account yet");
            });
    }



    return (
        <>
            <div className="container">
                <div className="card">
                    <form onSubmit={handleLogin}>
                        <h2>เข้าสู่ระบบ</h2>

                        <label htmlFor="uname">อีเมล</label>
                        <input type="email" placeholder="กรุณากรอกอีเมล" name="uname" value={email} onChange={(e) => setEmail(e.target.value)} required />


                        <label htmlFor="psw">รหัสผ่าน</label>
                        <input type="password" placeholder="กรุณากรอกรหัสผ่าน" name="psw" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <button type="submit" >เข้าสู่ระบบ</button>

                        <div className="switch">ยังไม่มีบัญชี? <a href="/signup">ลงทะเบียนที่นี่</a></div>
                        <h1>TEST3</h1>
                    </form>
                </div>
            </div>



        </>
    );



};

export default Login;