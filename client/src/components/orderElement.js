import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import OrderItemList from './orderItemList';
import { updateOrderStatus } from '../http/orderAPI';
import { Col } from 'react-bootstrap';

const OrderElement = ({order}) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', options);
    }

    const changeOrderStatus = (status) => {
        const updatedOrder = {status: status}
        updateOrderStatus(order.id, updatedOrder)
        window.location.reload();
    }

    return (
        <Col md={4}>
            <Card 
                className='d-flex' 
                style={{
                    color: '#000', 
                    height: 'fit-content', 
                    width: 300, 
                    marginRight: 100, 
                    borderRadius: 20,
                    marginTop: 20,
                    padding: 20
                }} 
                border={'light'}

            >
                <div>ID замовлення: {order.id}</div>
                <div>Дата: {formatDate(order.createdAt)}</div>
                <div>ID користувача: {order.userId}</div>
                <div>Адреса замовлення: {order.address}</div>
                <div>Статус: {order.status}</div>
                <OrderItemList order = {order}/>  
                {order.status === "НОВЕ" ?
                    <Button 
                        variant="outline-success" 
                        className='mt-3' 
                        onClick={() => changeOrderStatus("ВИКОНАНЕ")}
                    >
                        Позначити як виконане
                    </Button> 
                    :
                    <Button 
                        className='mt-3' 
                        onClick={() => changeOrderStatus("НОВЕ")}
                    >
                        Повернути до виконання
                    </Button> 
                }
                <Button 
                    variant="outline-danger" 
                    className='mt-3' 
                    onClick={() => changeOrderStatus("ЗАВЕРШЕНЕ")}
                >
                    Завершити замовлення
                </Button> 
            </Card>
        </Col>
    );
};

export default OrderElement;