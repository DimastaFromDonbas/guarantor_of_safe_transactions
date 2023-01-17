import { Form } from "react-bootstrap"
import Footer from "./Footer"
import Header from "./Header"
import { useDispatch } from 'react-redux';
import { reducerTypes } from "../../store/Users/types";
import { axiosChangeNickname } from "../../api/axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/reduxHooks";

function Settings() {

    const dispatch = useDispatch();
    const {user} = useAppSelector ((store) => store.user)
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [formValid, setFormValid] = useState(false);

    function changeNickname(e) {
        setNickname(e.currentTarget.value)
    }

    function getPassword(e) {
        setPassword(e.currentTarget.value)
    }

    async function getNicknames(e) {
        e.preventDefault()
        dispatch({
          type: reducerTypes.GET_USER,
          payload: await axiosChangeNickname(nickname, user.id, user.password)
        });
    }

    useEffect(() => {
        if(user.password === password) {
            if(nickname !== ''){
                setFormValid(true)
            }
        } else {
            setFormValid(false)
        }
      },[nickname, password])

    return <div className="bg-img">
        <Header />
            <div style={{paddingBottom: "117px"}} className="wraper">
                <h3 className="header-inner_title login-inner_title">Настройки</h3>
                    <hr className="hr-viss"/>
                    <Form className="width-form">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="color-input-name">Сменить ваше имя:</Form.Label>
                            <Form.Control value={nickname} onChange={changeNickname} name='login' type="email" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="color-input-name">Введите ваш пароль:</Form.Label>
                            <Form.Control value={password} onChange={getPassword} name='password' type="password" placeholder="" />
                            {user.password!==password? <div style={{color: 'red'}}>Проверьте пароль, вы ошиблись</div> : ''}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        </Form.Group>
                        <button disabled={!formValid} onClick={(e) => getNicknames(e)} className="btn-class-v2">Сменить ник</button>
                    </Form>
            </div>
        <Footer />
    </div>
}

export default Settings