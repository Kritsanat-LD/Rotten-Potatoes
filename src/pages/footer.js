import React, { useState, useEffect } from 'react';
import footerCss from "../css/footer.module.css"


const Footer = () => {


  return (
    <>
    
       <footer className={footerCss.footer}>
        <div className={footerCss.footersection}>
            <label className={footerCss.title}>Links</label>
            <ul className={footerCss.list}>
                <li className={footerCss.order}><a href="#" class={footerCss.a}>Link 1</a></li>
                <li className={footerCss.order}><a href="#" class={footerCss.a}>Link 2</a></li>
                <li className={footerCss.order}><a href="#" class={footerCss.a}>Link 3</a></li>
            </ul>
        </div>
        <div className={footerCss.footersection}>
            <label className={footerCss.title}>Names</label>
            <ul className={footerCss.list}>
                <li className={footerCss.order}>Name 1</li>
                <li className={footerCss.order}>Name 2</li>
                <li className={footerCss.order}>Name 3</li>
                <li className={footerCss.order}>Name 4</li>
            </ul>
        </div>
        <div className={footerCss.footersection}>
            <label className={footerCss.title}>Three Lines</label>
            <p>Line 1 of text.</p>
            <p>Line 2 of text.</p>
            <p>Line 3 of text.</p>
        </div>
    </footer>
    </>
  )

}

export default Footer;