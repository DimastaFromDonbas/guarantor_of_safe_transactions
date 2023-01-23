
import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import Footer from "./Footer"
import Header from "./Header"
import { useAppSelector } from "../../store/reduxHooks"
import { axiosCreateDeal } from "../../api/axios"
import validator from 'validator';
import Chat from "./Chat"

function Makedeal() {
    const {user} = useAppSelector ((store) => store.user)
    const [role, setRole] = useState('Покупатель')
    const [suma ,setSum] = useState("0")
    const [comis ,setComis] = useState(0)
    const [fullSum ,setFullSum] = useState(0)
    const [name, setname] = useState('')
    const [buyer, setBuyer] = useState('')
    const [seller, setSeller] = useState('')
    const [description, setDescription] = useState('')
    const [errorName, setErrorName] = useState('Введите навазние сделки')
    const [errorRoleEmail, setErrorroleEmail] = useState("Введите логин продавца")
    const [errorSumm, setErrorSumm] = useState('Введите сумму')
    const [checked,setChecked] = useState(false)

    function calcSum(e) {
        setSum(Number(e.currentTarget.value))
        setComis(Number(e.currentTarget.value)*0.05)
        setFullSum(Number(e.currentTarget.value*0.05)+Number(e.currentTarget.value))
    }

    function sumFull(e) {
        setSum(e.currentTarget.value)
          if(!e.target.value){
            setErrorSumm('Введите сумму')
        } else {
            setErrorSumm('')
        }
    }

    function emailFull(e) {
        if(!validator.isEmail(e.currentTarget.value)) {
            setErrorroleEmail('Логин введен не верно')
          } else {
            setErrorroleEmail('')
          }
    }

    function nameFull(e) {
        setname(e.currentTarget.value)
          if(!e.target.value){
            setErrorName('Введите навазние сделки')

        } else {
            setErrorName('')
        }
    }

    function setBuyerOrSeller(value){
       if(role === 'Покупатель') { 
        setSeller(value)
        setBuyer(user.email)
    } else{
        setBuyer(value)
        setSeller(user.email)}

    }

    function changeRole (role) {
        if(role === 'Покупатель') { 
            setSeller(buyer)
            setBuyer(user.email)
        } else{
            setBuyer(seller)
            setSeller(user.email)}
    }

    async function createDeal(){
        await axiosCreateDeal(name, buyer, seller, suma, description)
    }

    useEffect(() => {
        if(errorName || errorRoleEmail || errorSumm) {
            setChecked(false)
        } else {
            setChecked(true)
        }
      },[errorName,errorRoleEmail,errorSumm])

    return <div className="bg-img"> 
        <Header />
            <Chat />
            <div className="container wrap">
                <div className="name-add_sell">
                    <div className="form-size-flex">
                    <div style={{display: "flex", flexDirection: "row"}}>
                    <Form.Label htmlFor="inputPassword5">Название сделки</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputText"
                        value={name}
                        onChange={(e) => nameFull(e)}
                    />
                    </div>
                    {errorName && <div style={{textAlign: "center", color: 'red', marginLeft: '-15px'}}>{errorName}</div> }
                    </div>
                    <div className="form-size-flex">
                    <div style={{display: "flex", flexDirection: "row"}}>
                    <Form.Label htmlFor="inputPassword5">Ваша роль</Form.Label>
                    <Form.Select onChange={(e) => {
                        changeRole(e.currentTarget.value)
                        setRole(e.currentTarget.value)}} aria-label="Default select example">
                        <option>Покупатель</option>
                        <option>Продавец</option>
                    </Form.Select>
                    </div>
                    </div>
                    <div className="form-size-flex">
                    <div style={{display: "flex", flexDirection: "row"}}>
                    <Form.Label htmlFor="inputPassword5">{role === 'Покупатель'? 'Продавец' : 'Покупатель'}</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputText"
                        value={role === 'Покупатель'? seller : buyer}
                        onChange={(e) => {
                        emailFull(e)
                        setBuyerOrSeller(e.currentTarget.value)}}
                    />
                    </div>
                    {errorRoleEmail && <div style={{textAlign: "center", color: 'red',marginLeft: '-20px'}}>{errorRoleEmail}</div>}
                    </div>
                </div>
                <div className="name-add_sell">
                    <div className="form-size-flex">
                    <div style={{display: "flex", flexDirection: "row"}}>
                    <Form.Label>Описание сделки</Form.Label>
                    <Form.Control as="textarea" rows={6} value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
                    </div>
                    </div>
                    <div className="form-size-flex">
                    <div style={{display: "flex", flexDirection: "row"}}>
                    <Form.Label htmlFor="inputPassword5">Сумма сделки :</Form.Label>
                    <Form.Control
                        onChange={(e) => {
                        calcSum(e) 
                        sumFull(e)}}
                        className="inpu-summary"
                        type="number"
                        id="inputText"
                    />
                    </div>
                    {errorSumm && <div style={{textAlign: "center", color: 'red', marginLeft: '-85px'}}>{errorSumm}</div> }
                    </div>
                </div>
                <div className="name-add_sell">
                    <div className="form-size-flex">
                    <Form.Label>Расчет суммы сделки с учетом комиссии</Form.Label>
                    </div>
                    <div className="form-size-flex">
                    <div style={{display: "flex", flexDirection: "row"}}>
                    <Form.Label>Сумма сделки</Form.Label>
                    <Form.Label>{suma} руб</Form.Label>
                    </div>
                    </div>
                    <div className="form-size-flex">
                    <div style={{display: "flex", flexDirection: "row"}}>
                    <Form.Label>Комиссия сервиса</Form.Label>
                    <Form.Label>{comis} руб</Form.Label>
                    </div>
                    </div>
                    <div className="form-size-flex">
                    <div style={{display: "flex", flexDirection: "row"}}>
                    <Form.Label>Итоговая сумма сделки</Form.Label>
                    <Form.Label>{fullSum} руб</Form.Label>
                    </div>
                    </div>
                </div>
               <button disabled={!checked} className='btn-class-v3' onClick={createDeal}>Создать сделку</button>
            </div>
        <Footer />
    </div>
}

export default Makedeal 