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
                        <h2 className={RegisterCss.title}>Sign up</h2>
                        <label className={RegisterCss.label}><b>E-mail</b></label>
                        <input className={RegisterCss.input} type="email" placeholder="Enter E-mail" name="uname" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label className={RegisterCss.label}><b>Password</b></label>
                        <input className={RegisterCss.input} type="password" placeholder="Enter Password" name="psw" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <label className={RegisterCss.label}><b>Full Name</b></label>
                        <input className={RegisterCss.input}  type="text" placeholder="Enter your Fullname" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

                        <label className={RegisterCss.label}><b>Phone Number</b></label>
                        <input className={RegisterCss.input}  type="tel" pattern="[0-9]{9,10}" placeholder="Enter Phone Number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                        <button className={RegisterCss.btn} type="submit">Sign up</button>

                        <div  className={RegisterCss.switch}>Don't have an account? <a className={RegisterCss.a} href="/">Sign up</a></div>

                    </form>
                </div>
            </div>

        </>
    )

}

export default SignUp;