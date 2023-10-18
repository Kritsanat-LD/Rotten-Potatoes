import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import 'swiper/css/bundle';
import "../css/swiper.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import swipercss from "../css/swiper.module.css"
import listcss from "../css/list.module.css"
import Navbar from './nav';
import Footer from './footer';
import { Link } from 'react-router-dom';

const HomePage = () => {

    const [movieData, setMovieData] = useState([])
    const [rand, setRand] = useState()
    const [movieSortShowDate, setmovieSortShowDate] = useState([])//เทียบกับวันที่ปัจจุบัน ถ้าหนังฉายไปแล้ว จะไม่เเสดง
    const [randMovieGenre,setRandMovieGenre] = useState([])
    const [movieSortScore, setmovieSortScore] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
      const fetchData = async () => {
        let random = Math.floor(Math.random() * 3)
        try {
          let MovieGenre,id;
          const querySnapshot = await getDocs(collection(db, 'Movies'));
          const currentDate = new Date();
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const upcomingMovies = fetchedData.filter((movie) => {
            const showDate = new Date(movie.ShowDate);
            return showDate > currentDate;
          });

          const sortedByScore = [...fetchedData].sort((a, b) => b.Score - a.Score);
          const top10Movies = sortedByScore.slice(0, 10);

          if(random==0){
            MovieGenre = 'Horror'
            id = 'yeJc9PjMwbKFKcQi6COU'
          }else if(random==1){
            MovieGenre = 'Action'
            id = 'KKimddkY99kOYVuWIBTZ'
          }else{
            MovieGenre = 'Drama'
            id = 'S95VPUWJQDnoKJ18ba0v' 
          }
          const genreMovies = fetchedData.filter((movie) => {
            return movie.MovieGenres.some(
              (genre) => genre.label === MovieGenre && genre.value === id
            );
          });

          setRand(random)
          setMovieData(fetchedData);
          setmovieSortScore(top10Movies);
          setmovieSortShowDate(upcomingMovies);
          console.log(genreMovies);
          setRandMovieGenre(genreMovies);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      };
      fetchData();
    }, []);

    const breakpoints = {
      768: {
        width: 768,
        slidesPerView: 2,
      },
      1024: {
        width: 1024,
        slidesPerView: 6,
        },
      };
      
  return (
    <>
    {isLoading?(
      <></>
    ):(
      <>
      <Navbar/>
  {/* ------------------------------------------- start slider new up coming ------------------------------------------- */}

    <div class={swipercss.container}>
        <div class={swipercss.containerforthetitle}><div className={swipercss.vl}><h2 class={swipercss.Titleofthecontent}>NEW & UPCOMING MOVIES IN THEATERS</h2></div></div>
    <Swiper
       className={swipercss.swiper}
       modules={[Navigation, Scrollbar]}
       navigation
       scrollbar={{ draggable: true }}
       breakpoints={breakpoints}
    >
      {movieSortShowDate.map((movie) => (
        <SwiperSlide key={movie.id} className={swipercss.slide}>
          <Link to={`/FrontMovieDetail/${movie.id}`}><div className={swipercss.warpper}>
            <img className={swipercss.coverimg} src={movie.imageURL} />
            <div className={swipercss.content}>
              <div className={swipercss.score}>
                <img className={swipercss.imgscore} src="./images/potatoicon.svg" />
                <p className={swipercss.scorelabel}>{movie.ShowDate}</p>
              </div>
              <p className={swipercss.Title}>{movie.MovieName}</p>
            </div>
          </div></Link>
        </SwiperSlide>
      ))}    
    </Swiper>
    </div>
     {/* ------------------------------------------- end slider  ------------------------------------------- */}



 {/* ------------------------------------------- start slider Top Score  ------------------------------------------- */}

 <div class={swipercss.container}>
  {rand==0?(
        <div class={swipercss.containerforthetitle}><div className={swipercss.vl}><h2 class={swipercss.Titleofthecontent}>BEST HORROR MOVIES</h2></div><a href="" className={swipercss.alinkViewall}>View All</a></div>
  ):rand==1?(
    <div class={swipercss.containerforthetitle}><div className={swipercss.vl}><h2 class={swipercss.Titleofthecontent}>BEST ACTION MOVIES</h2></div><a href="" className={swipercss.alinkViewall}>View All</a></div>
  ):(
    <div class={swipercss.containerforthetitle}><div className={swipercss.vl}><h2 class={swipercss.Titleofthecontent}>BEST DRAMA MOVIES</h2></div><a href="" className={swipercss.alinkViewall}>View All</a></div>
  )}
   <Swiper
       className={swipercss.swiper}
       modules={[Navigation, Scrollbar]}
       navigation
       scrollbar={{ draggable: true }}
       breakpoints={breakpoints} 
    >
      {randMovieGenre.map((movie)=>(
        <SwiperSlide key={movie.id} className={swipercss.slide}><div className={swipercss.warpper}> <img class={swipercss.coverimg} src={movie.imageURL}/>
        <div class={swipercss.content}>
          <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>{(movie.Score/10)*100} %</p></div>
           <a class={swipercss.Title}>{movie.MovieName}</a>
          </div>
        </div>
      </SwiperSlide>
      ))}
    </Swiper>
    </div>
       {/* ------------------------------------------- end slider  ------------------------------------------- */}

          {/* ------------------------------------------- start list  ------------------------------------------- */}

    <div class={listcss.container}>
        <div class={listcss.Titleheader}>
            <div class={listcss.vl}><h2 class={listcss.Title}>POPULAR MOVIES ALL THE TIME</h2></div>
            <a class={listcss.more}>View all</a>
        </div>
        {movieSortScore.map((movie)=>(
          <>            
          <div class={listcss.listitem} key={movie.id}>
            <a class={listcss.text}>{movie.MovieName}</a>
            <a class={listcss.number}>{(movie.Score/10)*100} %</a>
          </div>
          <hr class={listcss.hl}/>
          </> 
        ))}

    </div>
            {/* ------------------------------------------- end list  ------------------------------------------- */}

            <Footer/>
      </>
    )}
    </>
  )

}

export default HomePage;