import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import AddType from '../components/modals/addType';
import AddItem from '../components/modals/addItem';
import UpdateType from '../components/modals/updateType';
import UpdateItem from '../components/modals/updateItem';
import DeleteType from '../components/modals/deleteType';
import DeleteItem from '../components/modals/deleteItem';

const Admin = () => {
  const [typeAddVisible, setTypeAddVisible] = useState(false)
  const [typeUpdateVisible, setTypeUpdateVisible] = useState(false)
  const [typeDeleteVisible, setTypeDeleteVisible] = useState(false)
  const [itemAddVisible, setItemAddVisible] = useState(false)
  const [itemUpdateVisible, setItemUpdateVisible] = useState(false)
  const [itemDeleteVisible, setItemDeleteVisible] = useState(false)

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center'>
      <h1 className='mt-3'>Керування категоріями</h1>
      <div className='type-control' style={{display: 'flex', justifyContent: 'space-around', width: "50%"}}>
        <Button 
          variant={'outline-dark'} 
          className='mt-4 p-2' 
          onClick={() => setTypeAddVisible(true)}
          style={{height: 100, width: 150}}

        >
          Додати
        </Button>
        <Button 
          variant={'outline-dark'} 
          className='mt-4 p-2' 
          onClick={() => setTypeUpdateVisible(true)}
          style={{height: 100, width: 150}}

        >
          Оновити
        </Button>
        <Button 
          variant={'outline-dark'} 
          className='mt-4 p-2' 
          onClick={() => setTypeDeleteVisible(true)}
          style={{height: 100, width: 150}}

        >
          Видалити
        </Button>
      </div>
      <hr/>
      <h1 className='mt-3'>Керування асортиментом</h1>
      <div className='item-control' style={{display: 'flex', justifyContent: 'space-around', width: "50%"}}>
        <Button 
          variant={'outline-dark'} 
          className='mt-4 p-2' 
          onClick={() => setItemAddVisible(true)}
          style={{height: 100, width: 150}}

        >
          Додати
        </Button>
        <Button 
          variant={'outline-dark'} 
          className='mt-4 p-2' 
          onClick={() => setItemUpdateVisible(true)}
          style={{height: 100, width: 150}}

        >
          Оновити
        </Button>
        <Button 
          variant={'outline-dark'} 
          className='mt-4 p-2' 
          onClick={() => setItemDeleteVisible(true)}
          style={{height: 100, width: 150}}
        >
          Видалити
        </Button>
      </div>
      <AddType show={typeAddVisible} onHide={() => setTypeAddVisible(false)}/>
      <AddItem show={itemAddVisible} onHide={() => setItemAddVisible(false)}/>
      <UpdateType show={typeUpdateVisible} onHide={() => setTypeUpdateVisible(false)}/>
      <UpdateItem show={itemUpdateVisible} onHide={() => setItemUpdateVisible(false)}/>
      <DeleteType show={typeDeleteVisible} onHide={() => setTypeDeleteVisible(false)}/>
      <DeleteItem show={itemDeleteVisible} onHide={() => setItemDeleteVisible(false)}/>
    </Container>
  );
};

export default Admin;