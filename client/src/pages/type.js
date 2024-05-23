import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/typeBar";
import ItemList from '../components/itemList';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchItems} from "../http/itemAPI";
import {fetchTypes} from "../http/typeAPI";

const Type = observer(() => {
    const {item} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => item.setTypes(data))
        // fetchItems(null, null, 1, 5).then(data => {
        //   item.setItems(data.rows)
        //   item.setTotalCount(data.count)
        // })
    }, [])

    useEffect(() => {
        fetchItems(item.selectedType.id, item.page, 20).then(data => {
          item.setItems(data.rows)
          item.setTotalCount(data.count)
        })
    }, [item.page, item.selectedType])

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <ItemList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Type;