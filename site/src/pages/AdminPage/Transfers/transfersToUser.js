import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import { axiosGetAllUserToUserTransfers } from "../../../api/transferToUser";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useNavigate } from "react-router-dom";
import { transferStatusMock } from "../../../components/mock/OutputMock";

function TransfersToUser(search) {

  const dispatch = useDispatch();
  const [transfersToUser, setTransferToUser] = useState([]);
  const [page, setPage] = useState(0);
  const [sortId, setSortId] = useState(true);
  const [sortStatus, setSortStatus] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { allTransfersToUser } = useAppSelector((store) => store.user);
  const navigate = useNavigate()

  async function getAllTransfersTouser() {
    const data = await axiosGetAllUserToUserTransfers();
    if (data) {
      dispatch({
        type: reducerTypes.GET_ALL_TRANSFERS_TO_USER,
        payload: data,
      });
    }
  }

  useEffect(() => {
    setTransferToUser(allTransfersToUser
      ?.filter((el) => search?.search ? (el?.userEmail?.toLowerCase()?.includes(search?.search) ||
        el?.userNickname?.toLowerCase()?.includes(search?.search) ||
        el?.receiverEmail?.toLowerCase()?.includes(search?.search) ||
        el?.receiverNickname?.toLowerCase()?.includes(search?.search)) : true)
      ?.sort((a, b) => sortId ? a.id - b.id : b.id - a.id).sort((a, b) => sortStatus ? a.status - b.status : b.status - a.status))
  }, [allTransfersToUser, search, sortId, sortStatus])

  useEffect(() => {
    getAllTransfersTouser();
    // eslint-disable-next-line 
  }, [])

  return <>

    <div style={{ display: "flex", justifyContent: "center" }}> <h2>ПЕРЕВОДЫ ПО РЕКВИЗИТАМ</h2></div>

    <div style={{ borderRadius: "5px" }} className="tabl-flex-admin">
      <div style={{ textAlign: 'center', width: '80px' }} className="output-id">ID</div>
      <div style={{ textAlign: 'center', width: '210px', cursor: 'pointer' }} className="output-date" onClick={() => setSortId(prev => !prev)}>Время создания</div>
      <div style={{ textAlign: 'center', width: '100px' }} className="output-date" >Сумма</div>
      <div style={{ textAlign: 'center', width: '155px' }} className="output-date">Почта пользователя</div>
      <div style={{ textAlign: 'center', width: '155px' }} className="output-sum">Имя пользователя</div>
      <div style={{ textAlign: 'center', width: '155px' }} className="output-date">Почта получателя</div>
      <div style={{ textAlign: 'center', width: '155px' }} className="output-sum">Имя получателя</div>
      <div style={{ textAlign: 'center', width: '155px', cursor: 'pointer' }} className="output-sum" onClick={() => setSortStatus(prev => !prev)}>Статус</div>
    </div>

    {transfersToUser?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map((item, index) => <div style={{ marginTop: '5px', borderRadius: '5px' }} className="tabl-flex-admin-user" key={item.id}>
      <div style={{ textAlign: 'center', width: '80px', height: '48px', display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} className="output-id">{item.id}</div>
      <div style={{ textAlign: 'center', width: '210px', height: '48px', display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer', overflowWrap: "anywhere" }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} className="output-id">{item.time}</div>
      <div style={{ textAlign: 'center', width: '100px', height: '48px', display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} className="output-id">{item.score}</div>
      <div style={{ textAlign: 'center', width: '155px', height: '48px', display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer', overflowWrap: "anywhere" }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} className="output-date">{item.userEmail}</div>
      <div style={{ textAlign: 'center', width: '155px', height: '48px', display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} className="output-date">{item.userNickname}</div>
      <div style={{ textAlign: 'center', width: '155px', height: '48px', display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer', overflowWrap: "anywhere" }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} className="output-sum">{item.receiverEmail}</div>
      <div style={{ textAlign: 'center', width: '155px', height: '48px', display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} className="output-sum">{item.receiverNickname}</div>
      <div style={{ textAlign: 'center', width: '155px', height: '48px', display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} className="output-sum">{transferStatusMock[item.status - 1]}</div>
    </div>)}

    <Pagination
      style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}
      count={Math.ceil(transfersToUser?.length / itemsPerPage)}
      shape="rounded"
      onChange={(e, value) => setPage(Number(value) - 1)}
      renderItem={(item) => (
        <PaginationItem
          {...item}
        />
      )}
    />

    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: '20px' }}>
      <h6 style={{ margin: '0px', paddingRight: "10px" }}>Кол-во</h6>
      <input
        className="tabl-flex-admin-pages"
        style={{ color: "white", borderRadius: "5px" }}
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

export default TransfersToUser