import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import validator from 'validator';
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordV2, setPasswordV2] = useState("");
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState("Логин не может быть пустым");
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
    const [passwordNoChect, setpasswordNoChect] = useState('Пароль не может быть пустым')
    const [checked , setChecked] = useState(true)
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
        if(!validator.isEmail(e.currentTarget.value)) {
          setEmailError('Некоректный логин')
        } else {
          setEmailError('')
        }
      }
  
      function passwordUser(e) {
        setPassword(e.currentTarget.value)
        if(!validator.isStrongPassword(e.currentTarget.value)) {
          setPasswordError( 'Минимальная длина 8 ,а так же 1 знак')
          if(!e.currentTarget.value){
            setPasswordError('Пароль не может быть пустым')
          }
        } else {
          setPasswordError('')
        }
      }

      function passwordV2User(a) {
        setPasswordV2(a.currentTarget.value)
        if(!validator.isStrongPassword(a.currentTarget.value)) {
          setpasswordNoChect('Некоректный пароль')
          if(!a.currentTarget.value){
            setpasswordNoChect('Пароль не может быть пустым')
          }
        } else {
          setpasswordNoChect('')
        }
      }

      useEffect(() => {
        if(password === passwordV2) {
          setpasswordNoChect()
        }else {
          setpasswordNoChect('Пароли не совпадают')
        }
      },[password,passwordV2])
  
      useEffect(() => {
        if(emailError || passwordError || passwordNoChect || checked) {
          setFormValid(false)
        } else {
          setFormValid(true)
        }
      },[emailError, passwordError,passwordNoChect,checked])
      
      function offReserch(e) {
        e.preventDefault()
        navigate('/login')
      }


    return <div className="bg-img">
        <Header/>
        <div className="wraper">
            <h3 className="header-inner_title login-inner_title">Регистрация</h3>
                <hr className="hr-viss"/>
                <Form className="width-form">
                    <Form.Group className="mb-3" controlId="formBasicEmailV1">
                    <Form.Label className="color-input-name">Имя пользователя</Form.Label>
                        <Form.Control type="text" placeholder="" />
                        <Form.Text className="text-muted">
                        Пожалуйста, используйте только латинские буквы.
                        </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmailV2">
                    <Form.Label className="color-input-name">Действующий e-mail:</Form.Label>
                        <Form.Control onBlur={e => blurHandler(e)} name='login' value={login} onChange={loginUser} type="email" placeholder="" />
                        {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div> }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPasswordV1">
                        <Form.Label className="color-input-name">Пароль:</Form.Label>
                        <Form.Control onBlur={e => blurHandler(e)} name='password' value={password} onChange={passwordUser} type="password" placeholder="" />
                        {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPasswordV2">
                        <Form.Label className="color-input-name">Подтвердить пароль:</Form.Label>
                        <Form.Control value={passwordV2} onChange={passwordV2User} type="password" placeholder="" />
                        {passwordNoChect && <div style={{color: 'red'}}>{passwordNoChect}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <div style={{display:"flex"}}>
                        <Form.Check checked={!checked} onChange={() => setChecked(!checked)} style={{marginRight: '5px'}} type="checkbox" />  <Link className="link-hover-effects" to="/rules">Я ознакомлен с "Пользовательским соглашением"</Link>
                        </div>
                    </Form.Group>
                    <button disabled={!formValid} onClick={offReserch} className="btn-class-v2">Отправить</button>
                </Form>
        </div>
        {/* <button onClick={() => getUsers(tocken)} className="btn-class-v2">Отправить</button> */}
        <Footer/>
</div>
}

export default Login;