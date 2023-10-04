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
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
            </p>
        </div>
        <div className={footerCss.services}>
            <h3 className={footerCss.title}>services</h3>
            <ul className={footerCss.list}>
                <li><a href="" className={footerCss.alink}> Link1</a></li>
                <li><a href="" className={footerCss.alink}> Link2</a></li>
                <li><a href="" className={footerCss.alink}> Link3</a></li>
                <li><a href="" className={footerCss.alink}> Link4</a></li>
            </ul>
        </div>
        <div className={footerCss.contact}>
            <h3 className={footerCss.title}>contact</h3>
            <ul className={footerCss.list}>
                <li><label className={footerCss.member}> KON 1</label></li>
                <li><label className={footerCss.member}> KON 1</label></li>
                <li><label className={footerCss.member}> KON 1</label></li>
                <li><label className={footerCss.member}> KON 1</label></li>
            </ul>
        </div>
    </section>
</footer>

    </>
  )

}

export default Footer;