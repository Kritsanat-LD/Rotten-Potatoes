import React, { useState } from "react";
import "../css/Login.module.css"
import RegisterCss from "../css/Login.module.css"
import { auth, app, db } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";


const SignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate('')


    //role = 0 : user
    //role = 1 : admin
    const signUp = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(cred => {
                navigate("/")
                return setDoc(doc(db, "user", cred.user.uid), {
                    email: email,
                    password: password,
                    name: name,
                    lastname: lastname,
                    phone: phone,
                    role : 0
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <>
            <div className={RegisterCss.container}>
                <div className={RegisterCss.card}>
                    <form className={RegisterCss.form} onSubmit={signUp}>
                        <h2 className={RegisterCss.title}>ลงทะเบียน</h2>
                        <label className={RegisterCss.label}><b>อีเมล</b></label>
                        <input className={RegisterCss.input} type="email" placeholder="กรุณากรอกอีเมล" name="uname" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label className={RegisterCss.label}><b>รหัสผ่าน</b></label>
                        <input className={RegisterCss.input} type="password" placeholder="กรุณากรอกรหัสผ่าน" name="psw" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <label className={RegisterCss.label}><b>ชื่อ</b></label>
                        <input className={RegisterCss.input}  type="text" placeholder="กรุณากรอกชื่อ" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

                        <label className={RegisterCss.label}><b>นามสกุล</b></label>
                        <input className={RegisterCss.input}  type="text" placeholder="กรุณากรอกนามสกุล" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />

                        <label className={RegisterCss.label}><b>เบอร์โทรศัพท์</b></label>
                        <input className={RegisterCss.input}  type="tel" pattern="[0-9]{9,10}" placeholder="กรุณากรอกเบอร์โทรศัพท์" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                        <button className={RegisterCss.btn} type="submit">ลงทะเบียน</button>

                        <div  className={RegisterCss.switch}>มีบัญชีแล้ว? <a className={RegisterCss.a} href="/">เข้าสู่ระบบที่นี่</a></div>

                    </form>
                </div>
            </div>

        </>
    )

}

export default SignUp;