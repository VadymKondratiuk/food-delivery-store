import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneItem } from '../http/itemAPI';
import { createBasketItem } from '../http/basketAPI';
import {fetchTypes} from "../http/typeAPI";
import TypeBar from '../components/typeBar';
import { observer } from 'mobx-react-lite';
import { Context } from '../index'
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/consts';

const Item = observer(() => {
  const {item} = useContext(Context)    
  const {user} = useContext(Context)           
  const [oneItem, setOneItem] = useState({info: []})
  const {itemId} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchTypes().then(data => item.setTypes(data))
    fetchOneItem(itemId).then(data => setOneItem(data))
  }, [])

  const addToBasket = () => {
    const basketId = jwtDecode(localStorage.getItem('token')).id
    const basket_item = {
      itemId: itemId,
      basketId: basketId 
    }
    createBasketItem(basket_item)
    toast.success('Додано до кошику!', {
      position: "bottom-right",
      autoClose: 2000,
  });
  }

  const isAdmin = () => {
    if(user.isAuth){
      return jwtDecode(localStorage.getItem('token')).role === "ADMIN"
    }
  }

  return (
    <Container>
      <ToastContainer />
      <Row className="mt-3">
          <Col md={3}>
              <TypeBar/>
          </Col>
          <Col md={9}>
          <Container className='mt-3 mb-3'>
          <Row className='d-flex justify-content-around'>
            <Col md={4}>
              <Image width={300} height={300} src={process.env.REACT_APP_API_URL + oneItem.img}/>
              <h2>{oneItem.name}</h2>
              <h2 style={{fontSize: 30}}>{String.fromCharCode(9733) + " " + oneItem.rating}</h2>
            </Col>
            <Col md={4}>
              <Card 
                className='d-flex flex-column align-items-center justify-content-center'
                style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
              >
                <h3 style={{marginBottom: 30}}>{oneItem.price + 'грн'}</h3>
                {!isAdmin() ?
                  <Button variant={'outline-dark'} onClick={() => {
                    if(user.isAuth){
                      addToBasket()
                    }
                    else {
                      navigate(LOGIN_ROUTE)
                    }
                  }}>
                    Додати до кошику</Button>
                  :
                  <Button variant={'outline-dark'} onClick={() => navigate(ADMIN_ROUTE)}>Перейти до керування</Button>
                }
              </Card>
            </Col>
          </Row>
          <Row className='d-flex flex-column mt-3'>
            <h2>{oneItem.description}</h2>
          </Row>
        </Container>
          </Col>
      </Row>
    </Container>
  );
});

export default Item;