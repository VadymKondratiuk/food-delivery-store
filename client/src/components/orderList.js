import React from 'react'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { useContext } from 'react';
import Row from 'react-bootstrap/Row'
import OrderElement from './orderElement';

const OrderList = observer(() => {
    const {item} = useContext(Context)
    return (
        <Row>
            {item.orders.map(order =>
                <OrderElement key={order.id} order={order}/>
            )}
        </Row>
    );
});

export default OrderList;