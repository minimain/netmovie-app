import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import'../styles/Searchpage.css';
import useDebounce from 'hooks/useDebounce';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
    //주소창에 있는 글자 가져오는것
  }
  console.log('useLocation()->',useLocation());

  let query = useQuery(); //?q=spiderman

  const searchTerm = query.get("q"); //한글자씩 들어감
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  console.log('searchTerm->',searchTerm); //spider man
  console.log('debounceSearchTerm->',debounceSearchTerm); //spiderman

  useEffect(() => {
  if(debounceSearchTerm){
    fetchSearchMovie(debounceSearchTerm);
  }
  },[debounceSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = 
      await axios.get(`/search/movie?include_adult=false&query=${debounceSearchTerm}`);
      console.log('request->',request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log('error->',error);
    }
  }

  const postermouse = document.querySelectorAll('.movie__column-poster');

  postermouse.forEach((li) => {
    li.addEventListener('mouseover', e => {
      e.currentTarget.classList.add('on');
    })
    li.addEventListener('mouseout', e => {
      e.currentTarget.classList.remove('on');
    })
  });

  // http://api.themoviedb.org/3/search/movie?&query=

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
   <section className='search-container'>
    {/* 얘는 여러개라 map 사용했었지... */}
    {searchResults.map(movie => {
      if(movie.backdrop_path !== null && movie.media_type !== "person"){
        const movieImageUrl = "http://image.tmdb.org/t/p/w500" + movie.backdrop_path; 
        return (
          <div className='movie'>  {/* 여기에 키값 지정하래... */}
            <div className='movie__column-poster' onClick={() => navigate(`/${movie.id}`)}>
              {/* 보류 */}
              
              <img src={movieImageUrl} alt={movie.title} className='movie__poster'>
              </img>

              <div className='hoverpage'>
              <h2>{movie.title}</h2>
              {/* <p>별점: {movie.vote_average}</p> */}
              <p className='modal__Doverview'>{movie.overview.slice(0,70)}...</p>
              </div>
              {/* 하나하나for로 해서 저거 다시 설정 hover */}
              {/* 여기에 제목 글 등 더 넣기 */}
            </div>
          </div>
          )
      }})}
   </section>
    ) : (
    <section className='no-results'>
      <div className='no-results__text'>
        <p>
          찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
        </p>
      </div>
    </section>
    );
  }
  return renderSearchResults();
}

export default SearchPage