import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// <<<<<<< HEAD
import'styles/Nav.scss';
// =======
import'styles/Nav.css';
// >>>>>>> a17ed6e1c585577c740b237ee2ca623d85960057
function Nav({userObj}) {
const [show, setShow] = useState(false);
const [searchValue, setSearchValue] = useState("");
const navigate = useNavigate();
console.log('uerObj_nav->', userObj);


useEffect(() => {
 window.addEventListener("scroll", ()=>{
  // console.log('window.scrollY->',window.scrollY);
  if(window.scrollY > 50) {
    setShow(true);
  }else{
    setShow(false);
  }
 });

 return () => { //컴포넌트를 사용하지 않을때
  window.removeEventListener("scroll", () => {});
 };
},[]);

const onChange = (e) => {
  setSearchValue(e.target.value);
  navigate(`/search?q=${e.target.value}`);
 };

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png' alt='Netflix logo' className='nav__logo' 
      onClick={() => {window.location.href = "/netmovie-app/"}}/>
      
      <input type='search' placeholder='영화를 검색해주세요' className='nav__input' onChange={onChange} value={searchValue}/>

      <Link to={'/profile'} className='nav_profile_img'>
      {userObj.photoURL && (
        <img src={userObj.photoURL} alt='User logged' className='nav__avatar' />
      )}
      </Link>
    </nav>
  )
}

export default Nav