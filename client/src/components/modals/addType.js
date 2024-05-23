import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createType} from "../../http/typeAPI";
import {observer} from "mobx-react-lite";

const AddType = observer(({show, onHide}) => {
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addType = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('img', file)
        createType(formData).then(data => {
            onHide()
        })
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
                    Додати категорію
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
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
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addType}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddType;