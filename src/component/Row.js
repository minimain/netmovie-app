import axios from 'api/axios';
import React, { useEffect, useState } from 'react';
import'styles/Row.scss';
import MovieModal from './MovieModal';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Row({isLargeRow, title, id, fetchUrl}) {

const [movies, setMovies] = useState([]);
const [modalOpen, setModalOpen] = useState(false);
const [movieSelected, setMovieSelected] = useState({});



  const handleClick = (movie) => {
    console.log('movie->', movie);
    setModalOpen(true);
    setMovieSelected(movie);
  }




  useEffect(() => {
    fetchMovieData();
  },[fetchUrl]);

  const fetchMovieData = async() => {
   const request = await axios.get(fetchUrl);
   console.log('request->',request);
   setMovies(request.data.results);
  }

  return (
    <section className='row' key={id}>
    <h2>{title}</h2>
    <Swiper
     modules={[Navigation, Pagination, Scrollbar, A11y]}
     navigation //arrow 버튼 사용 유무 화살표
     pagination={{ clickable: true }} //몇번째 페이지인지 알려주는 점들 | 페이지 버튼 보이게 할건지
     onSlideChange={() => console.log('slide change')}
     loop={true} //계속 롤링이 되게 하는것
     breakpoints={{1378:{
      slidesPerView: 6, //한번에 보이는 슬라이드 개수
      slidesPerGroup: 6, //한페이지에 몇개씩 슬라이드 할지
     },998:{
      slidesPerView: 5,
      slidesPerGroup: 5,
     }, 625:{
      slidesPerView: 4,
      slidesPerGroup: 4,
     }, 0:{
      slidesPerView: 3,
      slidesPerGroup: 3,
     },
    }}
    >
    {/* <div className='slider'>
    <div className='slider__arrow left'>
      <span className='arrow' 
      onClick={() => { document.getElementById(id).scrollLeft -= (window.innerWidth - 80);}}>
        {"<"}
      </span> 
      </div>*/}
      
    <div id={id} className='row__posters'>
      {movies.map((movie) => (
         <SwiperSlide>
        <img 
        key={movie.id}
        onClick={() => handleClick(movie)}
        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
        src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
        loading='lazy'
        alt={movie.title ||movie.name || movie.original.name}/>
        </SwiperSlide>
      ))}
    </div>
    {/* // <div className='slider__arrow right'>
    //   <span className='arrow'
    //   onClick={() => { document.getElementById(id).scrollLeft += (window.innerWidth - 80);}}>
    //     {">"}
    //   </span>
    // </div> */}
    {/* </div> */}
    </Swiper>
    {modalOpen && (
      <MovieModal {...movieSelected} setModalOpen={setModalOpen}/>
    )}
    </section>
  )
}

export default Row