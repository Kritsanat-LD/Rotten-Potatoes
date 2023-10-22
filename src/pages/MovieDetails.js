import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import comment from "../css/comment.module.css"
import Navbar from './nav';
import { useParams } from 'react-router-dom';
import { doc, getDoc , getDocs , collection , updateDoc,query,orderBy } from 'firebase/firestore';
import Footer from './footer';
import Rating from '@mui/material/Rating';



const CommentPage = () => {
  const { id } = useParams(); 

  const [trailer, setTrailer] = useState('')
  const [duration, setDuration] = useState(null)
  const [score, setScore] = useState(null)
  const [movieName, setMovieName] = useState('')
  const [movieInfo, setMovieInfo] = useState('')
  const [showDate, setShowDate] = useState(null)
  const [rate, setRate] = useState('')
  const [movieGenreData, setMovieGenre] = useState([])
  const [actorData , setActor] = useState([])
  const [imageURL , setImageURL] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  
  const ratingChanged = (newRating) => {
    console.log(newRating.target.value*2);
  };

    const [sliderValue, setSliderValue] = useState(5); // เริ่มต้นค่าที่ต้องการ
  
    const handleSliderChange = (event) => {
      setSliderValue(event.target.value);
    }
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details based on the "id" parameter
        const movieDocRef = doc(db, 'Movies', id);
        const movieDocSnapshot = await getDoc(movieDocRef);
        const movieData = movieDocSnapshot.data();

        if (movieData) {
          setMovieName(movieData.MovieName)
          setMovieInfo(movieData.MovieInfo)
          setShowDate(movieData.ShowDate)
          setDuration(movieData.Duration)
          setRate(movieData.Rate)
          setMovieGenre(movieData.MovieGenres)
          setActor(movieData.Actors)
          setImageURL(movieData.imageURL)
          setScore(movieData.Score)
          setTrailer(movieData.Trailer)
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const modifyTrailer = (iframeContent) => {
    const widthModified = iframeContent.replace(/width="\d+"/, `width="100%"`);
    const heightModified = widthModified.replace(/height="\d+"/, `height="500px"`);
    return heightModified;
  };

  const modifiedTrailer = modifyTrailer(trailer);

  const convertMinutesToHoursAndMinutes = (durationInMinutes) =>{
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}h ${minutes}m`;
  }
  
  const formatDateToEnglish = (dateString) => {
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('th-TH', options);
  };

  return (
    <>

    <Navbar/>
    <div className={comment.container_movie}>
    <div className={comment.main_comment}>
      <div className={comment.grid_img}>
        <div dangerouslySetInnerHTML={{ __html: modifiedTrailer }} />
        <div className={comment.grid_img_name}>
          <div className={comment.rate_movie}>
            <img className={comment.img_show_top} src={imageURL} />
          </div>
          <div className={comment.rate_movie}>
            <h2>{movieName}</h2>
            <h3>
              {showDate ? showDate.split('-')[0] : 'Year not available'},{' '}
              {movieGenreData.map((genre) => genre.label).join(', ')}, {convertMinutesToHoursAndMinutes(duration)}
            </h3>
            <h1>{(score/10)*100} %</h1>
          </div>
        </div>
        <h3 className={`${comment.margin_top30} ${comment.vl_s}`}>RATE AND REVIEW</h3>
        <div className={`${comment.comment_rate_movie}  ${comment.margin_top30}`}>
        <div className={`${comment.slidecontainer}`}>
        <Rating name="half-rating" defaultValue={0} precision={0.5} size="large"  onChange={ratingChanged}/>
    <br />
    <br />
    </div>
          <textarea 
            className={`${comment.rate_and_review_widget__textbox_textarea}`}
            placeholder="What did you think of the movie? (optional)"
          ></textarea>
        </div>

        
        <h3 className={`${comment.margin_top30} ${comment.vl_s}`}>MOVIE INFO</h3>
        <h5><bold className={`${comment.margin_top30} ${comment.font_we}`} >Rating : </bold> {rate} </h5>
        <h5><strong className={`${comment.margin_top30} ${comment.font_we}`} >Movie Genre : </strong>  {movieGenreData.map((genre) => genre.label).join(', ')}</h5>
        <h5><strong className={`${comment.margin_top30} ${comment.font_we}`} >Release Date  : </strong>{formatDateToEnglish(showDate)}</h5>


        <h5 className={`${comment.margin_top30}`}>{movieInfo}</h5>
        <h3 className={`${comment.margin_top30} ${comment.vl_s}`} >CRITIC REVIEWS FOR {movieName}</h3>

        <div className={`${comment.comment_movie} ${comment.margin_top30}`}>
          <div className={comment.comment_block}>
            <div className={comment.border_comment}>
              <span className={comment.comment}>Saw X wipes that silliness out, positioning itself as a direct sequel to "Saw" and presenting a singular, streamlined story of revenge that works from a clear channel of logic.</span>
            </div>
            <img src="http://embassycineplex.com/uploads/movie/yFOAuT74gm202307291810.jpg" alt="" style={{ width: '100px' }} />
          </div>

          <div className={comment.comment_block}>
            <div className={comment.border_comment}>
              <span className="comment">Saw X wipes that silliness out, positioning itself as a direct sequel to "Saw" and presenting a singular, streamlined story of revenge that works from a clear channel of logic.</span>
            </div>
            <img src="http://embassycineplex.com/uploads/movie/yFOAuT74gm202307291810.jpg" alt="" style={{ width: '100px' }} />
          </div>

          <div className={comment.comment_block}>
            <div className={comment.border_comment}>
              <span className="comment">Saw X wipes that silliness out, positioning itself as a direct sequel to "Saw" and presenting a singular, streamlined story of revenge that works from a clear channel of logic.</span>
            </div>
            <img src="http://embassycineplex.com/uploads/movie/yFOAuT74gm202307291810.jpg" alt="" style={{ width: '100px' }} />
          </div>

          <div className={comment.comment_block}>
            <div className={comment.border_comment}>
              <span className="comment">Saw X wipes that silliness out, positioning itself as a direct sequel to "Saw" and presenting a singular, streamlined story of revenge that works from a clear channel of logic.</span>
            </div>
            <img src="http://embassycineplex.com/uploads/movie/yFOAuT74gm202307291810.jpg" alt="" style={{ width: '100px' }} />
          </div>

          <div className={comment.comment_block}>
            <div className={comment.border_comment}>
              <span className="comment">Saw X wipes that silliness out, positioning itself as a direct sequel to "Saw" and presenting a singular, streamlined story of revenge that works from a clear channel of logic.</span>
            </div>
            <img src="http://embassycineplex.com/uploads/movie/yFOAuT74gm202307291810.jpg" alt="" style={{ width: '100px' }} />
          </div>

         <div className={comment.comment_block}>
            <div className={comment.border_comment}>
              <span className="comment">Saw X wipes that silliness out, positioning itself as a direct sequel to "Saw" and presenting a singular, streamlined story of revenge that works from a clear channel of logic.</span>
            </div>
            <img src="http://embassycineplex.com/uploads/movie/yFOAuT74gm202307291810.jpg" alt="" style={{ width: '100px' }} />
          </div>

          <div className={comment.comment_block}>
            <div className={comment.border_comment}>
              <span className="comment">Saw X wipes that silliness out, positioning itself as a direct sequel to "Saw" and presenting a singular, streamlined story of revenge that works from a clear channel of logic.</span>
            </div>
            <img src="http://embassycineplex.com/uploads/movie/yFOAuT74gm202307291810.jpg" alt="" style={{ width: '100px' }} />
          </div>

          <div className={comment.comment_block}>
            <div className={comment.border_comment}>
              <span className="comment">Saw X wipes that silliness out, positioning itself as a direct sequel to "Saw" and presenting a singular, streamlined story of revenge that works from a clear channel of logic.</span>
            </div>
            <img src="http://embassycineplex.com/uploads/movie/yFOAuT74gm202307291810.jpg" alt="" style={{ width: '100px' }} />
          </div>

         <div className={comment.comment_block}>
            <div className={comment.border_comment}>
              <span className="comment">Saw X wipes that silliness out, positioning itself as a direct sequel to "Saw" and presenting a singular, streamlined story of revenge that works from a clear channel of logic.</span>
            </div>
            <img src="http://embassycineplex.com/uploads/movie/yFOAuT74gm202307291810.jpg" alt="" style={{ width: '100px' }} />
          </div>

         <div className={comment.comment_block}>
            <div className={comment.border_comment}>
              <span className="comment">Saw X wipes that silliness out, positioning itself as a direct sequel to "Saw" and presenting a singular, streamlined story of revenge that works from a clear channel of logic.</span>
            </div>
            <img src="http://embassycineplex.com/uploads/movie/yFOAuT74gm202307291810.jpg" alt="" style={{ width: '100px' }} />
          </div>

         <div className={comment.comment_block}>
            <div className={comment.border_comment}>
              <span className="comment">Saw X wipes that silliness out, positioning itself as a direct sequel to "Saw" and presenting a singular, streamlined story of revenge that works from a clear channel of logic.</span>
            </div>
            <img src="http://embassycineplex.com/uploads/movie/yFOAuT74gm202307291810.jpg" alt="" style={{ width: '100px' }} />
          </div>

         <div className={comment.comment_block}>
            <div className={comment.border_comment}>
              <span className="comment">Saw X wipes that silliness out, positioning itself as a direct sequel to "Saw" and presenting a singular, streamlined story of revenge that works from a clear channel of logic.</span>
            </div>
            <img src="http://embassycineplex.com/uploads/movie/yFOAuT74gm202307291810.jpg" alt="" style={{ width: '100px' }} />
          </div>








        </div>
      </div>
    </div>
  </div>
  <Footer/>
    </>
    
  )

}

export default CommentPage;