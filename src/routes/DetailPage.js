import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function DetailPage() {
  const [movie, setMovie] = useState([]);
  let {movieId} = useParams();
  console.log('movieId->',movieId);
  // 주소창에서 파람 값만 가져오는것 | 왜 movieId 냐 
  
  useEffect(()=> {
 fetchData();
  },[movieId]);

  // useEffect 안에는 async 불가 | useEffect에 값 넣어줘야함 안하면 한번만 불러옴 movieId 넣어줘야함
  const [Dgenres, setDgenres] = useState([]);

  const fetchData = async () => {
   const request = await axios.get(`/movie/${movieId}`);
   console.log('requestdetail->',request);
   setMovie(request.data);
   setDgenres(request.data.genres);
  };
  // console.log('확인->',Dgenres);

  //영화 api 가지고 오기
  // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

 

  // const lli = () => {
  //   const no = movie.genres;
  //   setDgenres(no);
  //   console.log('he->',setDgenres);
  // }

  // console.log("장르->",setDgenres);
  // console.log("장르->",Dgenres);

  if(!movie) return <div>...loading</div>;
  return (
    <section style={{color:"#fff"}}>
      <img className='modal__poster-img'
       src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title || movie.name || movie.original_title} />
      <p className='modal__Dtitle'>{movie.title || movie.name || movie.original_title}
      {/* <span className='modal_length'> {movie.original_language} </span> */}
      </p>
      <p>별점: {movie.vote_average}</p>
      <p className='modal__Doverview'>{movie.overview}</p>
      <ul className='modale_Dscacth'>
        {Dgenres.map((genres, index)=> {
          return(
            <li className='cacth' key={index}>
              {genres.name}
            </li>
          )
        })}
      </ul>
      

      
    </section>
  )
}

export default DetailPage