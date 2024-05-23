import {Navigate, Routes, Route} from 'react-router-dom';
import { adminRoutes, authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AppRouter = () => {
    const {user} = useContext(Context)
    
    const isAdmin = () => {
        return jwtDecode(localStorage.getItem('token')).role === "ADMIN"
    }

    return (
        <Routes>
            {(user.isAuth && isAdmin()) && adminRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={Component} exact/>
            )}
            {user.isAuth && !isAdmin() && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={Component} exact/>
            )}

            <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />   
        </Routes>
    );
};

export default AppRouter;