import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../index";
import {createOrder} from "../../http/orderAPI";
import {observer} from "mobx-react-lite";
import { jwtDecode } from 'jwt-decode';

const AddOrder = observer(({show, onHide}) => {
    const { item } = useContext(Context)
    const [address, setAddress] = useState('')

    const addOrder = () => {
        const order = {
            address: address,
            userId: jwtDecode(localStorage.getItem('token')).id,
            items: item.basket_items,
            status: "НОВЕ"
        }

        createOrder(order).then(data => {
            onHide()
            window.location.reload()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >   
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оформлення замовлення
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть адрес доставки"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="outline-danger" 
                    onClick={onHide}
                >
                    Закрити
                </Button>
                <Button 
                    variant="outline-success" 
                    onClick={addOrder}
                >
                    Замовити
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddOrder;