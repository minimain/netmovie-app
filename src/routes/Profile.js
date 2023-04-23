import React from 'react'
import { Link } from 'react-router-dom';
import { FaPencilAlt } from "react-icons/fa";
import { SiNetflix } from "react-icons/si";
// import styled from 'styled-components';
import'styles/Profile.scss';

function Profile({userObj}) {
  return (
    <container className="profile_container_my">
      <Link to={'/'}>
      <span className='profile_home'><SiNetflix/></span>
      </Link>
      
      <div className='profile_commit'>
        <div className='profilebaseImg'>
        {userObj.photoURL && (
          <img src={userObj.photoURL} alt='프로필이미지' className='profileImg_ok'/>
        )}
        </div>

        <p className='profile_name'>{userObj.displayName}</p>

        <Link to={'/mypage'} userObj={userObj}>
        <span className='profile_form_go'><FaPencilAlt/></span>
        </Link>
      </div>
    </container>


    // <Container>
    //   <Link to={'/'}>
    //   <Homego>홈으로이동</Homego>
    //   </Link>
    
    //   <Profilehome>
    //     {/* {newAttachment && (
    //         <img src={newAttachment} alt='프로필 이미지'
    //         style={{width:100, height:100, backgroundColor:"#fff"}}/>
    //       )} */}

    //     <ProfilemyImg className='profilebaseImg'>
    //     {userObj.photoURL && (
    //       <img src={userObj.photoURL} alt='프로필이미지'/>
    //     )}
    //     </ProfilemyImg>
    //     <ProfilemyName>{userObj.displayName}</ProfilemyName>

    //     <Link to={'/mypage'} userObj={userObj}>
    //     <ProfileEdit>프로필편집</ProfileEdit>
    //     </Link>

    //   </Profilehome>
    // </Container>
  )
}

// const Container = styled.div`

// `;
// const Homego = styled.p`
// color:#fff;`;

// const Profilehome = styled.div`
// display:flex;
// flex-direction: column;
// justify-content:center;
// width: 100%;
// height: 100vh;
// overflow: hidden;
// align-items: center;
// `;

// const ProfilemyImg = styled.span`
// width:200px;
// heigth:200px;
// display:block;
// background-size:cover;
// `;

// const ProfilemyName = styled.p`
// color:#fff;
// // color: #000;
// // background: #fff;
// // border: 1px solid #ff3c3c;
// // width:200px;
// // height:50px;


// `;

// const ProfileEdit = styled.span`
// color:#fff;
// `;

export default Profile