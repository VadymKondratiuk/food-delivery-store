import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {createItem} from "../../http/itemAPI";
import {fetchTypes} from "../../http/typeAPI";
import {observer} from "mobx-react-lite";

const AddItem = observer(({show, onHide}) => {
    const {item} = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)

    useEffect(() => {
        fetchTypes().then(data => item.setTypes(data))
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addItem = () => {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('typeId', item.selectedType.id)
        createItem(formData).then(data => {
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
                    Додати позицію
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{item.selectedType.name || "Оберіть тип"}</Dropdown.Toggle>
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
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть назву"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введіть вартість"
                        type="number"
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть опис"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
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
                    onClick={addItem}
                >
                    Додати
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddItem;