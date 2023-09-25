import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import"../css/nav.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {


  return (
    <>
    <GlobalStyles />
         <nav>
            <img src="./images/Rotten-potato.png" class="logo"/>
            <form class="search">
                <button class="searchicon"><FontAwesomeIcon icon={faSearch} /></button>
                <input type="search" placeholder="ค้นหาหนังและอื่นๆ" />
            </form>
            <section class="listpage">
                <div>
                    <img src="./images/homeicon.png" />
                    <a>หน้าหลัก</a>
                </div>
                <div>
                    <img src="./images/movieicon.png" />
                    <a>หนัง</a>
                </div>
                <div>
                    <img src="./images/usericon.png" />
                    <a>เข้าสู่ระบบ / สมัครสมาชิก</a>
                </div>
        </section>


        </nav> 
    </>
  )

}

export default Navbar;