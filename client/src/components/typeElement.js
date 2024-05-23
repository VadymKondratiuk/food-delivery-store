import React, { useContext } from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import {useNavigate} from 'react-router-dom'
import { TYPE_ROUTE } from '../utils/consts'
import { Context } from '../index' 

const TypeElement = ({type}) => {
    const {item} = useContext(Context)
    const navigate = useNavigate()
    return (
        <Col 
            md={3} 
            className='mt-3' 
            onClick={() => {
                navigate(TYPE_ROUTE + '/' + type.id)
                item.setSelectedType(type)
            }}
        >
            <Card 
                className='d-flex justify-content-around align-items-center' 
                style={{color: '#000', height: 130, width: 170, cursor: 'pointer', borderRadius: 20}} 
                border={'light'}
            >
                <Image width={80} height={80} src={process.env.REACT_APP_API_URL + type.img}/>
                <div>{type.name}</div>
            </Card>
        </Col>
    );
};

export default TypeElement;