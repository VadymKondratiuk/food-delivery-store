import React from 'react'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { useContext } from 'react';
import Row from 'react-bootstrap/Row'
import ItemElement from './itemElement';

const ItemList = observer(() => {
    const {item} = useContext(Context)
    return (
        <Row className='d-flex'>
            {item.items.map(item =>
                <ItemElement key={item.id} item={item}/>
            )}
        </Row>
    );
});

export default ItemList;