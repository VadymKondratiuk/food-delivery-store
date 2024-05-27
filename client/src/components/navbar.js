import React, { useContext } from 'react'
import '../styles/navbar.css'
import logo from '../img/logo.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    let isAdmin = false;

    if(user.isAuth){
      isAdmin = jwtDecode(localStorage.getItem('token')).role === "ADMIN"
    }

    const logout = () => {
      user.setUser({})
      user.setIsAuth(false)
      localStorage.clear()
      navigate(SHOP_ROUTE)
      toast.success('Вихід виконано!', {
        position: "bottom-right",
        autoClose: 2000,
        theme: "light",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    }

  return (
    <div>
      <ToastContainer/>
      <header>
          <NavLink className="navlink" to={SHOP_ROUTE}><img className="img-logo" src={logo} alt="Logo"/></NavLink>
          {user.isAuth ? 
            <div className='two-btn'>
              {isAdmin && ( 
                <>
                <button 
                  className="admin-pannel"
                  onClick={() => navigate(ORDER_ROUTE)}
                >
                  Обробка замовлень
                </button>
                <button 
                  className="admin-pannel"
                  onClick={() => navigate(ADMIN_ROUTE)}
                >
                  Панель керування
                </button>
                </> 
              )}
              {!isAdmin && (  
                <button 
                  className="admin-pannel"
                  onClick={() => navigate(BASKET_ROUTE)}
                >
                  Кошик
                </button>
              )}
              <button 
                className="reg-btn"
                onClick={() => logout()}
              >
                Вийти
              </button>
            </div>
          :
            <button 
              className="reg-btn"
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Увійти
            </button>
          }
      </header>
    </div>
    );
});

export default NavBar;