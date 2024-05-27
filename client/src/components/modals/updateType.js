import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {fetchTypes, updateType} from "../../http/typeAPI";
import {observer} from "mobx-react-lite";

const UpdateType = observer(({show, onHide}) => {
    const {item} = useContext(Context)
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)

    useEffect(() => {
        fetchTypes().then(data => item.setTypes(data))
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const putType = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('img', file)
        updateType(item.selectedType.id, formData).then(data => {
            item.setSelectedType({}); 
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
                    Оновити категорію
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{item.selectedType.name || "Оберіть категорію"}</Dropdown.Toggle>
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
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                        placeholder='Виберіть зображення'
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
                    onClick={putType}
                >
                    Оновити
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateType;