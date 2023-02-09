import { Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosDeleteUser, 
    axiosGetAllUsers, 
    axiosChangeRole, 
    axiosChangeScore, 
    axiosChangeSystemMessage, 
    axiosChangeCompleted, 
    axiosChangeCheckRu, 
    axiosChangeTransferAmount } from '../../../api/axios';
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from '../../../store/Users/types';

function AllUsersID() {

    const {allUsers, user} = useAppSelector ((store) => store.user)
    const statebackground = !!localStorage.getItem('backroundImg')
    const { id } = useParams()
    const [currentUser, setCurrentUser] = useState(null)
    const [ roleUser, setRoleUser ] = useState('')
    const [ systemMessagesUser, setSystemMessagesUser ] = useState('')
    const [ completedUser, setCompletedUser ] = useState('')
    const [ scoreUser, setscoreUser ] = useState('')
    const [ minScore , setMinScore ] = useState(0)
    const [ minRefil , setMinRefil ] = useState(0)
    const [ blockUser, setBlockUser ] = useState('')
    const [ deleteUsers, setDeleteUsers ] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    function changeDeleteUsers(checked, id) {
        if(checked) {
          setDeleteUsers(prev => [...prev, id])
        } else {
          setDeleteUsers(prev => prev.filter(item => item !== id))
        }
      }

    async function getAllUsers(){
        const data = await axiosGetAllUsers();
        dispatch({
          type: reducerTypes.GET_ALL_USERS,
          payload: data || [],
        });
      }

    async function changeRole() {
       const result = await axiosChangeRole(roleUser, currentUser?.id, user?.email, user?.password);
       console.log(result?.response?.data?.message)
       if(result?.response?.data?.message === 'Нет доступа') { 
        setRoleUser(currentUser?.role)
        return alert('Нет доступа')
    }
       if(result?.response?.data?.message) {
        setRoleUser(currentUser?.role)
        return alert('Что-то пошло не так')
    }
        alert('Успешно')
    }
    
    async function changeScore() {
        const result = await axiosChangeScore(scoreUser, currentUser?.id, user?.email, user?.password);
        if(result) {
         getAllUsers();
         return alert('Успешно')}
        alert('Что-то пошло не так')
     }

     async function changeSystemMessage() {
        const result = await axiosChangeSystemMessage(systemMessagesUser, currentUser?.id, user?.email, user?.password);
        if(result) {
         getAllUsers();
         return alert('Успешно')}
        alert('Что-то пошло не так')
     }

     async function changeCompleted() {
        const result = await axiosChangeCompleted(completedUser, currentUser?.id, user?.email, user?.password);
        if(result) {
         getAllUsers();
         return alert('Успешно')}
        alert('Что-то пошло не так')
     }

     async function changeCheckRu() {
        const result = await axiosChangeCheckRu(blockUser, currentUser?.id, user?.email, user?.password);
        if(result) {
         getAllUsers();
         return alert('Успешно')}
        alert('Что-то пошло не так')
     }

     async function changeTransferAmount() {
        const result = await axiosChangeTransferAmount(minScore, minRefil, currentUser?.id, user?.email, user?.password);
        if(result) {
         getAllUsers();
         return alert('Успешно')}
        alert('Что-то пошло не так')
     }

    useEffect(() => {
        getAllUsers();
         // eslint-disable-next-line 
       },[])

       useEffect(() => {
        const temporaryUser = allUsers?.filter(item => item.id === Number(id))[0]
        if(temporaryUser) {
        setCurrentUser(temporaryUser)
        setRoleUser(temporaryUser?.role)
        setSystemMessagesUser(temporaryUser?.systemMessage)
        setCompletedUser(temporaryUser?.completed)
        setscoreUser(temporaryUser?.score)
        setMinScore(temporaryUser?.minimumTransferAmount)
        setMinRefil((temporaryUser?.minimumTransferAmount - temporaryUser?.score < 0) ? 
        0 :
        temporaryUser?.minimumTransferAmount - temporaryUser?.score)
        setBlockUser(temporaryUser?.checkRu)
        }
         // eslint-disable-next-line 
       },[allUsers])

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
                            <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Имя пользователя</div>
                            <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Роль пользователя</div>
                            <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Деньги пользователя</div>
                            <div style={{textAlign: 'center' ,width:'210px'}} className="output-date">Почта Пользователя</div>
                            <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Статус системного сообщения</div>
                            <div style={{textAlign: 'center' ,width:'80px'}} className="output-sum">Completed</div>
                            <div style={{textAlign: 'center' ,width:'100px'}} className="output-sum">Блокировка</div>
                            <div style={{textAlign: 'center' ,width:'130px'}} className="output-sum">Минимальный перевод</div>
                            <div style={{textAlign: 'center' ,width:'130px'}} className="output-sum">Сумма пополнения</div>
                            <div style={{textAlign: 'center' ,width:'80px'}} className="output-sum">Удалить</div>
                        </div>

                        { <div style={{marginTop:'5px',borderRadius:'5px'}} className="tabl-flex-admin-user" key={currentUser?.email}>
                            <div style={{width:'50px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-id">{currentUser?.id}</div>
                            <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{currentUser?.nickname}</div>
                            <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{roleUser}</div>
                            <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{scoreUser ?? 0}p</div>
                            <div style={{width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-id">{currentUser?.email}</div>
                            <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{systemMessagesUser === 'true' ? 'Отправлено' : 'Не отправлено'}</div>
                            <div style={{width:'80px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-sum">{['Не наёбан', 'Наёбан'][completedUser]}</div>
                            <div style={{width:'100px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-sum">{blockUser === 'true'? 'Разблокирован' : 'Заблокирован'}</div>
                            <div style={{width:'130px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-sum">{minScore ?? 0}p</div>
                            <div style={{width:'130px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-sum">{minRefil ?? 0}p</div>
                            <div style={{width:'80px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-sum" onChange={(e) => changeDeleteUsers(e.target.checked, currentUser?.id)}><Checkbox color="error" /></div>
                        </div>}
                        <div style={{display: "flex",flexDirection: "row",justifyContent: "flex-end",alignItems: "center",marginTop:'5px'}}>
                        <div className="tabl-flex-admin-button"
                        onClick={async() => {
                        await Promise.all(deleteUsers?.map(async id => await axiosDeleteUser(Number(id), user?.email, user?.password)))
                        setDeleteUsers([])
                        await getAllUsers();
                        alert('Success')
                        }}>
                        Удалить
                        </div>
                    </div>
                    </div>
                    <div className='pages-user-box'>
  
                        <div className='pages-user-block'>
                        <h6 style={{margin: "0",textAlign: "center"}}>Изменение роли пользователя</h6>
                            <div style={{display: "flex",gap:" 5px"}}>
                            <select
                             onChange={(e) => setRoleUser(e.currentTarget.value)}
                             style={{color: "white",borderRadius: "5px"}}
                             className="tabl-flex-admin-user-scores " 
                             name="select"
                             value={roleUser || "USER"}> 
                                <option value="ADMIN">ADMIN</option>
                                <option value="MODERATOR">MODERATOR</option>
                                <option value="CHATER">CHATER</option>
                                <option value="USER">USER</option>
                            </select>
                            <div className="tabl-flex-admin-button" onClick={changeRole}>
                            Изменить
                            </div>
                            </div>
                        </div>
                        <div className='pages-user-block'>
                        <h6 style={{margin: "0",textAlign: "center"}}>Изменение денег пользователя</h6>
                        <div style={{display: "flex",gap:" 5px"}}>
                        <input
                        onChange={(e) => setscoreUser(e.currentTarget.value || 0)}
                            className="tabl-flex-admin-user-scores "
                            style={{color: "white",borderRadius: "5px"}}
                            type="number"
                            name="name"
                            placeholder="Изменение денег пользователя"
                            autoComplete="off"
                            required
                            value={scoreUser || 0}
                            />
                            <div className="tabl-flex-admin-button" onClick={changeScore}>
                            Изменить
                            </div>
                            </div>
                        </div>
                        <div className='pages-user-block'>
                        <h6 style={{margin: "0",textAlign: "center"}}>Изменение статуса системного сообщения</h6>
                        <div style={{display: "flex",gap:" 5px"}}>
                            <select
                             onChange={(e) => setSystemMessagesUser(e.currentTarget.value)}
                             style={{color: "white",borderRadius: "5px"}}
                             className="tabl-flex-admin-user-scores " 
                             name="select"
                             value={systemMessagesUser || ''}> 
                                <option value="">Не выбрано</option>
                                <option value="true">Отправлено</option>
                                <option value="false">Не отпавлено</option>
                            </select>
                            <div className="tabl-flex-admin-button" onClick={changeSystemMessage}>
                            Изменить
                            </div>
                            </div>
                        </div>
                        <div className='pages-user-block'>
                        <h6 style={{margin: "0",textAlign: "center"}}>Изменение статуса пользователя</h6>
                        <div style={{display: "flex",gap:" 5px"}}>
                            <select
                             onChange={(e) => setCompletedUser(e.currentTarget.value)}
                             style={{color: "white",borderRadius: "5px"}}
                             className="tabl-flex-admin-user-scores " 
                             name="select"
                             value={String(completedUser) || ''}> 
                                <option value="">Не выбрано</option>
                                <option value="1">Наёбан</option>
                                <option value="0">Не наёбан</option>
                            </select>
                            <div className="tabl-flex-admin-button" onClick={changeCompleted}>
                            Изменить
                            </div>
                            </div>
                        </div>
                        <div className='pages-user-block'>
                        <h6 style={{margin: "0",textAlign: "center"}}>Закрыть доступ</h6>
                        <div style={{display: "flex",gap:" 5px"}}>
                            <select
                             onChange={(e) => setBlockUser(e.currentTarget.value)}
                             style={{color: "white",borderRadius: "5px"}}
                             className="tabl-flex-admin-user-scores " 
                             name="select"
                             value={blockUser || ''}> 
                                <option value="">Не выбрано</option>
                                <option value="true">Разблокировать</option>
                                <option value="false">Заблокировать</option>
                            </select>
                            <div className="tabl-flex-admin-button" onClick={changeCheckRu}>
                            Изменить
                            </div>
                            </div>
                        </div>
                        <div className='pages-user-block'>
                        <h6 style={{margin: "0",textAlign: "center"}}>Изменение мин суммы вывода</h6>
                        <div style={{display: "flex",gap:" 5px"}}>
                        <input
                        onChange={(e) => {
                            setMinScore(e.currentTarget.value || 0)
                            setMinRefil((e.currentTarget.value - scoreUser < 0) ? 0 : e.currentTarget.value - scoreUser )
                        }}
                            className="tabl-flex-admin-user-scores "
                            style={{color: "white",borderRadius: "5px"}}
                            type="number"
                            name="name"
                            placeholder="Изменение мин суммы вывода"
                            autoComplete="off"
                            required
                            value={minScore}
                            />
                            <div className="tabl-flex-admin-button" onClick={changeTransferAmount}>
                            Изменить
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
         </div>
    </>
}

export default AllUsersID