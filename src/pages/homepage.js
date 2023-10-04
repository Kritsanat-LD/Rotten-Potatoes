import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css/bundle';

import { Swiper, SwiperSlide } from 'swiper/react';
import swipercss from "../css/swiper.module.css"
import listcss from "../css/list.module.css"
import Navbar from './nav';
import Footer from './footer';

const HomePage = () => {

    const breakpoints = {
      768: {
        width: 768,
        slidesPerView: 3,
        // spaceBetween: 1,

      },
      1024: {
        width: 1024,
        slidesPerView: 6,
        // spaceBetween: 5
      },
      };
  return (
    <>

    <Navbar/>

  {/* ------------------------------------------- start slider  ------------------------------------------- */}
    <div class={swipercss.container}>
        <div class={swipercss.containerforthetitle}><div className={swipercss.vl}><h2 class={swipercss.Titleofthecontent}>NEW & UPCOMING MOVIES IN THEATERS</h2></div><a href="" className={swipercss.alinkViewall}>View All</a></div>
   <Swiper
       className={swipercss.swiper}
       modules={[Navigation, Scrollbar]}
       navigation
       scrollbar={{ draggable: true }}
       breakpoints={breakpoints}
       
    >
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/ashfall.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้านยาวแบบจัดๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆ</a>
      </div>
      </SwiperSlide>
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/movie1.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/movie2.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/movie3.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/movie4.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้านยาววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววว</a>
      </div>
      </SwiperSlide>
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/movie5.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/movie6.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/ashfall.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/ashfall.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      

      
     
    </Swiper>
    </div>
     {/* ------------------------------------------- end slider  ------------------------------------------- */}

 {/* ------------------------------------------- start slider  ------------------------------------------- */}

    <div class={swipercss.container}>
        <div class={swipercss.containerforthetitle}><div className={swipercss.vl}><h2 class={swipercss.Titleofthecontent}>NEW & UPCOMING ON STREAMING</h2></div><a href="" className={swipercss.alinkViewall}>View All</a></div>
   <Swiper
       className={swipercss.swiper}
       modules={[Navigation, Scrollbar]}
       navigation
       scrollbar={{ draggable: true }}
       breakpoints={breakpoints}
       
    >
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/ashfall.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้านยาวแบบจัดๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆ</a>
      </div>
      </SwiperSlide>
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/movie1.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/movie2.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/movie3.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/movie4.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้านยาววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววว</a>
      </div>
      </SwiperSlide>
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/movie5.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/movie6.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/ashfall.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      <SwiperSlide className={swipercss.slide}> <img class={swipercss.coverimg} src="./images/ashfall.jpg"/>
      <div class={swipercss.content}>
        <div class={swipercss.score}><img class={swipercss.imgscore} src="./images/potatoicon.svg" /><p class={swipercss.scorelabel}>80%</p></div>
        <a href='' class={swipercss.Title}>นรกชนบ้าน</a>
      </div>
      </SwiperSlide>
      

      
     
    </Swiper>
    </div>

       {/* ------------------------------------------- end slider  ------------------------------------------- */}

          {/* ------------------------------------------- start list  ------------------------------------------- */}

    <div class={listcss.container}>
        <div class={listcss.Titleheader}>
            <div class={listcss.vl}><h2 class={listcss.Title}>POPULAR STREAMING MOVIES</h2></div>
            <a class={listcss.more}>View all</a>
        </div>
        <div class={listcss.listitem}>

            <a class={listcss.text}>No One Will Save You</a>
            <a class={listcss.number}>91%</a>
        </div>
        <hr class={listcss.hl} />
        <div class={listcss.listitem}>
            <a class={listcss.text}>Another Movie Title</a>
            <a class={listcss.number}>85%</a>
        </div>
        <hr class={listcss.hl}/>
        <div class={listcss.listitem}>
            <a class={listcss.text}>Another Movie Title</a>
            <a class={listcss.number}>73%</a>
        </div>
        <hr class={listcss.hl}/>
        <div class={listcss.listitem}>
            <a class={listcss.text}>Another Movie Title</a>
            <a class={listcss.number}>73%</a>
        </div>
        <hr class={listcss.hl}/>
        <div class={listcss.listitem}>
            <a class={listcss.text}>Another Movie Title</a>
            <a class={listcss.number}>73%</a>
        </div>
        <hr class={listcss.hl}/>
        <div class={listcss.listitem}>
            <a class={listcss.text}>Another Movie Title</a>
            <a class={listcss.number}>73%</a>
        </div>
        <hr class={listcss.hl}/>
        <div class={listcss.listitem}>
            <a class={listcss.text}>Another Movie Title</a>
            <a class={listcss.number}>73%</a>
        </div>
        <hr class={listcss.hl}/>
        <div class={listcss.listitem}>
            <a class={listcss.text}>Another Movie Title</a>
            <a class={listcss.number}>73%</a>
        </div>
        <hr class={listcss.hl}/>
        <div class={listcss.listitem}>
            <a class={listcss.text}>Another Movie Title</a>
            <a class={listcss.number}>73%</a>
        </div>
        <hr class={listcss.hl}/>

    </div>
            {/* ------------------------------------------- end list  ------------------------------------------- */}

            <Footer/>
    </>
  )

}

export default HomePage;