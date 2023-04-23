import React, { useEffect, useState } from 'react'
import axios from 'api/axios';
import requests from 'api/requests';
import'styles/Banner.css';
import styled from 'styled-components';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [onClicked, setonClicked] = useState(false);
  const [Dgenres,setDgenres] = useState([]);
  // const [Companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchData();
  },[])

  const fetchData = async () => {
  //현재 상영중인 영화 정보를 가져오기(20개 영화)
  const request = await axios.get(requests.fetchNowPlaying);
  console.log('request->',request);

  //20개 영화 중 영화 하나의 ID를 랜덤하게 가져오기
  const movieId = request.data.results[
    Math.floor(Math.random() * request.data.results.length + 0) //0~19
  ].id;
  console.log('moviedId->',movieId);

 //특정 영화의 더 상세한 정보를 가져오기(vidieo 비디오 정보도 포함)
 const {data:movieDetail} = await axios.get(`/movie/${movieId}`,{
    params : {append_to_response: "videos"}
  });
  console.log('results->', movieDetail);
  setMovie(movieDetail);
  setDgenres(movieDetail.genres);
  // setCompanies(movieDetail.production_companies);
  }
  console.log('setDgenres->',Dgenres);
  // console.log('set->',Companies);
  console.log('onClicked->',onClicked)

  const truncate = (str, n) => {
 return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

if(!isClicked && !onClicked){
  return (
    <header className='banner' style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`, backgroundPosition: "top center",backgroundSize: "cover"}}>

      <div className='banner__contents'>

        <h1 className='banner__title'>
          {movie.title || movie.name || movie.original_name}
        </h1>

        <div className='banner__buttons'>
          <button className='banner__button play' onClick={() => setIsClicked(true)}>
            play
          </button>
          <button className='banner__button info' onClick={() => setonClicked(true)}>
            More Information
          </button>
        </div>

        <p className='banner__description'>
         {truncate(movie.overview, 100)}
        </p>
      </div>

      <div className='banner--fadeBottom'></div>

    </header>
  )
}else if(isClicked){
 return(
  <Container>
    <HomeContainer>
     <Iframe
      src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}
      ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
      width="640"
      height="360"
      frameborder="0"
      allow="autoplay; fullscreen"
     ></Iframe>
    </HomeContainer>
  </Container>
 )
}
else if(onClicked){
  return(
    <Containerdetail>
    <Poster src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt=''>
    </Poster>
    <Movie_title>
    {movie.title || movie.name || movie.original_name}
    </Movie_title>
    <Movie_content>
    <Movie_vote>
      별점 : {movie.vote_average}
    </Movie_vote>

    <Movie_genress>
      {Dgenres.map((genres, index) => {
        return(
          <Movie_genres key={index}>
            {genres.name}
          </Movie_genres>
        )
      })}
    </Movie_genress>

    <Movie_view>
      {movie.overview}
    </Movie_view>
    </Movie_content>


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
}

const Container = styled.div`
display:flex;
flex-direction: column;
justify-content:center;
width: 100%;
height: 100vh;
`;

const HomeContainer = styled.div`
width: 100%;
height: 100%;
`;

const Iframe = styled.iframe`
width: 100%;
height: 100%;
z-index: -1;
opacity: 0.65;
border: none;
&::after{
  content: "";
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height: 100%;
}
`;

// -------------

const Containerdetail = styled.div`
padding-top:100px;
display:flex;
flex-direction: column;
justify-content: flex-start;
width: 100%;
height: 100vh;
background: #000;
`;

const Poster = styled.img`
width: 100%;
background-size: contain;

`;
const Movie_title = styled.h2`
margin:20px 0;
color:#fff;
`;

const Movie_content = styled.div`
margin-left:20px;
`;
const Movie_vote = styled.p`
color:#fff;
font-size:15px;
margin-bottom:8px;
`;

const Movie_view = styled.p`
color:#fff;
margin-top:10px;
`;

const Movie_genress = styled.ul`
padding:0;
list-style: none;
display:flex;
`;

const Movie_genres = styled.li`
color:#fff;
margin-right:10px;
`;

// const Movie_photos = styled.ul`
// `;

// const Movie_photo = styled.li`
// `;

// const Movie_img = styled.img`
// width:200px;
// height:200px;
// `;

export default Banner