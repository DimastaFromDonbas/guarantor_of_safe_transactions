import { useAppSelector } from "../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

function AllDeals() {

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const {allDeals, user} = useAppSelector ((store) => store.user)
    const [deals, setDeals] = useState([]);
    const [page, setPage] = useState(0);
    const [deleteDeals, setDeleteDeals] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    return <>
        <h3 style={{textAlign: 'center'}}>СДЕЛКИ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ НА САЙТЕ</h3> 
        <div className="tabl-flex-admin" style={{borderRadius: "5px"}}>
            <div style={{textAlign: 'center' ,width:'100px'}} className="output-id">ID </div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Время создания сделки</div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Имя продавца</div>
            <div style={{textAlign: 'center' ,width:'210px'}} className="output-sum">Почта продавца</div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Имя покупателя</div>
            <div style={{textAlign: 'center' ,width:'210px'}} className="output-sum">Почта покупателя</div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Сумма сделки</div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Статус сделки </div>
        </div>
        {allDeals?.map((item, index) => <div style={{marginTop:'5px',borderRadius:'5px'}} className="tabl-flex-admin-user" key={index}>
            <div style={{textAlign: 'center',width:'100px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-id">{item.id}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-id">{item.createdAt}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{item.sellerNickname}</div>
            <div style={{textAlign: 'center',width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{item.seller}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.buyerNickname}</div>
            <div style={{textAlign: 'center',width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.buyer}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.sum}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.status}</div>
        </div>)}
    </>
}

export default AllDeals