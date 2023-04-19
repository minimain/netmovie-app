import { authService, db, storage } from 'fbase';
import { updateProfile } from 'firebase/auth';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Mypage({userObj}) {
  console.log('userObj.myprofile->',userObj);
const [NewDisplayName, setNewDisplayName] = useState(userObj.displayName);
const [newAttachment, setNewAttachment] = useState(userObj.photoURL);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  }


  // 프로필 이미지
  const onSubmitImg = async (e) => {
    e.preventDefault();
    try{
     let attachmentUrl = "";
     if(newAttachment !== ""){
      const storageRef = 
      ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, newAttachment,'data_url');
      console.log('responser->',response);
      attachmentUrl = await getDownloadURL(ref(storage, response.ref));
      await updateProfile(userObj, {
        displayName: NewDisplayName,
        photoURL:attachmentUrl
        //  !== "" ? attachmentUrl : userObj.photoURL,
      });
      // await updateProfile(userObj,{
      //   photoURL:attachmentUrl
      // });
     }
    }catch(e){
      console.log("Error adding document: ", e);
    }
  };
  
  const onmyImgChange = (e) => {
  console.log('imge->',e);
  const {target:{files}} =e;
  const theFile = files[0];
  console.log('theFile->',theFile);

  const reader = new FileReader();
  reader.onloadend = (finishedEvent) => {
    console.log('finishedEvent->',finishedEvent);
    const {currentTarget:{result}} = finishedEvent;
    setNewAttachment(result);
  }
  reader.readAsDataURL(theFile);
  }



  //프로필 이름
  const onSubmitName = async (e) => {
  // if(userObj.displayName !== NewDisplayName){
  //   await updateProfile(userObj,{displayName:NewDisplayName})
  // }
  await updateProfile(userObj, {
    displayName: NewDisplayName,
  });
  }

  const onmyNameChange = (e) => {
   const {target:{value}} = e;
   console.log('name->',e);
   setNewDisplayName(value);
  }

  return (
      <Container>
        {/* 프로필 이미지 */}
        <ProfileForm onSubmit={onSubmitImg} >
        <ProfileImg>
          {newAttachment && (
            <img src={newAttachment} alt='프로필 이미지'
            style={{width:100, height:100, backgroundColor:"#fff"}}/>
          )}
        </ProfileImg>

        <label htmlFor='profileImg'>
        <span>이미지편집</span>
        </label>
        <input type='file' accept='image/*' onChange={onmyImgChange} id='profileImg' style={{display:"none"}} />

        <ProfileImgBtn type='submit' value='이름수정' >이미지</ProfileImgBtn>
        </ProfileForm>

       {/* 프로필 이름 */}
        <ProfileNameForm onSubmit={onSubmitName}>
        <ProfileName type='text' onChange={onmyNameChange} value={NewDisplayName} placeholder='닉네임을 입력해주세요.'></ProfileName>
        <NameBtn type='submit' value='이름수정'>이름수정완료</NameBtn>
        </ProfileNameForm>
        
        <Logout onClick={onLogOutClick}>로그아웃</Logout>
      </Container> 
  )
}
const Container = styled.div`
display:flex;
flex-direction: column;
justify-content:center;
width: 100%;
height: 100vh;
overflow: hidden;
align-items: center;
`;
const ProfileForm = styled.form`
background: blue;
`;
const ProfileImgBtn = styled.button`
`;
const Logout = styled.span`
color:#fff;
background: #fffc;
display:inline;
margin-top: 50px;
`;
const ProfileColor = styled.div`
width: 100px;
height: 100px;
background: #fff;
`;
const ProfileImg = styled.span`
width: 100px;
height: 100px;
background: #fff;
`;

const ProfileNameForm = styled.form`
backgrond:yellow;
`;
const ProfileName = styled.input`
`;
const NameBtn = styled.button`

`;


export default Mypage