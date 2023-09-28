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
                    <span className={Sidebarcss.name}>Movie Management</span>
                </div>
                <div className={Sidebarcss.content}>
                    <span className={Sidebarcss.icon}>
                        <FontAwesomeIcon icon={faUserTie} />
                    </span>
                    <span className={Sidebarcss.name}>Actor Management</span>
                </div>
                <div className={Sidebarcss.content}>
                    <span className={Sidebarcss.icon}>
                        <FontAwesomeIcon icon={faMessage} />
                    </span>
                    <span className={Sidebarcss.name}>Comment Management</span>
                </div>
                <div className={Sidebarcss.content}>
                    <span className={Sidebarcss.icon}>
                        <FontAwesomeIcon icon={faHouse} />
                    </span>
                    <span className={Sidebarcss.name}>Home Page</span>
                </div>
                
        
            </div>
        </>
    )

}

export default NavbarAdmin;