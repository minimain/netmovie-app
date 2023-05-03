import RouterApp from "Router";
import'styles/App.scss';
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Loading from "component/Loading";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggein, setIsLoggedin] = useState(false);

  console.log('authService.currentUser->',authService.currentUser);

  const [userObj, setuserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      console.log('user->', user);
      if(user) {
        setIsLoggedin(user);
        setuserObj(user);
      }else{
        setIsLoggedin(false);
      }
      setInit(true);
    })
  },[]);
  
  return (
   <div className="app">
     {init ? (
       <RouterApp isLoggein={isLoggein} userObj={userObj}/>
     ) : (
      <Loading/>
     )}
   </div>
  );
}

export default App;
