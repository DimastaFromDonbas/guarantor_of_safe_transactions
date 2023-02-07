import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { axiosGetAllDeal } from "../../../api/axios";
import { axiosDeleteDeal } from "../../../api/axios";
import { StyledInput } from "../../../style/styles";
import { useNavigate } from "react-router-dom";
import { dealStatusMock } from "../../mock/OutputMock";

function AllDeals() {

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [filterOpen, setFilterOpen] = useState(true);
    const [filterComplete, setFilterComplete] = useState(true);
    const [sortId, setSortId] = useState(true);
    const {allDeals, user} = useAppSelector ((store) => store.user)
    const [deals, setDeals] = useState([]);
    const [page, setPage] = useState(0);
    const [deleteDeals, setDeleteDeals] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const navigate = useNavigate()

    async function getAllDeals(){
        const data = await axiosGetAllDeal();
        if(data) {
        dispatch({
          type: reducerTypes.GET_ALL_DEALS,
          payload: data,
        });}
      }

      function changeDeleteDeals(checked, id) {
        if(checked) {
          setDeleteDeals(prev => [...prev, id])
        } else {
            setDeleteDeals(prev => prev.filter(item => item !== id))
        }
      }

      useEffect(() => {
        setDeals(allDeals
            ?.filter((el) => search? (el?.buyer?.toLowerCase()?.includes(search) || 
                el?.buyerNickname?.toLowerCase()?.includes(search) ||
                el?.seller?.toLowerCase()?.includes(search) ||
                el?.sellerNickname?.toLowerCase()?.includes(search)): true)
                ?.filter((checkbox) => (checkbox?.status === 0 && filterOpen) ||
                (checkbox?.status === 1 && filterComplete))
                ?.sort((a, b) => sortId ? a.id - b.id : b.id - a.id))
       },[allDeals, search, filterOpen, filterComplete, sortId])

      useEffect(() => {
        getAllDeals();
         // eslint-disable-next-line 
       },[])

    return <>
                <div style={{marginBottom: "20px",display: "flex",justifyContent: "space-between",alignItems: "center"}}>
        <StyledInput className="tabl-flex-admin-search"
              style={{color: "white",borderRadius: "5px", paddingLeft: '10px'}}
              type="search"
              id='Search'
              value={search}
              placeholder="Поиск"
              onChange={(e) => setSearch(e.target.value?.toLowerCase())}
              autoComplete="off"
              required />

            <div className="tabl-flex-admin-filtr" style={{borderRadius: "5px"}}>
                <h5 style={{margin:'0'}}>Открыта</h5> <Checkbox value={filterOpen} defaultChecked onChange={() => setFilterOpen((prev) => !prev)} color="error" />
                <h5 style={{margin:'0'}}>Завершена</h5> <Checkbox value={filterComplete} defaultChecked onChange={() => setFilterComplete((prev) => !prev)} color="error" />
            </div>
            </div>
    
        <h3 style={{textAlign: 'center'}}>СДЕЛКИ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ НА САЙТЕ</h3> 

        <div className="tabl-flex-admin" style={{borderRadius: "5px"}}>
            <div style={{textAlign: 'center' ,width:'80px'}} className="output-id">ID </div>
            <div style={{textAlign: 'center' ,width:'155px',cursor:'pointer'}} className="output-date" onClick={() => setSortId(prev => !prev)}>Время создания сделки</div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Имя продавца</div>
            <div style={{textAlign: 'center' ,width:'210px'}} className="output-sum">Почта продавца</div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Имя покупателя</div>
            <div style={{textAlign: 'center' ,width:'210px'}} className="output-sum">Почта покупателя</div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Сумма сделки</div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Статус сделки </div>
            <div style={{textAlign: 'center' ,width:'80px'}} className="output-sum">Удалить </div>
        </div>

        {deals?.slice(page*itemsPerPage, (page + 1)*itemsPerPage)?.map((item, index) => <div style={{marginTop:'5px',borderRadius:'5px'}} className="tabl-flex-admin-user" key={item.id}>
            <div style={{textAlign: 'center',width:'80px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} className="output-id">{item.id}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} className="output-id">{item.createdAt}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} className="output-date">{item.sellerNickname}</div>
            <div style={{textAlign: 'center',width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} className="output-date">{item.seller}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} className="output-sum">{item.buyerNickname}</div>
            <div style={{textAlign: 'center',width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} className="output-sum">{item.buyer}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} className="output-sum">{item.sum}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} className="output-sum">{dealStatusMock[item.status - 1]}</div>
            <div style={{width:'80px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum" onChange={(e) => changeDeleteDeals(e.target.checked, item.id)}><Checkbox color="error" /></div>
        </div>)}
       <div style={{display: "flex",flexDirection: "row",justifyContent: "flex-end",alignItems: "center",marginTop:'5px'}}>
        <div className="tabl-flex-admin-button" 
              onClick={async() => {
              await Promise.all(deleteDeals?.map(async id => await axiosDeleteDeal(Number(id), user?.email, user?.password)))
              setDeleteDeals([])
              await getAllDeals();
              alert('Success')
      }}>
      Удалить
      </div>
      </div>

      <Pagination
              style={{display: "flex", justifyContent: "center",marginTop:'20px'}}
              count={Math.ceil(deals?.length / itemsPerPage)}
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

export default AllDeals