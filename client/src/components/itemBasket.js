import React from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import {useNavigate} from 'react-router-dom'
import { ITEM_ROUTE, TYPE_ROUTE} from '../utils/consts'

const ItemBasket = ({basket_item}) => {
    const navigate = useNavigate()
    return (
            <Card 
                onClick={() => navigate(TYPE_ROUTE + '/' +  basket_item.typeId + ITEM_ROUTE + '/' + basket_item.id)}
                style={{
                    width: 200, 
                    cursor: 'pointer', 
                    display: 'flex', 
                    padding: 10,
                    marginTop: 30,
                    marginRight: 30
                }} 
                border={'light'}
            >
                <Image 
                    className='ml-4 mb-2'
                    width={150} 
                    height={150} 
                    src={process.env.REACT_APP_API_URL + basket_item.img}
                />
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>{basket_item.name}</div>
                    <div>{basket_item.price + 'грн'}</div>
                </div>
                <div>{String.fromCharCode(9733) + " " + basket_item.rating}</div>
            </Card>
    );
};

export default ItemBasket;