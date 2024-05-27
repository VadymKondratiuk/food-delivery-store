import React, {useContext, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form } from "react-bootstrap";
import {Context} from "../../index";
import {deleteType, fetchTypes} from "../../http/typeAPI";
import {observer} from "mobx-react-lite";

const DeleteType = observer(({show, onHide}) => {
    const {item} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => item.setTypes(data))
    }, [])

    const removeType = () => {
        if (item.selectedType.id) {
            deleteType(item.selectedType.id).then(data => {
                fetchTypes().then(data => item.setTypes(data)); 
                item.setSelectedType({}); 
                onHide(); 
                window.location.reload()
            });
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Видалити категорію
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{item.selectedType.name || "Оберіть категорію для видалення"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {item.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => item.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
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
                    onClick={removeType}
                >
                    Видалити
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteType;