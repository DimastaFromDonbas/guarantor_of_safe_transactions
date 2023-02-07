import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { axiosGetAllDeal } from "../../../api/axios"
import { useAppSelector } from "../../../store/reduxHooks"
import { reducerTypes } from "../../../store/Users/types"
import { axiosChangeDeal } from "../../../api/axios"
import { dealStatusMock } from "../../mock/OutputMock"

function DealID() {

    const { id } = useParams()
    const dispatch = useDispatch();
    const { allDeals, user } = useAppSelector ((store) => store.user)
    const [ currentDeal, setCurrentDeal ] = useState(null)
    const [ nameDeal,setNameDeal ] = useState('')
    const [ sumDeal, setSumDeal ] = useState()
    const [ statusDeal, setStatusDeal ] = useState()
    const [ descriptionDeal,setDescriptionDeal ] = useState('')
    const [errorDescription,setErrorDescription] = useState('')
    const [errorSumDeal,setErrorSumDeal] = useState('')

    async function getAllDeals(){
        const data = await axiosGetAllDeal();
        if(data) {
        dispatch({
          type: reducerTypes.GET_ALL_DEALS,
          payload: data,
        });}
      }

    function setDescpittions(e) {
        setDescriptionDeal(e.target.value)
        if (e.target.value?.length < 30 ) {
            setErrorDescription('Минимальное количествое 30 символов')
        } else if(!e.target.value) {
            setErrorDescription('Поле не может быть пустым')
        } else {
            setErrorDescription('')
        }
    }

    function sumFull(e) {
        setSumDeal(e.currentTarget.value || 0)
          if(!e.target.value){
            setErrorSumDeal('Введите сумму') 
        }else if(e.target.value < 2000) {
            setErrorSumDeal('Минимальная сумма 2000р') 
        }else {
            setErrorSumDeal('')
        }
    }

      async function changeDeal() {
        if(descriptionDeal?.length < 30) return alert('Описание должно состоять минимум из 30 символов');
        if(!nameDeal || !sumDeal || !statusDeal) return alert('Введите все данные');
        if(sumDeal < 2000) return alert('Минимальная сумма 2000 рублей');
        const result = await axiosChangeDeal(currentDeal?.id, nameDeal, sumDeal, Number(statusDeal), descriptionDeal, user?.email, user?.password);
        if(result) {
            getAllDeals();
         return alert('Успешно')
        };
        alert('Что-то пошло не так')
     }

    useEffect(() => {
        const temporaryDeal = allDeals?.filter(item => item.id === Number(id))[0]
        if(temporaryDeal) {
        setCurrentDeal(temporaryDeal)
        setNameDeal(temporaryDeal?.name)
        setSumDeal(temporaryDeal?.sum)
        setStatusDeal(temporaryDeal?.status)
        setDescriptionDeal(temporaryDeal?.description)
        }
         // eslint-disable-next-line 
       },[allDeals])

       useEffect(() => {
        getAllDeals();
         // eslint-disable-next-line 
       },[])

    return <>
        <div style={{display: 'flex',minHeight: '100vh',justifyContent: "center",}} className='styleAdminPanel'>
            <div style={{width: "100%",display: "flex",flexDirection: "column",alignItems: "center",background: "rgba(17, 17, 18, 0.65)"}}>
                <div style={{marginTop:'20px',color: "white"}}>
                    <div style={{borderRadius: "5px"}} className="tabl-flex-admin">
                        <div style={{textAlign: 'center' ,width:'50px'}} className="output-id">ID</div>
                        <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Название сделки</div>
                        <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Имя покупателя</div>
                        <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Имя продавца</div>
                        <div style={{textAlign: 'center' ,width:'210px'}} className="output-date">Почта покупателя</div>
                        <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Почта продавца</div>
                        <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Cумма сделки</div>
                        <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Статус сделки</div>
                        <div style={{textAlign: 'center' ,width:'210px'}} className="output-date">Описание</div>
                    </div>
                    { <div style={{marginTop:'5px',borderRadius:'5px'}} className="tabl-flex-admin-user" key={currentDeal?.email}>
                        <div style={{width:'50px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-id">{currentDeal?.id}</div>
                        <div style={{width:'155px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{nameDeal}</div>
                        <div style={{width:'155px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{currentDeal?.buyerNickname}</div>
                        <div style={{width:'155px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{currentDeal?.sellerNickname}</div>
                        <div style={{width:'155px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center",overflowWrap: "anywhere"}} className="output-sum">{currentDeal?.buyer}p</div>
                        <div style={{width:'210px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center",overflowWrap: "anywhere"}} className="output-id">{currentDeal?.seller}</div>
                        <div style={{width:'155px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{sumDeal}</div>
                        <div style={{width:'155px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{dealStatusMock[statusDeal - 1]}</div>
                        <div style={{width:'210px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center",overflowWrap: "anywhere"}} className="output-id">{descriptionDeal}</div>
                    </div>}
                    <div className='pages-user-box-2'>
                        <div style={{flexDirection: "column"}} className='pages-user-block'>
                            <h6 style={{margin: "0",textAlign: "center"}}>Изменение названия сделки</h6>
                            <input
                                onChange={(e) => setNameDeal(e.target.value)}
                                className="tabl-flex-admin-user-scores "
                                style={{color: "white",borderRadius: "5px"}}
                                type="text"
                                name="name"
                                placeholder="Изменение денег пользователя"
                                autoComplete="off"
                                required
                                value={nameDeal || ''}
                            />
                        </div>
                        <div style={{flexDirection: "column"}} className='pages-user-block'>
                            <h6 style={{margin: "0",textAlign: "center"}}>Изменение суммы сделки</h6>
                            <input
                                onChange={sumFull}
                                className="tabl-flex-admin-user-scores "
                                style={{color: "white",borderRadius: "5px"}}
                                type="number"
                                name="name"
                                placeholder="Изменение денег пользователя"
                                autoComplete="off"
                                required
                                value={sumDeal || 0}
                            />
                            <h6 style={{overflowWrap: "anywhere"}}>{errorSumDeal}</h6>
                        </div>
                        <div style={{flexDirection: "column"}} className='pages-user-block'>
                            <h6 style={{margin: "0",textAlign: "center"}}>Изменение статуса сделки</h6>
                            <select
                                onChange={(e) => setStatusDeal(e.target.value)}
                                style={{color: "white",borderRadius: "5px"}}
                                className="tabl-flex-admin-user-scores " 
                                name="select"
                                value={String(statusDeal || 1)}> 
                                    <option value='1'>Открыта</option>
                                    <option value='2'>В обработке</option>
                                    <option value='3'>Закрыта</option>
                            </select>
                        </div>
                        <div style={{flexDirection: "column"}} className='pages-user-block'>
                            <h6 style={{margin: "0",textAlign: "center"}}>Изменение описания сделки</h6>
                            <input
                                onChange={setDescpittions}
                                className="tabl-flex-admin-user-scores "
                                style={{color: "white",borderRadius: "5px"}}
                                type="text"
                                name="name"
                                placeholder="Изменение денег пользователя"
                                autoComplete="off"
                                required
                                value={descriptionDeal || ''}
                            />
                            <h6 style={{overflowWrap: "anywhere"}}>{errorDescription}</h6>
                        </div>
                    </div>
                    <div style={{width:'100%',display: "flex",marginTop:"20px",justifyContent: "center"}}>
                        <div className="tabl-flex-admin-button-global" onClick={changeDeal}>
                            Внести изменения
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default DealID