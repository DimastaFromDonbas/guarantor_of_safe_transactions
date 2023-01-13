import { Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"

function UserInput() {
    return <div className="bg-img">
        <Header/>
        <div style={{paddingBottom: "117px"}} class="wraper">
            <h3 class="header-inner_title login-inner_title">Авторизация</h3>
                <hr className="hr-viss"/>
                <Form className="width-form">
                     <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="color-input-name">Логин:</Form.Label>
                        <Form.Control type="email" placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="color-input-name">Пароль:</Form.Label>
                        <Form.Control type="password" placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                         <Link className="link-hover-effects" to="/registr">Нет учетной записи? Зарегистрируйте!</Link>
                    </Form.Group>
                    <button className="btn-class-v2">Войти</button>
                </Form>
        </div>
        <Footer/>
    </div>
}

export default UserInput