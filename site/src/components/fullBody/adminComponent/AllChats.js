import { Checkbox } from "@mui/material"
import { StyledInput } from "../../../style/styles"
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AllChats() {

    const dispatch = useDispatch();
    const { } = useAppSelector ((store) => store.user)
    const navigate = useNavigate()
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');

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
                {/* <h5 style={{margin:'0'}}>На согласовании</h5> <Checkbox value={filterOpen} defaultChecked onChange={() => setFilterOpen((prev) => !prev)} color="error" /> */}
                {/* <h5 style={{margin:'0'}}>Ожидает оплаты</h5> <Checkbox value={filterCheck} defaultChecked onChange={() => setFilterCheck((prev) => !prev)} color="error" /> */}
                {/* <h5 style={{margin:'0'}}>Оплачена</h5> <Checkbox value={filterPayed} defaultChecked onChange={() => setFilterPayed((prev) => !prev)} color="error" /> */}
                {/* <h5 style={{margin:'0'}}>Завершена</h5> <Checkbox value={filterComplete} defaultChecked onChange={() => setFilterComplete((prev) => !prev)} color="error" /> */}
                {/* <h5 style={{margin:'0'}}>Арбитраж</h5> <Checkbox value={filterArbitration} defaultChecked onChange={() => setFilterArbitration((prev) => !prev)} color="error" /> */}
            </div>
            </div>

            <h3 style={{textAlign: 'center'}}>ВСЕ ЧАТЫ</h3> 

            <div className="tabl-flex-admin" style={{borderRadius: "5px"}}>
                <div style={{textAlign: 'center' ,width:'80px'}} className="output-id">ID </div>
                <div style={{textAlign: 'center' ,width:'155px',cursor:'pointer'}} className="output-date" >Имя пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Почта пользователя</div>
                <div style={{textAlign: 'center' ,width:'210px'}} className="output-sum">Новое сообщение</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Время удаления чата</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Оценка</div>
            </div>

            {/* {deals?.slice(page*itemsPerPage, (page + 1)*itemsPerPage)?.map((item, index) => <div style={{marginTop:'5px',borderRadius:'5px'}} className="tabl-flex-admin-user" key={item?.id}>
            <div style={{textAlign: 'center',width:'80px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} className="output-id">{item?.id}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} className="output-id">{item?.createdAt}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} className="output-date">{item?.sellerNickname}</div>
            <div style={{textAlign: 'center',width:'210px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} className="output-date">{item?.seller}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} className="output-sum">{item?.buyerNickname}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px',display: "flex",alignItems: "center",justifyContent: "center",cursor:'pointer'}} className="output-sum">{item?.buyer}</div>
            </div>)} */}

            <Pagination
                        style={{display: "flex", justifyContent: "center",marginTop:'20px'}}
                        // count={Math.ceil(deals?.length / itemsPerPage)}
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
                        // value={itemsPerPage}
                        placeholder="Елементов на странице"
                        // className={styles.input}
                        // onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        autoComplete="off"
                        required
                    />
                </div>
    
    </>
}

export default AllChats