import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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
  console.log('확인->',Dgenres);

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
    <Containerdetail>

      <Backsrc src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt=''>
      </Backsrc>

      <Movieadd>
        
        <Movieposter src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt=''>
        </Movieposter>

        <Movieinfos>
          <Movietitle>
          {movie.title || movie.name || movie.original_name}
          </Movietitle>
    
          <Moviecontent>
          <Movievote>
            별점 : {movie.vote_average}
          </Movievote>
      
          <Moviegenress>
            장르 :  
             {Dgenres.map((genres, index) => {
              return(
                <Moviegenres key={index}>
                  {genres.name}
                </Moviegenres>
              )
            })}
          </Moviegenress>
      
          <Movieview>
            {movie.overview || "상세정보가 제공되고 있지않습니다."}
          </Movieview>

          </Moviecontent>
        </Movieinfos>
        
  
      </Movieadd>
   


    {/* <Movie_photos>
      {Companies.map((compani,index) => {
        return(
          <Movie_photo key={index}>
            <Movie_img src={`https://image.tmdb.org/t/p/original${compani.logo_path}`} alt=''/>
          </Movie_photo>
        )
      })}
    </Movie_photos> */}
    
  </Containerdetail>
  )
}

const Containerdetail = styled.div`
// padding-top:100px;
display:flex;
flex-direction: column;
justify-content: flex-start;
width: 100%;
background: #000;
height: 100vh;
position: relative;
`;

const Backsrc = styled.img`
width: 100%;
object-fit: cover;
margin: 0 auto;
height:100vh;
opacity: 0.3;
`;

const Movieadd = styled.div`
display:flex;
position: absolute;
top: 180px;
width: 85%;
left:50%;
transform:translateX(-50%);
@media (max-width: 750px) {
  flex-direction: column;
  top:100px;
 }
`;

const Movieposter = styled.img`
width: 400px;
object-fit: contain;
margin-right: 80px;
// position: absolute;
// top:250px;
// left:150px;
@media (max-width: 750px) {
  width:250px;
  margin: 0 auto;
}
`;

const Movieinfos = styled.div`
`;

const Movietitle = styled.h2`
margin:20px 0;
color:#fff;
`;

const Moviecontent = styled.div`
margin-left:20px;
`;
const Movievote = styled.p`
color:#fff;
font-size:15px;
margin-bottom:8px;
`;

const Movieview = styled.p`
color:#fff;
margin-top:10px;
`;

const Moviegenress = styled.ul`
padding:0;
list-style: none;
display:flex;
color:#fff;
`;

const Moviegenres = styled.li`
color:#fff;
margin-right:10px;
`;

export default DetailPage