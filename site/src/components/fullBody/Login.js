import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";


function Login() {
    return <div className="bg-img">
        <Header/>
        <div class="wraper">
            <h3 class="header-inner_title login-inner_title">Регистрация</h3>
                <hr className="hr-viss"/>
                <Form className="width-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="color-input-name">Имя пользователя</Form.Label>
                        <Form.Control type="email" placeholder="" />
                        <Form.Text className="text-muted">
                        Пожалуйста, используйте только латинские буквы.
                        </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="color-input-name">Действующий e-mail:</Form.Label>
                        <Form.Control type="email" placeholder="" />
                        <Form.Text className="text-muted">
                        Пожалуйста, убедитесь, что email, указан верно.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="color-input-name">Пароль:</Form.Label>
                        <Form.Control type="password" placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="color-input-name">Подтвердить пароль:</Form.Label>
                        <Form.Control type="password" placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <div style={{display:"flex"}}>
                        <Form.Check style={{marginRight: '5px'}} type="checkbox" />  <Link className="link-hover-effects" to="#">Я ознакомлен с "Пользовательским соглашением"</Link>
                        </div>
                    </Form.Group>
                    <button className="btn-class-v2">Отправить</button>
                </Form>
        </div>
        <Footer/>
</div>
}

export default Login;