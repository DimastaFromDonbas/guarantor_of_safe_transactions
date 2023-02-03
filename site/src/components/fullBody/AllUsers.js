import { useAppSelector } from "../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import { axiosGetAllUsers } from "../../api/axios";
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function AllUsers() {

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [filterAdmin, setFilterAdmin] = useState(true);
    const [filterModerator, setFilterModerator] = useState(true);
    const [filterChater, setFilterChater] = useState(true);
    const [filterUser, setFilterUser] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const {allUsers} = useAppSelector ((store) => store.user);

    async function getAllUsers(){
      const data = await axiosGetAllUsers();
      dispatch({
        type: reducerTypes.GET_ALL_USERS,
        payload: data || [],
      });
    }


    useEffect(() => {
        setUsers(allUsers
            ?.filter((el) => search? (el?.email?.toLowerCase()?.includes(search) || 
                el?.nickname?.toLowerCase()?.includes(search)): true)
            ?.filter((checkbox) => (checkbox?.role === 'ADMIN' && filterAdmin) ||
                (checkbox?.role === 'MODERATOR' && filterModerator) || 
                (checkbox?.role === 'CHATER' && filterChater) || 
                (checkbox?.role === 'USER' && filterUser))
            ?.filter(el => !(el.completed === 1) || completed))
       },[allUsers, search, filterAdmin, filterModerator, filterChater, filterUser, completed])

    useEffect(() => {
       getAllUsers();
        // eslint-disable-next-line 
      },[])

    return <>
            <input
              type="text"
              name="name"
              value={search}
              placeholder="text"
             // className={styles.input}
              onChange={(e) => setSearch(e.target.value?.toLowerCase())}
              autoComplete="off"
              required
            />
            <div style={{background: 'white'}}>
            <Checkbox value={filterAdmin} defaultChecked onChange={() => setFilterAdmin((prev) => !prev)} color="default" />
            <Checkbox value={filterModerator} defaultChecked onChange={() => setFilterModerator((prev) => !prev)} color="default" />
            <Checkbox value={filterChater} defaultChecked onChange={() => setFilterChater((prev) => !prev)} color="default" />
            <Checkbox value={filterUser} defaultChecked onChange={() => setFilterUser((prev) => !prev)} color="default" />
            <Checkbox value={completed} onChange={() => setCompleted((prev) => !prev)} color="default" />
            </div>
        <h3 style={{textAlign: 'center'}}> ПОЛЬЗОВАТЕЛИ </h3>
             <div className="tabl-flex">
                <div style={{textAlign: 'center' ,width:'100px'}} className="output-id">ID Пользователя</div>
                <div style={{textAlign: 'center' ,width:'210px'}} className="output-date">Почта Пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Пароль пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Роль пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Деньги пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Имя пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Статус системного сообщения</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Completed</div>
            </div>

             {users?.slice(page*itemsPerPage, (page + 1)*itemsPerPage)?.map((item, index) => <div className="tabl-flex" key={index}>
                <div style={{textAlign: 'center',width:'100px',height:'48px'}} className="output-id">{item.id}</div>
                <div style={{textAlign: 'center',width:'210px',height:'48px'}} className="output-id">{item.email}</div>
                <div style={{textAlign: 'center',width:'155px',height:'48px', overflow: 'hidden'}} className="output-date">{item.password}</div>
                <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-date">{item.role}</div>
                <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-sum">{item.score}</div>
                <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-sum">{item.nickname}</div>
                <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-sum">{item.systemMessage}</div>
                <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-sum">{item.completed}</div>
            </div>)}


            <input
              type="number"
              name="name"
              value={itemsPerPage}
              placeholder="Елементов на странице"
             // className={styles.input}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              autoComplete="off"
              required
            />
            <Pagination
        count={Math.ceil(users?.length / itemsPerPage)}
        color="secondary" 
        onChange={(e) => setPage(Number(e.target.textContent)-1)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </>
}

export default AllUsers