import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../store/reduxHooks"

function DealID() {

    const { id } = useParams()
    const { allDeals } = useAppSelector ((store) => store.user)
    const [ currentDeal, setCurrentDeal ] = useState(null)
    const [ nameDeal,setNameDeal ] = useState('')
    const [ sumDeal, setSumDeal ] = useState()
    const [ statusDeal, setStatusDeal ] = useState()
    const [ descriptionDeal,setDescriptionDeal ] = useState('')
    const status = ['Открыта', 'В обработке', 'Выполнена']

    useEffect(() => {
        const temporaryDeal = allDeals?.filter(item => item.id === Number(id))[0]
        if(temporaryDeal) {
        setCurrentDeal(temporaryDeal)
        setNameDeal(temporaryDeal?.name)
        setSumDeal(temporaryDeal?.sum)
        setStatusDeal(status[temporaryDeal?.status === 0? temporaryDeal?.status : temporaryDeal?.status -1 ])
        setDescriptionDeal(temporaryDeal?.description)
        }
         // eslint-disable-next-line 
       },[allDeals])

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
                        <div style={{width:'50px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-id">{currentDeal?.id}</div>
                        <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{nameDeal}</div>
                        <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{currentDeal?.buyerNickname}</div>
                        <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{currentDeal?.sellerNickname}</div>
                        <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",overflowWrap: "anywhere"}} className="output-sum">{currentDeal?.buyer}p</div>
                        <div style={{width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",overflowWrap: "anywhere"}} className="output-id">{currentDeal?.seller}</div>
                        <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{sumDeal}</div>
                        <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{statusDeal}</div>
                        <div style={{width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",overflowWrap: "anywhere"}} className="output-id">{descriptionDeal}</div>
                    </div>}

                    <div className='pages-user-box-2'>
                        <div style={{flexDirection: "column"}} className='pages-user-block'>
                            <h6 style={{margin: "0",textAlign: "center"}}>Изменение названия сделки</h6>
                            <input
                                onChange={(e) => setNameDeal(e.target.value)}
                                className="tabl-flex-admin-user-scores "
                                style={{color: "white",borderRadius: "5px"}}
                                type="number"
                                name="name"
                                placeholder="Изменение денег пользователя"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div style={{flexDirection: "column"}} className='pages-user-block'>
                            <h6 style={{margin: "0",textAlign: "center"}}>Изменение суммы сделки</h6>
                            <input
                                onChange={(e) => setSumDeal(e.target.value)}
                                className="tabl-flex-admin-user-scores "
                                style={{color: "white",borderRadius: "5px"}}
                                type="number"
                                name="name"
                                placeholder="Изменение денег пользователя"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div style={{flexDirection: "column"}} className='pages-user-block'>
                            <h6 style={{margin: "0",textAlign: "center"}}>Изменение статуса сделки</h6>
                            <select
                                onChange={(e) => setStatusDeal(e.target.value)}
                                style={{color: "white",borderRadius: "5px"}}
                                className="tabl-flex-admin-user-scores " 
                                name="select"> 
                                    <option value="" selected></option>
                                    <option value="Открыта">Открыта</option>
                                    <option value="В обработке">В обработке</option>
                                    <option value="Закрыта">Закрыта</option>
                            </select>
                        </div>
                        <div style={{flexDirection: "column"}} className='pages-user-block'>
                            <h6 style={{margin: "0",textAlign: "center"}}>Изменение описания сделки</h6>
                            <input
                                onChange={(e) => setDescriptionDeal(e.target.value)}
                                className="tabl-flex-admin-user-scores "
                                style={{color: "white",borderRadius: "5px"}}
                                type="text"
                                name="name"
                                placeholder="Изменение денег пользователя"
                                autoComplete="off"
                                required
                            />
                        </div>
                    </div>
                    <div style={{width:'100%',display: "flex",marginTop:"20px",justifyContent: "center"}}>
                        <div className="tabl-flex-admin-button-global">
                            Внести изменения
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default DealID