import React from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import {useNavigate, useLocation} from 'react-router-dom'
import { ITEM_ROUTE} from '../utils/consts'

const ItemElement = ({item}) => {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Col 
            md={4} 
            className='mt-3' 
            onClick={() => navigate(location.pathname + ITEM_ROUTE + '/' + item.id)}
        >
            <Card 
                style={{
                    width: 200, 
                    cursor: 'pointer', 
                    display: 'flex', 
                    padding: 10
                }} 
                border={'light'}
            >
                <Image 
                    className='ml-4 mb-2' 
                    width={150} 
                    height={150} 
                    src={process.env.REACT_APP_API_URL + item.img}
                />
                <div 
                    style={{
                    display: 'flex', 
                    justifyContent: 'space-between'
                }}>
                    <div>{item.name}</div>
                    <div>{item.price + 'грн'}</div>
                </div>
                <div>{String.fromCharCode(9733) + " " + item.rating}</div>
            </Card>
        </Col>
    );
};

export default ItemElement;