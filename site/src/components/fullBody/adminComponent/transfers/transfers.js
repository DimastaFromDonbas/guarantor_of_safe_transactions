import { useAppSelector } from "../../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../../store/Users/types";
import { axiosGetAllUserTransfers} from "../../../../api/axios";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useNavigate } from "react-router-dom";

function Transfers(search) {

    const dispatch = useDispatch();
    const [transfers, setTransfers] = useState([]);
    const [page, setPage] = useState(0);
    const [sortId, setSortId] = useState(true);
    const [sortStatus, setSortStatus] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const {allTransfers} = useAppSelector ((store) => store.user);
    const navigate = useNavigate()

    async function getAllTransfers(){
        const data = await axiosGetAllUserTransfers();
        if(data) {
        dispatch({
          type: reducerTypes.GET_ALL_TRANSFERS,
          payload: data,
        });
    }
      }

      useEffect(() => {
        setTransfers(allTransfers
            ?.filter((el) => search?.search? (el?.userEmail?.toLowerCase()?.includes(search?.search) || 
                el?.userNickname?.toLowerCase()?.includes(search?.search)): true)
                ?.sort((a, b) => sortId ? a.id - b.id : b.id - a.id).sort((a, b) => sortStatus ? a.status - b.status : b.status - a.status))
       },[allTransfers, search, sortId,sortStatus])

      useEffect(() => {
        getAllTransfers();
         // eslint-disable-next-line 
       },[])

    return <>

    <div style={{display: "flex",justifyContent: "center"}}> <h2>ПЕРЕВОДЫ ПО РЕКВИЗИТАМ</h2></div>

    <div style={{borderRadius: "5px"}} className="tabl-flex-admin">
                <div style={{textAlign: 'center' ,width:'80px'}} className="output-id">ID</div>
                <div style={{textAlign: 'center' ,width:'210px', cursor:'pointer'}} className="output-date" onClick={() => setSortId(prev => !prev)}>Время создания</div>
                <div style={{textAlign: 'center' ,width:'100px'}} className="output-date" >Сумма</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Система оплаты</div>
                <div style={{textAlign: 'center' ,width:'210px'}} className="output-sum">Номер кошелька</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Почта пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Имя пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px', cursor:'pointer'}} className="output-sum" onClick={() => setSortStatus(prev => !prev)}>Статус</div>
            </div>

            {transfers?.slice(page*itemsPerPage, (page + 1)*itemsPerPage)?.map((item, index) => <div style={{marginTop:'5px',borderRadius:'5px'}} className="tabl-flex-admin-user" key={item.id}>
            <div style={{textAlign: 'center',width:'80px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)} className="output-id">{item.id}</div>
            <div style={{textAlign: 'center',width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer',overflowWrap: "anywhere"}} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)} className="output-id">{item.time}</div>
            <div style={{textAlign: 'center',width:'100px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)} className="output-id">{item.score}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)} className="output-date">{item.paymantSystem}</div>
            <div style={{textAlign: 'center',width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)} className="output-date">{item.walletNumber}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer',overflowWrap: "anywhere"}} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)} className="output-sum">{item.userEmail}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)} className="output-sum">{item.userNickname}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)} className="output-sum">{['Открыта', 'В обработке', 'Выполнена'][item.status]}</div>
        </div>)}

        <Pagination
              style={{display: "flex", justifyContent: "center",marginTop:'20px'}}
              count={Math.ceil(transfers?.length / itemsPerPage)}
              shape="rounded"
              onChange={(e, value) => setPage(Number(value)-1)}
              renderItem={(item) => (
                <PaginationItem
                {...item}
          />
        )}
      />

        <div style={{display: "flex",flexDirection: "row",justifyContent: "flex-end",alignItems: "center",marginTop:'20px'}}>
            <h6 style={{margin: '0px',paddingRight: "10px"}}>Кол-во</h6>
           <input
            className="tabl-flex-admin-pages"
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

export default Transfers