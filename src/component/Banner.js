import React, { useEffect, useState } from 'react'
import axios from 'api/axios';
import requests from 'api/requests';
import'styles/Banner.scss';
import styled from 'styled-components';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [imgmovie, setImgMovie] = useState([]);

  const [isClicked, setIsClicked] = useState(false);
  const [onClicked, setonClicked] = useState(false);
  const [Dgenres,setDgenres] = useState([]);
  const [movieImg, setMovieImg] = useState([]);
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
  }
  );

// https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US

//  const {data:movieImmage} = await axios.get(`/movie/${movieId}/`,{
//   params : {include_image_language: "images"}
//  });

  console.log('moviewhat->',movieImg);
  // console.log('moviehow->',movieImmage);
  console.log('results->', movieDetail);
  setMovie(movieDetail);
  // setImgMovie(movieImmage);
  setDgenres(movieDetail.genres);
  setMovieImg(imgmovie.images);
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

      <Backsrc src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt=''>
      </Backsrc>

      <Movieadd>
        
        <Movieposter src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt=''>
        </Movieposter>

        <Movieinfos>
          {/* <Movieiiii>
            {movieImg.map((imgs, index)=> {
              return(
                <Movieli key={index}>
                  <Movieim src={imgs.backdrops} alt=''>

                  </Movieim>
               
                </Movieli>
              )
            })}
          </Movieiiii> */}
          <Movietitle>
          {movie.title || movie.name || movie.original_name}
          </Movietitle>
    
          <Moviecontent>
          <Movievote>
            {/* {imgmovie.images} */}
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
          {/* <Ulm>
            <Lim>
              <Ifrom>

              </Ifrom>
            </Lim>
          </Ulm> */}
          {/* <ul>
            <li>
            <MovieIframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}
              ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}></MovieIframe>
            </li>
          </ul> */}
          
            {/* src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}
      ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`} */}
         
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
}
// const Movieim = styled.img`
// `;
// const Movieiiii = styled.ul`
// `;
// const Movieli = styled.li`
// `;
const Container = styled.div`
display:flex;
flex-direction: column;
justify-content:center;
width: 100%;
height: 100vh;
overflow: hidden;
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
`;

const Movieposter = styled.img`
width: 400px;
object-fit: contain;
margin-right: 80px;
// position: absolute;
// top:250px;
// left:150px;
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

// const MovieIframe = styled.ifram`
// `;

// const Movie_photos = styled.ul`
// `;

// const Movie_photo = styled.li`
// `;

// const Movie_img = styled.img`
// width:200px;
// height:200px;
// `;

export default Banner