import { Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { axiosDeleteUser, axiosGetAllUsers } from '../../../api/axios';
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from '../../../store/Users/types';

function AllUsersID() {

    const {allUsers,user} = useAppSelector ((store) => store.user)
    const { id } = useParams()
    const [ roleUser, setRoleUser] = useState('')
    const [ systemMessagesUser, setSystemMessagesUser] = useState('')
    const [ completedUser, setCompletedUser] = useState('')
    const [ scoreUser, setscoreUser] = useState('')
    const [ minScore , setMinScore] = useState('0')
    const [ blockUser, setBlockUser] = useState('')
    const [deleteUsers, setDeleteUsers] = useState([]);
    const dispatch = useDispatch();

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

    function changesRoleUser(e) {
        setRoleUser(e.currentTarget.value)
    }

    function changesSystemMeseggesUser(e) {
        setSystemMessagesUser(e.currentTarget.value)
    }

    function changesCompletedUser(e) {
        setCompletedUser(e.currentTarget.value)
    }

    function changesScoreUser(e) {
        setscoreUser(e.currentTarget.value)
    }

    function changesMinScoreUser(e) {
        setMinScore(e.currentTarget.value)
    }

    function changesBlock(e) {
        setBlockUser(e.currentTarget.value)
    }

    useEffect(() => {
        getAllUsers();
         // eslint-disable-next-line 
       },[])

    return <>
         <div style={{display: 'flex',minHeight: '100vh',justifyContent: "center",}} className='styleAdminPanel'>
             <div style={{width: "100%",display: "flex",flexDirection: "column",alignItems: "center",background: "rgba(17, 17, 18, 0.65)"}}>
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
                            <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Минимальная сумма</div>
                            <div style={{textAlign: 'center' ,width:'80px'}} className="output-sum">Удалить</div>
                        </div>

                        {allUsers?.filter( user => user.id === Number(id) )?.map((item, index) => <div style={{marginTop:'5px',borderRadius:'5px'}} className="tabl-flex-admin-user" key={item?.email}>
                            <div style={{width:'50px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-id">{item.id}</div>
                            <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.nickname}</div>
                            <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{ roleUser?roleUser: item.role}</div>
                            <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{scoreUser?scoreUser:item.score}p</div>
                            <div style={{width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-id">{item.email}</div>
                            <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{systemMessagesUser? systemMessagesUser: item.systemMessage}</div>
                            <div style={{width:'80px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-sum">{completedUser?completedUser:['Не наёбан', 'Наёбан'][item.completed]}</div>
                            <div style={{width:'100px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-sum">{blockUser?blockUser:''}</div>
                            <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-sum">{minScore?minScore:''}p</div>
                            <div style={{width:'80px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-sum" onChange={(e) => changeDeleteUsers(e.target.checked, item.id)}><Checkbox color="error" /></div>
                        </div>)}
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
                            <select
                             onChange={changesRoleUser}
                             style={{color: "white",borderRadius: "5px"}}
                             className="tabl-flex-admin-user-scores " 
                             name="select"> 
                                <option value="" selected>Изменить роль пользователя</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="MODERATOR">MODERATOR</option>
                                <option value="CHATER">CHATER</option>
                                <option value="USER">USER</option>
                            </select>
                            <div className="tabl-flex-admin-button">
                            Изменить
                            </div>
                        </div>
                        <div className='pages-user-block'>
                        <input
                        onChange={changesScoreUser}
                            className="tabl-flex-admin-user-scores "
                            style={{color: "white",borderRadius: "5px"}}
                            type="number"
                            name="name"
                            placeholder="Изменение денег пользователя"
                            autoComplete="off"
                            required
                            />
                            <div className="tabl-flex-admin-button">
                            Изменить
                            </div>
                        </div>
                        <div className='pages-user-block'>
                            <select
                             onChange={changesSystemMeseggesUser}
                             style={{color: "white",borderRadius: "5px"}}
                             className="tabl-flex-admin-user-scores " 
                             name="select"> 
                                <option value="" selected>Системное сообщение</option>
                                <option value="Отправлено">Отправлено</option>
                                <option value="Не отпавлено">Не отпавлено</option>
                            </select>
                            <div className="tabl-flex-admin-button">
                            Изменить
                            </div>
                        </div>
                        <div className='pages-user-block'>
                            <select
                             onChange={changesCompletedUser}
                             style={{color: "white",borderRadius: "5px"}}
                             className="tabl-flex-admin-user-scores " 
                             name="select"> 
                                <option value="" selected>Состояние пользователя</option>
                                <option value="Наёбан">Наёбан</option>
                                <option value="Не наёбан">Не наёбан</option>
                            </select>
                            <div className="tabl-flex-admin-button">
                            Изменить
                            </div>
                        </div>
                        <div className='pages-user-block'>
                            <select
                             onChange={changesBlock}
                             style={{color: "white",borderRadius: "5px"}}
                             className="tabl-flex-admin-user-scores " 
                             name="select"> 
                                <option value="" selected>Разблок или блок</option>
                                <option value="true">Разблокировать</option>
                                <option value="false">Заблокировать</option>
                            </select>
                            <div className="tabl-flex-admin-button">
                            Изменить
                            </div>
                        </div>
                        <div className='pages-user-block'>
                        <input
                        onChange={changesMinScoreUser}
                            className="tabl-flex-admin-user-scores "
                            style={{color: "white",borderRadius: "5px"}}
                            type="number"
                            name="name"
                            placeholder="Изменение мин суммы вывода"
                            autoComplete="off"
                            required
                            />
                            <div className="tabl-flex-admin-button">
                            Изменить
                            </div>
                        </div>
                    </div>
                </div>
         </div>
    </>
}

export default AllUsersID