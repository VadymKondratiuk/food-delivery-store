import React from 'react'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { useContext } from 'react';
import Row from 'react-bootstrap/Row'
import TypeElement from './typeElement';

const TypeList = observer(() => {
    const {item} = useContext(Context)
    return (
        <Row className='d-flex justify-content-center'>
            {item.types.map(type =>
                <TypeElement key={type.id} type={type}/>
            )}
        </Row>
    );
});

export default TypeList;