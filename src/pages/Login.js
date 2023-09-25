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
                        <h2 className={LoginCss.title}>เข้าสู่ระบบ</h2>

                        <label className={LoginCss.label} htmlFor="uname">อีเมล</label>
                        <input className={LoginCss.input} type="email" placeholder="กรุณากรอกอีเมล" name="uname" value={email} onChange={(e) => setEmail(e.target.value)} required />


                        <label className={LoginCss.label} htmlFor="psw">รหัสผ่าน</label>
                        <input className={LoginCss.input} type="password" placeholder="กรุณากรอกรหัสผ่าน" name="psw" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <button className={LoginCss.btn} type="submit" >เข้าสู่ระบบ</button>

                        <div className={LoginCss.switch}>ยังไม่มีบัญชี? <a className={LoginCss.a}href="/signup">ลงทะเบียนที่นี่</a></div>
                        
                    </form>
                </div>
            </div>



        </>
    );



};

export default Login;