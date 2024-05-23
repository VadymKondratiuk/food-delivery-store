import Admin from './pages/admin'
import Order from './pages/order'
import Auth from './pages/auth'
import Basket from './pages/basket'
import Item from './pages/item'
import Type from './pages/type'
import Shop from './pages/shop'
import { ADMIN_ROUTE, ORDER_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE, BASKET_ROUTE, ITEM_ROUTE, TYPE_ROUTE, SHOP_ROUTE } from './utils/consts'

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    },
    {
        path: ORDER_ROUTE,
        Component: <Order/>
    }
]

export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: <Basket/>
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: <Shop/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth/>
    },
    {
        path: TYPE_ROUTE + "/:typeId" + ITEM_ROUTE + "/:itemId",
        Component: <Item/>
    },
    {
        path: TYPE_ROUTE + "/:id", 
        Component: <Type/>
    }
]