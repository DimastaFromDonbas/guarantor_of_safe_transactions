import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { axiosGetAllUserToUserTransfers } from "../../../api/axios";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from "../../../store/Users/types";
import { transferStatusMock } from "../../mock/OutputMock";
import { axiosChangeUserToUserTransfer } from "../../../api/axios";

function TransfersToUserID() {

    const { id } = useParams()
    const dispatch = useDispatch();
    const statebackground = !!localStorage.getItem('backroundImg')
    const [ currentTransfersToUser, setCurrentTransfersToUser ] = useState(null)
    const [ transfersIDToUser, setTransfersIDToUser ] = useState()
    const [ emailTransfersToUser, setEmailTransfersToUser ] = useState('')
    const [ emailReceiverToUser, setEmailReceiverToUser ] = useState('')
    const [ scoreTransfers, setScoreTransfersToUser ] = useState()
    const [ timeTransfersToUser, setTimeTransfersToUser ] = useState('')
    const [ statusTransfersToUser, setStatusTransfersToUser ] = useState()
    const {allTransfersToUser, user} = useAppSelector ((store) => store.user);
    const navigate = useNavigate()

    async function getAllTransfersTouser(){
        const data = await axiosGetAllUserToUserTransfers();
        if(data) {
        dispatch({
          type: reducerTypes.GET_ALL_TRANSFERS_TO_USER,
          payload: data,
        });
    }
      }

      async function changeTransfer() {
        if(!transfersIDToUser || !scoreTransfers || !statusTransfersToUser) return alert('Введите все данные');
        const result = await axiosChangeUserToUserTransfer(Number(transfersIDToUser), Number(scoreTransfers), Number(statusTransfersToUser), user?.email, user?.password);
        if(result) {
            getAllTransfersTouser();
         return alert('Успешно')
        };
        alert('Что-то пошло не так')
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
            <div style={{display: 'flex',minHeight: '100vh',justifyContent: "center",}} className={!statebackground?'styleAdminPanel':'styleAdminPanel2'}>
                <div style={{width: "100%",display: "flex",flexDirection: "column",alignItems: "center",background: "rgba(17, 17, 18, 0.65)"}}>
                    <div style={{display: "flex",flexDirection: "row",justifyContent: "flex-end",marginTop:'10px',color:'white'}}>
                        <div onClick={() => navigate("/adminPanel")} className="tabl-flex-admin-button-global2">
                            Вернуться назад 
                        </div>
                    </div>
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
                            <div style={{width:'120px',minHeight:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{transferStatusMock[statusTransfersToUser - 1] || ''}</div>
                        </div>}
                        <div className='pages-user-box-2'>
                            <div style={{flexDirection: "column"}} className='pages-user-block'>
                                <h6 style={{margin: "0",textAlign: "center"}}>Изменение суммы перевода</h6>
                                <input
                                    onChange={(e) => setScoreTransfersToUser(e.target.value || 0)}
                                    className="tabl-flex-admin-user-scores "
                                    style={{color: "white",borderRadius: "5px"}}
                                    type="number"
                                    name="name"
                                    placeholder="Изменение денег пользователя"
                                    autoComplete="off"
                                    required
                                    value={scoreTransfers || 0}
                                />
                            </div>
                            <div style={{flexDirection: "column"}} className='pages-user-block'>
                                <h6 style={{margin: "0",textAlign: "center"}}>Изменение статуса перевода</h6>
                                <select
                                    onChange={(e) => setStatusTransfersToUser(e.target.value)}
                                    style={{color: "white",borderRadius: "5px"}}
                                    className="tabl-flex-admin-user-scores " 
                                    name="select"
                                    value={String(statusTransfersToUser) || '1'}> 
                                    <option value="1">В обработке</option>
                                    <option value="2">Отмененный</option>
                                    </select>
                            </div>
                        </div>
                        <div style={{width:'100%',display: "flex",marginTop:"20px",justifyContent: "center"}}>
                            <div className="tabl-flex-admin-button-global" onClick={changeTransfer}>
                                Внести изменения
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
}

export default TransfersToUserID