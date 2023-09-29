import React, { useState, useEffect } from 'react';
import "../css/sidebar.module.css"
import Sidebarcss from "../css/sidebar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm,faMessage,faUserTie,faHouse, faBars} from '@fortawesome/free-solid-svg-icons'

const NavbarAdmin = () => {

 
    return (
        <>
            <div id="nav" className={Sidebarcss.baradmin}>
                <header><img className={Sidebarcss.logo} src="./images/Rotten-potato.png" /></header>
                <div className={Sidebarcss.content}>
                    <span className={Sidebarcss.icon}>
                        <FontAwesomeIcon icon={faFilm} />
                    </span>
                    <a href="/movieManagement"className={Sidebarcss.name}>Movie Management</a>
                </div>
                <div className={Sidebarcss.content}>
                    <span className={Sidebarcss.icon}>
                        <FontAwesomeIcon icon={faUserTie} />
                    </span>
                    <a href="" className={Sidebarcss.name}>Actor Management</a>
                </div>
                <div className={Sidebarcss.content}>
                    <span className={Sidebarcss.icon}>
                        <FontAwesomeIcon icon={faMessage} />
                    </span>
                    <a href="" className={Sidebarcss.name}>Comment Management</a>
                </div>
                <div className={Sidebarcss.content}>
                    <span className={Sidebarcss.icon}>
                        <FontAwesomeIcon icon={faHouse} />
                    </span>
                    <a href="" className={Sidebarcss.name}>Home Page User</a>
                </div>
                
        
            </div>
        </>
    )

}

export default NavbarAdmin;