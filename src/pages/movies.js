import React from 'react';
import movieCss from '../css/Movies.module.css'; 
import Navbar from './nav';
import Footer from './footer';

function Movies() {
    return (
        <>       
         <Navbar/>
      <div className={movieCss.container}>
        <h1>Movies in Theaters (2023)</h1>
        <div className={movieCss.listsearch}>
          <div className={movieCss.selectbox}>
            <select className={movieCss.dropdown}>
            <option value="">Select Movie Rate</option>
                    <option value="G">General Audiences (G)</option>
                    <option value="PG">Parental Guidances Suggested (PG)</option>
                    <option value="PG-13">Parents Strongly Cautioned (PG-13)</option>
                    <option value="R">Restricted (R)</option>
                    <option value="NC-17">No one 17 and under admitted (NC-17)</option>
            </select>
          </div>
          <div className={movieCss.selectbox}>
            <select className={movieCss.dropdown}>
            <option value="">Select Movie Rate</option>
                    <option value="G">General Audiences (G)</option>
                    <option value="PG">Parental Guidances Suggested (PG)</option>
                    <option value="PG-13">Parents Strongly Cautioned (PG-13)</option>
                    <option value="R">Restricted (R)</option>
                    <option value="NC-17">No one 17 and under admitted (NC-17)</option>
            </select>
          </div>

        </div>
        <div className={movieCss.warpper}>


          <div className={movieCss.content}>
            <img className={movieCss.img} src="./images/ashfall.jpg" alt="Movie Poster" />
            <div className={movieCss.contentinfo}>
              <p className={movieCss.contentscore}>Score: 8</p>
              <p className={movieCss.contenttitle}>นรกชนบ้านกกกกกกกกกกกก</p>
            </div>
          </div>
          <div className={movieCss.content}>
            <img className={movieCss.img} src="./images/ashfall.jpg" alt="Movie Poster" />
            <div className={movieCss.contentinfo}>
              <p className={movieCss.contentscore}>Score: 8</p>
              <p className={movieCss.contenttitle}>นรกชนบ้านกกกกกกกกกกกก</p>
            </div>
          </div>
         
          <div className={movieCss.content}>
            <img className={movieCss.img} src="./images/ashfall.jpg" alt="Movie Poster" />
            <div className={movieCss.contentinfo}>
              <p className={movieCss.contentscore}>Score: 8</p>
              <p className={movieCss.contenttitle}>นรกชนบ้านกกกกกกกกกกกก</p>
            </div>
          </div>
         
          <div className={movieCss.content}>
            <img className={movieCss.img} src="./images/ashfall.jpg" alt="Movie Poster" />
            <div className={movieCss.contentinfo}>
              <p className={movieCss.contentscore}>Score: 8</p>
              <p className={movieCss.contenttitle}>นรกชนบ้านกกกกกกกกกกกก</p>
            </div>
          </div>
         
          <div className={movieCss.content}>
            <img className={movieCss.img} src="./images/ashfall.jpg" alt="Movie Poster" />
            <div className={movieCss.contentinfo}>
              <p className={movieCss.contentscore}>Score: 8</p>
              <p className={movieCss.contenttitle}>นรกชนบ้านกกกกกกกกกกกก</p>
            </div>
          </div>
         
          <div className={movieCss.content}>
            <img className={movieCss.img} src="./images/ashfall.jpg" alt="Movie Poster" />
            <div className={movieCss.contentinfo}>
              <p className={movieCss.contentscore}>Score: 8</p>
              <p className={movieCss.contenttitle}>นรกชนบ้านกกกกกกกกกกกก</p>
            </div>
          </div>
         

         
         
          
        
        
        
        
        </div>
            

      </div>

      <Footer/>
      </>

    );
  }
  
  export default Movies;