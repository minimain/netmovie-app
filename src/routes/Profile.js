import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Profile({userObj}) {
  return (
    <Container>
      <Profilehome>

        <ProfilemyImg src={userObj.photoURL} alt='프로필이미지'></ProfilemyImg>
        <ProfilemyName>{userObj.displayName}</ProfilemyName>

        <Link to={'/mypage'} userObj={userObj}>
        <ProfileEdit>프로필편집</ProfileEdit>
        </Link>

      </Profilehome>
    </Container>
  )
}

const Container = styled.div`
background:#000;
height:100vh;
width:
`;

const Profilehome = styled.div`
`;

const ProfilemyImg = styled.img`
width:200px;
heigth:200px;

`;

const ProfilemyName = styled.p`
color:#fff;
`;

const ProfileEdit = styled.span`
color:#fff;
`;

export default Profile