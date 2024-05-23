import React, { useState } from 'react'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { useContext } from 'react';
import { registration, login } from '../http/userAPI';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if(isLogin) {
                data = await login(email, password)
            }
            else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
            toast.success('Успішна авторизація!', {
                position: "bottom-right",
                autoClose: 2000,
                theme: "light",
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        catch(err) {
            toast.error(err.response.data.message, {
                position: "bottom-right",
                autoClose: 2000,
                theme: "light",
            });
        }
    }

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{height: window.innerHeight - 124}}>
            <Card style={{width: 600}} className='p-5'>
                <h2>{isLogin ? 'Вхід' : "Реєстрація"}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control 
                      className='mt-2' 
                      placeholder='Введіть електронну адресу'    
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control 
                      className='mt-2' 
                      placeholder='Введіть пароль' 
                      type='password' 
                      value={password} 
                      onChange={e => setPassword(e.target.value)}
                    />
                </Form>
                <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                    {isLogin ?
                        <div>Немає аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зареєструйтесь</NavLink></div>
                        :
                        <div>Маєте аккаунт? <NavLink to={LOGIN_ROUTE}>Увійдіть</NavLink></div>
                    }
                    <Button variant={'outline-success'} onClick={() => click()}>{isLogin ? "Вхід" : "Зареєструватися"}</Button>
                </Row>
            </Card>
        </Container>
    );
})

export default Auth;