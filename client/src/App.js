import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/appRouter';
import NavBar from './components/navbar';
import { Context } from './index'

const App = () => {
  const { user } = useContext(Context)

  if(localStorage.getItem("token")){
    user.setIsAuth(true)
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
};

export default App;