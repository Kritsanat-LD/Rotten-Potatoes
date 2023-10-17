import React, { useState, useEffect } from 'react';
import footerCss from "../css/footer.module.css"


const Footer = () => {


  return (
    <>
    
    
    <footer className={footerCss.footer}>
    <section className={footerCss.container}>
        <div className={footerCss.about}>
            <h3 className={footerCss.title}>About US</h3>
            <p>
            Welcome to Rotten Potatoes, your go-to destination for all things movies and TV shows! Established with a passion for cinema, Rotten Potatoes is dedicated to providing you with the most comprehensive and honest reviews, insightful articles, and the latest entertainment news.
            </p>
        </div>
        <div className={footerCss.services}>
            <h3 className={footerCss.title}>services</h3>
            <ul className={footerCss.list}>
                <li><a href="" className={footerCss.alink}> Home</a></li>
                <li><a href="" className={footerCss.alink}> Movie</a></li>
            </ul>
        </div>
        <div className={footerCss.contact}>
            <h3 className={footerCss.title}>Code By</h3>
            <ul className={footerCss.list}>
                <li><label className={footerCss.member}> KON 1</label></li>
                <li><label className={footerCss.member}> KON 2</label></li>
                <li><label className={footerCss.member}> KON 3</label></li>
                <li><label className={footerCss.member}> KON 4</label></li>
            </ul>
        </div>
    </section>
</footer>

    </>
  )

}

export default Footer;