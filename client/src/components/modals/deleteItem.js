import React, {useContext, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {fetchItems, deleteItem} from "../../http/itemAPI";
import {observer} from "mobx-react-lite";

const DeleteItem = observer(({show, onHide}) => {
    const {item} = useContext(Context)

    useEffect(() => {
        fetchItems(null, null, 90, 90).then(data => {
              item.setItems(data.rows)
              item.setTotalCount(data.count)
        })
    }, [])

    const removeItem = () => {
        if (item.selectedItem.id) {
            deleteItem(item.selectedItem.id).then(data => {
                item.setSelectedItem({}); 
                onHide(); 
            });
        }
        window.location.reload()

    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Видалити позицію
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{item.selectedItem.name || "Оберіть позицію для видалення"}</Dropdown.Toggle>
                        <Dropdown.Menu style={{overfloY: 'auto'}}>
                            {item.items.map(oneItem =>
                                <Dropdown.Item
                                    onClick={() => item.setSelectedItem(oneItem)}
                                    key={oneItem.id}
                                >
                                    {oneItem.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={removeItem}>Видалити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteItem;