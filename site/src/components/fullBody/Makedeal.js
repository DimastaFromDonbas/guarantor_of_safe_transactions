
import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import Footer from "./Footer"
import Header from "./Header"
import { useAppSelector } from "../../store/reduxHooks"
import { axiosCreateDeal } from "../../api/axios"
import validator from 'validator';
import Chat from "./Chat"
import { useNavigate } from "react-router-dom"

function Makedeal() {
    const navigate = useNavigate()
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
    const [errorDescription, setErrorDescription] = useState('Минимальное количествое 30 символов')
    const [checked,setChecked] = useState(false)

    function setDescriptionAll(e) {
        setDescription(e.currentTarget.value)
        if (e.currentTarget.value?.length < 30 ) {
            setErrorDescription('Минимальное количествое 30 символов')
        } else if(!e.currentTarget.value) {
            setErrorDescription('Поле не может быть пустым')
        } else {
            setErrorDescription('')
        }
    }

    function calcSum(e) {
        setSum(Number(e.currentTarget.value))
        setComis(Number(e.currentTarget.value)*0.05)
        setFullSum(Number(e.currentTarget.value*0.05)+Number(e.currentTarget.value))
    }

    function sumFull(e) {
        setSum(e.currentTarget.value)
          if(!e.target.value){
            setErrorSumm('Введите сумму') 
        }else if(e.target.value < 2000) {
            setErrorSumm('Минимальная сумма 2000р') 
        }else {
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
        let buyerNickname = '';
        let sellerNickname = '';
        console.log('role', role)
        if(role === 'Покупатель') {
            buyerNickname = user.nickname
        } else {
            sellerNickname = user.nickname
        }

        await axiosCreateDeal(name, buyer, seller, suma, description, buyerNickname, sellerNickname)
    }

    useEffect(() => {
        if(errorName || errorRoleEmail || errorSumm || errorDescription) {
            setChecked(false)
        } else {
            setChecked(true)
        }
      },[errorName,errorRoleEmail,errorSumm,errorDescription])

      useEffect(() => {
        if(!user?.login) {
          navigate("/")
        }
      },[user.login,navigate])

    return <div className="bg-img"> 
        <Header />
            <Chat />
            <div style={{marginTop: '20px', marginBottom:'20px'}} className="container">
                <div className="name-add_sell">
                    <div className="form-size-flex">
                    <div className="flex-adapt-makedal" style={{display: "flex", flexDirection: "row"}}>
                    <Form.Label htmlFor="inputPassword5">Название сделки</Form.Label>
                    <div style={{width: "100%",display: "flex",flexDirection: "column",alignItems: "flex-start"}}>
                    <Form.Control
                        type="text"
                        id="inputText"
                        value={name}
                        onChange={(e) => nameFull(e)}
                    />
                    {errorName && <div style={{textAlign: "center", color: 'red'}}>{errorName}</div> }
                    </div>
                    </div>
                    </div>
                    <div className="form-size-flex">
                    <div className="flex-adapt-makedal" style={{display: "flex", flexDirection: "row"}}>
                    <Form.Label htmlFor="inputPassword5">Ваша роль</Form.Label>
                    <div style={{width: "100%",display: "flex",flexDirection: "column",alignItems: "flex-start"}}>
                    <Form.Select onChange={(e) => {
                        changeRole(e.currentTarget.value)
                        setRole(e.currentTarget.value)}} aria-label="Default select example">
                        <option>Покупатель</option>
                        <option>Продавец</option>
                    </Form.Select>
                    </div>
                    </div>
                    </div>
                    <div className="form-size-flex">
                    <div className="flex-adapt-makedal" style={{display: "flex", flexDirection: "row"}}>
                    <Form.Label htmlFor="inputPassword5">{role === 'Покупатель'? 'Продавец' : 'Покупатель'}</Form.Label>
                    <div style={{width: "100%",display: "flex",flexDirection: "column",alignItems: "flex-start"}}>
                    <Form.Control
                        type="text"
                        id="inputText"
                        value={role === 'Покупатель'? seller : buyer}
                        onChange={(e) => {
                        emailFull(e)
                        setBuyerOrSeller(e.currentTarget.value)}}
                    />
                    {errorRoleEmail && <div style={{textAlign: "center", color: 'red'}}>{errorRoleEmail}</div>}
                    </div>
                    </div>
                    </div>
                </div>
                <div className="name-add_sell">
                    <div className="form-size-flex">
                    <div className="flex-adapt-makedal" style={{display: "flex", flexDirection: "row"}}>
                    <Form.Label>Описание сделки</Form.Label>
                    <div style={{width: "100%",display: "flex",flexDirection: "column",alignItems: "flex-start"}}>
                    <Form.Control style={{width: "84% !important"}} as="textarea" rows={6} value={description} onChange={(e) => setDescriptionAll(e)}/>
                    {errorDescription && <div style={{textAlign: "center", color: 'red'}}>{errorDescription}</div>}
                    </div>
                    </div>
                    </div>
                    <div className="form-size-flex">
                    <div className="flex-adapt-makedal" style={{display: "flex", flexDirection: "row"}}>
                    <Form.Label htmlFor="inputPassword5">Сумма сделки :</Form.Label>
                    <div style={{width: "100%",display: "flex",flexDirection: "column",alignItems: "flex-start"}}>
                    <Form.Control
                        onChange={(e) => {
                        calcSum(e) 
                        sumFull(e)}}
                        className="inpu-summary"
                        type="number"
                        inputmode="numeric"
                        id="inputTextSumma"
                    />
                    {errorSumm && <div style={{textAlign: "center", color: 'red'}}>{errorSumm}</div> }
                    </div>
                    </div>
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