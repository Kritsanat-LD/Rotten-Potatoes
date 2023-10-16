import React, { useState, useEffect } from 'react';
import Navcss from "../css/nav.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user , userRole} = UserAuth();
  return (
    <>
         <nav className={Navcss.nav}>
        <img src="./images/Rotten-potato.png" class={Navcss.logo}/>
        <form className={Navcss.search}>
            <button className={Navcss.btn}><FontAwesomeIcon icon={faSearch} /></button>
            <input  className={Navcss.input} type="search" placeholder="Search Movie" />
        </form>
        <section className={Navcss.listpage}>
            <div className={Navcss.content}>
                <img className={Navcss.img} src="./images/homeicon.png"/>
                <a href="homepage" className={Navcss.a}>Home</a>
            </div>
            <div className={Navcss.content}>
                <img className={Navcss.img} src="./images/movieicon.png" />
                <a href="Movies" className={Navcss.a}>Movie</a>
            </div>
            <div className={Navcss.content}>
                <img className={Navcss.img} src="./images/movieicon.png" />
                    {userRole=='admin'?(
                        <a href="movieManagement" className={Navcss.a}>Manange Movie</a>
                    ) :(
                        <></>
                    )
                }
            </div>
            <div  className={Navcss.content}>
                <img className={Navcss.img} src="./images/usericon.png" />
                    {user?(
                        <a disabled className={Navcss.a}>{user.email}</a>
                    ) :(
                        <a  className={Navcss.a}>Login / Sign up</a>
                    )
                    }
            </div>
        </section>

        </nav> 
    </>
  )

}

export default Navbar;