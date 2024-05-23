import React from 'react'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { useContext } from 'react';
import ItemBasket from './itemBasket';
import Row from 'react-bootstrap/Row'

const ItemBasketList = observer(() => {
    const {item} = useContext(Context)
    return (
        // <div>
        //     {item.basket_items.map(basket_item => 
        //         <ItemBasket key={basket_item.id} basket_item={basket_item}/>
        //     )}
        // </div>
        <Row className='d-flex justify-content-center'>
            {item.basket_items.map(basket_item => 
                <ItemBasket key={basket_item.id} basket_item={basket_item}/>
            )}
        </Row>
    );
});

export default ItemBasketList;