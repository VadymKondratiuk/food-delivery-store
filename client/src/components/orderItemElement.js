import React from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {useNavigate, useLocation} from 'react-router-dom'
import { ITEM_ROUTE} from '../utils/consts'

const OrderItemElement = ({item}) => {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Col md={4} className='mt-3' onClick={() => navigate(location.pathname + ITEM_ROUTE + '/' + item.id)}>
            <Card style={{width: 200, cursor: 'pointer', display: 'flex', padding: 10}} border={'light'}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>{item.name}</div>
                    <div>{item.price + 'грн'}</div>
                </div>
            </Card>
        </Col>
    );
};

export default OrderItemElement;