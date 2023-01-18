import { Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { axiosLogin } from "../../api/axios";
import { reducerTypes } from "../../store/Users/types";
import { useNavigate } from "react-router-dom";

function UserInput() {

    const dispatch = useDispatch();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState("Логин не может быть пустым");
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
    const [ formValid, setFormValid] = useState(false);
    const navigate = useNavigate()

    const blurHandler = (e) => {
        switch(e.currentTarget.name) {
          case 'login':
            setEmailDirty(true)
          break;
          case 'password':
            setPasswordDirty(true)
          break;
          default:
        }
      }
  
      function loginUser(e) {
        setLogin(e.currentTarget.value)
        // if(!validator.isEmail(e.currentTarget.value)) {
        //   setEmailError('Некоректный логин')
        // } else {
          setEmailError('')
        //}
      }
  
      function passwordUser(e) {
        setPassword(e.currentTarget.value)
        if(e.target.value.length < 4) {
          setPasswordError('Некоректный пароль')
          if(!e.target.value){
            setPasswordError('Пароль не может быть пустым')
          }
        } else {
          setPasswordError('')
        }
      }
  
      useEffect(() => {
        if(emailError || passwordError) {
          setFormValid(false)
        } else {
          setFormValid(true)
        }
      },[emailError, passwordError])

      function offReserch(e) {
        e.preventDefault()
      }

      async function getUsers(e) {
        offReserch(e);
        dispatch({
          type: reducerTypes.GET_USER,
          payload: await axiosLogin(login, password)
        });
        navigate('/')
      }
  
    return <div className="bg-img">
        <Header/>
        <div style={{paddingBottom: "117px"}} className="wraper">
            <h3 className="header-inner_title login-inner_title">Авторизация</h3>
                <hr className="hr-viss"/>
                <Form className="width-form">
                     <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="color-input-name">Логин:</Form.Label>
                        <Form.Control onBlur={e => blurHandler(e)} name='login' value={login} onChange={loginUser} type="email" placeholder="" />
                        {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div> }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="color-input-name">Пароль:</Form.Label>
                        <Form.Control onBlur={e => blurHandler(e)} name='password' value={password} onChange={passwordUser} type="password" placeholder="" />
                        {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                         <Link className="link-hover-effects" to="/registr">Нет учетной записи? Зарегистрируйте!</Link>
                    </Form.Group>
                    <button disabled={!formValid} onClick={(e) => getUsers(e)} className="btn-class-v2">Войти</button>
                </Form>
        </div>
        <Footer/>
    </div>
}

export default UserInput