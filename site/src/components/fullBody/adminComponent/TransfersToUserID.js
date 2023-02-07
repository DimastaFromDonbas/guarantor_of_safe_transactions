import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { axiosGetAllUserToUserTransfers } from "../../../api/axios";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from "../../../store/Users/types";

function TransfersToUserID() {

    const { id } = useParams()
    const dispatch = useDispatch();
    const [ currentTransfersToUser, setCurrentTransfersToUser ] = useState(null)
    const [ transfersIDToUser, setTransfersIDToUser ] = useState()
    const [ emailTransfersToUser, setEmailTransfersToUser ] = useState('')
    const [ emailReceiverToUser, setEmailReceiverToUser ] = useState('')
    const [ scoreTransfers, setScoreTransfersToUser ] = useState()
    const [ timeTransfersToUser, setTimeTransfersToUser ] = useState('')
    const [ statusTransfersToUser, setStatusTransfersToUser ] = useState()
    const {allTransfersToUser} = useAppSelector ((store) => store.user);

    async function getAllTransfersTouser(){
        const data = await axiosGetAllUserToUserTransfers();
        if(data) {
        dispatch({
          type: reducerTypes.GET_ALL_TRANSFERS_TO_USER,
          payload: data,
        });
    }
      }
      useEffect(() => {
        const temporaryTransfersToUser = allTransfersToUser?.filter(item => item.id === Number(id))[0]
        if(temporaryTransfersToUser) {
        setCurrentTransfersToUser(temporaryTransfersToUser)
        setTransfersIDToUser(temporaryTransfersToUser?.id)
        setEmailTransfersToUser(temporaryTransfersToUser?.userEmail)
        setEmailReceiverToUser(temporaryTransfersToUser?.receiverEmail)
        setScoreTransfersToUser(temporaryTransfersToUser?.score)
        setTimeTransfersToUser(temporaryTransfersToUser?.time)
        setStatusTransfersToUser(temporaryTransfersToUser?.status)
        }
         // eslint-disable-next-line 
    },[allTransfersToUser])

    useEffect(() => {
        getAllTransfersTouser();
         // eslint-disable-next-line 
       },[])

    return <>
            <div style={{display: 'flex',minHeight: '100vh',justifyContent: "center",}} className='styleAdminPanel'>
                <div style={{width: "100%",display: "flex",flexDirection: "column",alignItems: "center",background: "rgba(17, 17, 18, 0.65)"}}>
                    <div style={{marginTop:'20px',color: "white"}}>
                        <div style={{borderRadius: "5px"}} className="tabl-flex-admin">
                            <div style={{textAlign: 'center' ,width:'50px'}} className="output-id">ID</div>
                            <div style={{textAlign: 'center' ,width:'150px'}} className="output-date">Почта пользователя</div>
                            <div style={{textAlign: 'center' ,width:'210px'}} className="output-date">Почта получателя</div>
                            <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Сумма перевода</div>
                            <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Время перевода</div>
                            <div style={{textAlign: 'center' ,width:'120px'}} className="output-date">Статус</div>
                        </div> 
                        {<div style={{marginTop:'5px',borderRadius:'5px'}} className="tabl-flex-admin-user" key={currentTransfersToUser?.email}>
                            <div style={{width:'50px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-id">{transfersIDToUser}</div>
                            <div style={{width:'150px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center",overflowWrap: "anywhere"}} className="output-sum">{emailTransfersToUser}</div>
                            <div style={{width:'210px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center",overflowWrap: "anywhere"}} className="output-sum">{emailReceiverToUser}</div>
                            <div style={{width:'155px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{scoreTransfers}</div>
                            <div style={{width:'155px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{timeTransfersToUser}</div>
                            <div style={{width:'120px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{statusTransfersToUser}</div>
                        </div>}
                        <div className='pages-user-box-2'>
                            <div style={{flexDirection: "column"}} className='pages-user-block'>
                                <h6 style={{margin: "0",textAlign: "center"}}>Изменение суммы перевода</h6>
                                <input
                                    onChange={(e) => setScoreTransfersToUser(e.target.value)}
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
                                <h6 style={{margin: "0",textAlign: "center"}}>Изменение статуса перевода</h6>
                                <select
                                    onChange={(e) => setStatusTransfersToUser(e.target.value)}
                                    style={{color: "white",borderRadius: "5px"}}
                                    className="tabl-flex-admin-user-scores " 
                                    name="select"> 
                                    <option value="" selected></option>
                                    <option value="В обработке">В обработке</option>
                                    <option value="Успешный">Успешный</option>
                                    </select>
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

export default TransfersToUserID