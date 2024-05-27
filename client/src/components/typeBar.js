import React from 'react'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { TYPE_ROUTE } from '../utils/consts';
import {useNavigate} from 'react-router-dom'

const TypeBar = observer(() => {
    const {item} = useContext(Context)
    const navigate = useNavigate()
    
    return (
        <ListGroup>
            {item.types.map(type => 
                <ListGroup.Item 
                    style={{cursor: 'pointer'}}
                    active={type.id === item.selectedType.id}
                    onClick={() => {
                        item.setSelectedType(type)
                        item.setPage(1)
                        navigate(TYPE_ROUTE + '/' + type.id)
                    }} 
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;