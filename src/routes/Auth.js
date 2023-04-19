import React, { useState } from 'react'
import { authService } from 'fbase';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

function Auth() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (e) => {
   console.log('e.target.name->', e.target.name);
   const {target:{name, value}} = e;
   if(name === 'email'){
    setEmail(value);
   }else if(name === 'password'){
    setPassword(value);
   }
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  try{
    let data;
    if(newAccount){
      data = await createUserWithEmailAndPassword
      (authService, email, password);
    }else{
      data = await signInWithEmailAndPassword
      (authService, email, password);
    }
    console.log('data->', data);
  }catch (error){
   console.log('error->', error);
   setError(error.message);
  }
}

  const toggleAccount = () => setNewAccount(prev => !prev);

  
const onSocialClick =  async (e) => {
 console.log('e.target.name->',e.target.name);
 const {target:{name}} = e;
 let provider;
 if(name === 'google'){
  provider = new GoogleAuthProvider();
 }else if(name === 'github'){
  provider = new GithubAuthProvider();
 }
 const data = await signInWithPopup(authService,provider);
 console.log('data->',data);
}

  return (
    <div>
      <div>
        <p>MINI<span>MOVIE</span></p>
      </div>

      <form onSubmit={onSubmit} className='auth_form'>
        <input name='email' type='email' placeholder='이메일을 입력해주세요' required value={email} onChange={onChange} className='auth_input'/>

        <input name='password' type='password' placeholder='비밀번호를 입력해주세요' required value={password} onChange={onChange} className='auth_input'/>

        <input type='submit' className='auth_input auth_submit' value={newAccount ? "회원가입" : "로그인"}/>
        {error && <span className='auth_arror'>{error}</span>}
      </form>

      <span onClick={toggleAccount} className='authSwitch'>
        {newAccount ? "로그인 사용자 클릭" : "신규회원 클릭"}
      </span>

      <div className='authBtns'>
        <button onClick={onSocialClick} name='google'
        className='authBtn'>구글</button>
        <button onClick={onSocialClick} name='github'
        className='authBtn'>깃허브</button>
      </div>
    </div>
  )
}

export default Auth