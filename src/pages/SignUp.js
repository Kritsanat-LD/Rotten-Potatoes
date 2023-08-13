import React, { useState } from "react";
import "./Login.css"
import {auth , app , db} from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";



const SignUp = () =>{

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [lastname,setLastname] = useState('')
    const navigate = useNavigate('')

    const signUp = async (e) =>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
            .then(cred =>{
                navigate("/")
                return setDoc(doc(db,"user",cred.user.uid),{
                    email:email,
                    password:password,
                    name:name,
                    lastname:lastname
                });
            })
            .catch((error) =>{
                console.log(error)
            });
    }

return(
    <>
        <h1>Register</h1>

        <form onSubmit={signUp}>
        <div class="container">
            
            <label for="uname"><b>Username</b></label>
            <input type="email" placeholder="Enter Username" name="uname" value={email} onChange={(e)=>setEmail(e.target.value)} required/>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" value={password} onChange={(e)=>setPassword(e.target.value)} required/>

            <label for="name"><b>Name</b></label>
            <input type="text" placeholder="Enter Name" name="name" value={name} onChange={(e)=>setName(e.target.value)} required/>

            <label for="lastname"><b>Lastname</b></label>
            <input type="text" placeholder="Enter Lastname" name="lastname" value={lastname} onChange={(e)=>setLastname(e.target.value)} required/>

            <button type="submit">Register</button>
            <br/>
            <a href="/" >Login</a>
        </div>
        </form>
    </>
)

}

export default SignUp;