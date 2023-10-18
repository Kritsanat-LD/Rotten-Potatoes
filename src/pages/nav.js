import React, { useState, useEffect } from 'react';
import Navcss from "../css/nav.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faBars, faHome, faFilm, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, userRole, logout } = UserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            console.log('You are logged out');
        } catch (e) {
            console.log(e.message);
        }
    };
    return (
        <>
               <input type="checkbox" className={Navcss.menu} id="menuToggle" />
             <nav className={Navcss.nav}>
                <img src="https://scontent.fbkk29-1.fna.fbcdn.net/v/t1.15752-9/384545857_675567911184503_8510996570336686687_n.png?stp=dst-png_s2048x2048&_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=rX8gZ1JHdagAX9hQC_h&_nc_ht=scontent.fbkk29-1.fna&_nc_e2o=s&oh=03_AdRTawtv1il0tQ5Z4vMM9F8u_DgdseKab9oS4phoewM2aw&oe=6544F51C" className={Navcss.logo} />
                <form className={Navcss.search}>
                    <button className={Navcss.btn}><FontAwesomeIcon icon={faSearch} /></button>
                    <input className={Navcss.input} type="search" placeholder="Search Movie" />
                </form>
                <label htmlFor="menuToggle" className={Navcss.bars}>
                        <FontAwesomeIcon icon={faBars} />
                </label>
                <section className={Navcss.Topcontent}>
                    <a href="" className={Navcss.a}>Home</a>
                    <a href="Movies" className={Navcss.a}>Movie</a>
                    {userRole === 'admin' ? (
                          <>
                          <a href="movieManagement" className={Navcss.a}>Manage Movie</a>
                          </>
                           ) : (
                            <></>
                        )}
                         {user ? (
                            <>
                                <a disabled className={Navcss.aname}>{user.email}</a>
                                <a disabled className={Navcss.a} onClick={handleLogout}>Logout</a>
                            </>
                        ) : (
                            <a href="Login" className={Navcss.a}>Login / Sign up</a>
                        )
                        }
                    </section>
            </nav>
                <section className={Navcss.listpage}>
                    <div className={Navcss.content}>
                    <FontAwesomeIcon icon={faHome} className={Navcss.img} />
                        <a href="" className={Navcss.a}>Home</a>
                    </div>
                    <div className={Navcss.content}>
                    <FontAwesomeIcon icon={faFilm} className={Navcss.img} />
                        <a href="Movies" className={Navcss.a}>Movie</a>
                    </div>
                    {userRole === 'admin' ? (
                          <>
                            <div className={Navcss.content}>
                            <FontAwesomeIcon icon={faFilm} className={Navcss.img} />
                                <a href="movieManagement" className={Navcss.a}>Manage Movie</a>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}

                    <div className={Navcss.content}>
                    <FontAwesomeIcon icon={faRightFromBracket} className={Navcss.img} />
                        {user ? (
                            <>
                                <a disabled className={Navcss.aname}>{user.email}</a>
                                <a disabled className={Navcss.a} onClick={handleLogout}>Logout</a>
                            </>
                        ) : (
                            <a href="Login" className={Navcss.a}>Login / Sign up</a>
                        )
                        }
                    </div>
                </section>

        </>
    )

}

export default Navbar;