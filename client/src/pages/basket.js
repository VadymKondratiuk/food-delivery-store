import React, {useEffect, useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {fetchBasketItemForUser, deleteBasketItemForUser} from "../http/basketAPI";
import ItemBasketList from '../components/itemBasketList';
import { jwtDecode } from 'jwt-decode';
import {Context} from "../index";
import { fetchOneItem } from '../http/itemAPI';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AddOrder from '../components/modals/addOrder'

const Basket = observer(() => {
    const {item} = useContext(Context)
    const [addOrderVisible, setAddOrderVisible] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      fetchBasketItemForUser(jwtDecode(localStorage.getItem('token')).id).then(data => {
        item.setBasket(data)
      })  
    }, [])

    useEffect(() => {
      const fetchItems = async () => {
        const fetchedItems = await Promise.all(
          item.basket.map(basket => fetchOneItem(basket.itemId))
        );
    
        item.setBasketItems(fetchedItems);
      };
    
      fetchItems();
    }, [item.basket]); 

    // const addOrder = () => {


    //   const order = {
    //     address: "",
    //     status: "НОВЕ",
    //     items: item.basket_items,
    //     userId: jwtDecode(localStorage.getItem('token')).id
    //   }

    //   deleteBasketItemForUser(jwtDecode(localStorage.getItem('token')).id)

    //   toast.success('Замовлення оформлено!', {
    //       position: "bottom-right",
    //       autoClose: 2000,
    //       theme: "light",
    //   });
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    // }

    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <ToastContainer />
        {item.basket_items.length > 0 ? (
          <>
            <ItemBasketList/>
            <div style={{display: 'flex', justifyContent: 'space-around', marginTop: 50}}>
              <Button 
                className='mr-5' 
                variant="outline-danger" 
                onClick={() => {
                  deleteBasketItemForUser(jwtDecode(localStorage.getItem('token')).id)
                  window.location.reload();
                }}
              >
                Очистити кошик
              </Button>
              <Button 
                variant="outline-success" 
                onClick={() => setAddOrderVisible(true)}
              >
                Оформити доставку
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{marginTop: 50}}>Кошик пустий</h2>
            <Button className='mt-5' variant="outline-success" onClick={() => navigate(SHOP_ROUTE)}>Перейти до меню</Button>
          </>
        )}
        <AddOrder show={addOrderVisible} onHide={() => setAddOrderVisible(false)}/>

      </div>
    );
});

export default Basket;