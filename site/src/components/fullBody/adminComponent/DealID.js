import { useState } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../store/reduxHooks"

function DealID() {

    const { id } = useParams()
    const { allDeals } = useAppSelector ((store) => store.user)
    const [ nameDeal,setNameDeal ] = useState('')
    const [ sumDeal, setSumDeal ] = useState()
    const [ statusDeal, setStatusDeal ] = useState()
    const [ descriptionDeal,setDescriptionDeal ] = useState()

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
                    {allDeals?.filter( user => user.id === Number(id) )?.map((item, index) => <div style={{marginTop:'5px',borderRadius:'5px'}} className="tabl-flex-admin-user" key={item?.email}>
                        <div style={{width:'50px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-id">{item.id}</div>
                        <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.name}</div>
                        <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.buyerNickname}</div>
                        <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{item.sellerNickname}</div>
                        <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",overflowWrap: "anywhere"}} className="output-sum">{item.buyer}p</div>
                        <div style={{width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",overflowWrap: "anywhere"}} className="output-id">{item.seller}</div>
                        <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.sum}</div>
                        <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{item.status}</div>
                        <div style={{width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",overflowWrap: "anywhere"}} className="output-id">{item.description}</div>
                    </div>)}

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
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="MODERATOR">MODERATOR</option>
                                    <option value="CHATER">CHATER</option>
                                    <option value="USER">USER</option>
                            </select>
                        </div>
                        <div style={{flexDirection: "column"}} className='pages-user-block'>
                            <h6 style={{margin: "0",textAlign: "center"}}>Изменение описания сделки</h6>
                            <input
                                onChange={(e) => setDescriptionDeal(e.target.value)}
                                className="tabl-flex-admin-user-scores "
                                style={{color: "white",borderRadius: "5px"}}
                                type="number"
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