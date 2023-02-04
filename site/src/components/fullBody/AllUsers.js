import { useAppSelector } from "../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import { axiosGetAllUsers } from "../../api/axios";
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
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
            <div style={{marginBottom: "20px",display: "flex",justifyContent: "space-between",alignItems: "center"}}>
            <input
              className="tabl-flex-admin-search"
              style={{color: "white",borderRadius: "5px"}}
              type="search"
              name="name"
              value={search}
              placeholder="text"
             // className={styles.input}
              onChange={(e) => setSearch(e.target.value?.toLowerCase())}
              autoComplete="off"
              required
            />
            <div className="tabl-flex-admin-filtr" style={{borderRadius: "5px"}}>
                <h5 style={{margin:'0'}}>Админы</h5> <Checkbox value={filterAdmin} defaultChecked onChange={() => setFilterAdmin((prev) => !prev)} color="error" />
                <h5 style={{margin:'0'}}>Модеры</h5> <Checkbox value={filterModerator} defaultChecked onChange={() => setFilterModerator((prev) => !prev)} color="error" />
                <h5 style={{margin:'0'}}>Чатеры</h5> <Checkbox value={filterChater} defaultChecked onChange={() => setFilterChater((prev) => !prev)} color="error" />
                <h5 style={{margin:'0'}}>Юзеры</h5> <Checkbox value={filterUser} defaultChecked onChange={() => setFilterUser((prev) => !prev)} color="error" />
                <h5 style={{margin:'0'}}>Закрытые</h5> <Checkbox value={completed} onChange={() => setCompleted((prev) => !prev)} color="error" />
            </div>
            </div>
            <div style={{display: "flex",justifyContent: "center"}}> <h2>ПОЛЬЗОВАТЕЛИ</h2></div>

            <div style={{borderRadius: "5px"}} className="tabl-flex-admin">
                <div style={{textAlign: 'center' ,width:'100px'}} className="output-id">ID Пользователя</div>
                <div style={{textAlign: 'center' ,width:'210px'}} className="output-date">Почта Пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Пароль пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Роль пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Деньги пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Имя пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Статус системного сообщения</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Completed</div>
            </div>

             {users?.slice(page*itemsPerPage, (page + 1)*itemsPerPage)?.map((item, index) => <div style={{marginTop:'5px',borderRadius:'5px'}} className="tabl-flex-admin-user" key={index}>
                <div style={{width:'100px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-id">{item.id}</div>
                <div style={{width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-id">{item.email}</div>
                <div style={{width:'155px',height:'48px', overflow: 'hidden',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{item.password}</div>
                <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{item.role}</div>
                <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.score}</div>
                <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.nickname}</div>
                <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.systemMessage}</div>
                <div style={{width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.completed}</div>
            </div>)}

            <Pagination
              style={{display: "flex", justifyContent: "center",marginTop:'20px'}}
              count={Math.ceil(users?.length / itemsPerPage)}
              shape="rounded"
              onChange={(e) => setPage(Number(e.target.textContent)-1)}
              renderItem={(item) => (
                <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
          />
        )}
      />
          <div style={{display: "flex",flexDirection: "row",justifyContent: "flex-end",alignItems: "center",marginTop:'20px'}}>
            <h6 style={{margin: '0px',paddingRight: "10px"}}>Кол-во</h6>
           <input
            className="tabl-flex-admin"
              style={{color: "white",borderRadius: "5px"}}
              type="number"
              name="name"
              value={itemsPerPage}
              placeholder="Елементов на странице"
             // className={styles.input}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              autoComplete="off"
              required
            />
          </div>
    </>
}



export default AllUsers