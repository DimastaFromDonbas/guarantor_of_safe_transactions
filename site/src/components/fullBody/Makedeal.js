
import { useState } from "react"
import { Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"


function Makedeal() {

    const [role, setRole] = useState('Покупатель')
    const [suma ,setSum] = useState(0)
    const [comis ,setComis] = useState(0)
    const [fullSum ,setFullSum] = useState(0)

    function calcSum(e) {
        setSum(Number(e.currentTarget.value))
        setComis(Number(e.currentTarget.value)*0.05)
        setFullSum(Number(e.currentTarget.value*0.05)+Number(e.currentTarget.value))
    }

    return <div className="bg-img"> 
        <Header />
            <div className="container wrap">
                <div className="name-add_sell">
                    <div className="form-size-flex">
                    <Form.Label htmlFor="inputPassword5">Название сделки</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputText"
                    />
                    </div>
                    <div className="form-size-flex">
                    <Form.Label htmlFor="inputPassword5">Ваша роль</Form.Label>
                    <Form.Select onChange={(e) => setRole(e.currentTarget.value)} aria-label="Default select example">
                        <option>Покупатель</option>
                        <option>Продавец</option>
                    </Form.Select>
                    </div>
                    <div className="form-size-flex">
                    <Form.Label htmlFor="inputPassword5">{role}</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputText"
                    />
                    </div>
                </div>
                <div className="name-add_sell">
                    <div className="form-size-flex">
                    <Form.Label>Описание сделки</Form.Label>
                    <Form.Control as="textarea" rows={6} />
                    </div>
                    <div className="form-size-flex">
                    <Form.Label htmlFor="inputPassword5">Сумма сделки :</Form.Label>
                    <Form.Control
                        onChange={(e) => calcSum(e)}
                        className="inpu-summary"
                        type="text"
                        id="inputText"
                    />
                    </div>
                </div>
                <div className="name-add_sell">
                    <div className="form-size-flex">
                    <Form.Label>Расчет суммы сделки с учетом комиссии</Form.Label>
                    </div>
                    <div className="form-size-flex">
                    <Form.Label>Сумма сделки</Form.Label>
                    <Form.Label>{suma} руб</Form.Label>
                    </div>
                    <div className="form-size-flex">
                    <Form.Label>Комиссия сервиса</Form.Label>
                    <Form.Label>{comis} руб</Form.Label>
                    </div>
                    <div className="form-size-flex">
                    <Form.Label>Итоговая сумма сделки</Form.Label>
                    <Form.Label>{fullSum} руб</Form.Label>
                    </div>
                </div>
                <Link style={{textDecoration: "none"}} to="/makedeal"><button className='btn-class-v3'>Создать сделку</button></Link>
            </div>
        <Footer />
    </div>
}

export default Makedeal 