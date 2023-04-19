import Footer from 'component/Footer'
import Nav from 'component/Nav'
import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Auth from 'routes/Auth'
import DetailPage from 'routes/DetailPage'
import MainPage from 'routes/MainPage'
import Mypage from 'routes/Mypage'
import Profile from 'routes/Profile'
import SearchPage from 'routes/SearchPage'

const Layout = () => {
  return(
    <div>
    <Nav/>
    <Outlet />
    <Footer/>
    </div>
  )

}

function RouterApp({isLoggein, userObj}) {
  return (
    <div>
    <Routes>
    {isLoggein ? (
      <>
      <Route path="/" element={<Layout />}>
      <Route index element={<MainPage/>} />
      <Route path=":movieId" element={<DetailPage/>} />
      <Route path="search" element={<SearchPage/>} />
    </Route>
       <Route path='/profile' element={<Profile userObj={userObj}/>}/>
       <Route path='/mypage' element={<Mypage userObj={userObj}/>}/>
      </>
    ): (
      <Route path='/' element={<Auth/>}/>
    )}
   </Routes>
    </div>
  )
}

export default RouterApp