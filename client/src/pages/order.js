import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import OrderList from '../components/orderList';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchActiveOrders} from "../http/orderAPI";

const Order = observer(() => {
    const {item} = useContext(Context)

    useEffect(() => {
        fetchActiveOrders().then(data => item.setOrders(data))
    }, [])

    return (
        <Container>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <OrderList/>
                </div>
        </Container>
    );
});

export default Order;