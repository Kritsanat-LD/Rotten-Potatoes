import React, { useState, useEffect } from 'react';
import "../css/nav.module.css"
import Navcss from "../css/nav.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {


  return (
    <>
    {/* <GlobalStyles /> */}
         <nav className={Navcss.nav}>
        <img src="./images/Rotten-potato.png" class={Navcss.logo} alt=""/>
        <form class={Navcss.search}>
            <button class={Navcss.btn}><FontAwesomeIcon icon={faSearch} /></button>
            <input  class={Navcss.input} type="search" placeholder="ค้นหาหนังและอื่นๆ" />
        </form>
        <section class={Navcss.listpage}>
            <div class={Navcss.content}>
                <img class={Navcss.img} src="./images/homeicon.png"/>
                <a class={Navcss.a}>หน้าหลัก</a>
            </div>
            <div class={Navcss.content}>
                <img class={Navcss.img} src="./images/movieicon.png" />
                <a  class={Navcss.a}>หนัง</a>
            </div>
            <div  class={Navcss.content}>
                <img class={Navcss.img} src="./images/usericon.png" />
                <a  class={Navcss.a}>เข้าสู่ระบบ / สมัครสมาชิก</a>
            </div>
        </section>

        </nav> 
    </>
  )

}

export default Navbar;