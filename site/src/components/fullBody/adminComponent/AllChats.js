import {Checkbox} from '@mui/material';
import {StyledInput} from '../../../style/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {useAppSelector} from '../../../store/reduxHooks';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {axiosGetAdminChats} from '../../../api/axios';
import {reducerTypes} from '../../../store/Users/types';

function AllChats() {
    const dispatch = useDispatch();
    const {adminChat, user} = useAppSelector((store) => store.user);
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [deleteChats, setDeleteChats] = useState([]);
    const [sortId, setSortId] = useState(true);

    async function getAllChats() {
        if (!user?.email) return alert('Войдите в аккаунт');
        const data = await axiosGetAdminChats(user?.email, user?.password);
        if (data) {
            dispatch({
                type: reducerTypes.GET_ADMIN_CHAT,
                payload: data
            });
        }
    }

    function changeDeleteChats(checked, id) {
        if (checked) {
            setDeleteChats((prev) => [...prev, id]);
        } else {
            setDeleteChats((prev) => prev.filter((item) => item !== id));
        }
    }

    useEffect(() => {
        setChats(
            adminChat
                ?.filter((el) => (search ? el?.email?.toLowerCase()?.includes(search) || el?.nickname?.toLowerCase()?.includes(search) : true))
                ?.sort((a, b) => (sortId ? a.id - b.id : b.id - a.id))
        );
    }, [adminChat, search]);

    useEffect(() => {
        getAllChats();
        // eslint-disable-next-line
    }, [user]);

    return (
        <>
            <div
                style={{
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <StyledInput
                    className="tabl-flex-admin-search"
                    style={{color: 'white', borderRadius: '5px', paddingLeft: '10px'}}
                    type="search"
                    id="Search"
                    value={search}
                    placeholder="Поиск"
                    onChange={(e) => setSearch(e.target.value?.toLowerCase())}
                    autoComplete="off"
                    required
                />

                <div className="tabl-flex-admin-filtr" style={{borderRadius: '5px'}}>
                    {/* <h5 style={{margin:'0'}}>На согласовании</h5> <Checkbox value={filterOpen} defaultChecked onChange={() => setFilterOpen((prev) => !prev)} color="error" /> */}
                    {/* <h5 style={{margin:'0'}}>Ожидает оплаты</h5> <Checkbox value={filterCheck} defaultChecked onChange={() => setFilterCheck((prev) => !prev)} color="error" /> */}
                    {/* <h5 style={{margin:'0'}}>Оплачена</h5> <Checkbox value={filterPayed} defaultChecked onChange={() => setFilterPayed((prev) => !prev)} color="error" /> */}
                    {/* <h5 style={{margin:'0'}}>Завершена</h5> <Checkbox value={filterComplete} defaultChecked onChange={() => setFilterComplete((prev) => !prev)} color="error" /> */}
                    {/* <h5 style={{margin:'0'}}>Арбитраж</h5> <Checkbox value={filterArbitration} defaultChecked onChange={() => setFilterArbitration((prev) => !prev)} color="error" /> */}
                </div>
            </div>
            <h3 style={{textAlign: 'center'}}>ВСЕ ЧАТЫ</h3>
            <div className="tabl-flex-admin" style={{borderRadius: '5px'}}>
                <div style={{textAlign: 'center', width: '80px', cursor: 'pointer'}} className="output-id" onClick={() => setSortId((prev) => !prev)}>
                    ID{' '}
                </div>
                <div style={{textAlign: 'center', width: '155px'}} className="output-date">
                    Имя пользователя
                </div>
                <div style={{textAlign: 'center', width: '155px'}} className="output-date">
                    Почта пользователя
                </div>
                <div style={{textAlign: 'center', width: '210px'}} className="output-sum">
                    Новое сообщение
                </div>
                <div style={{textAlign: 'center', width: '155px'}} className="output-date">
                    Время удаления чата
                </div>
                <div style={{textAlign: 'center', width: '155px'}} className="output-sum">
                    Оценка
                </div>
                <div style={{textAlign: 'center', width: '100px'}} className="output-sum">
                    Удалить чат
                </div>
            </div>
            {chats?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map((item, index) => (
                <div style={{marginTop: '5px', borderRadius: '5px'}} className="tabl-flex-admin-user" key={item?.id}>
                    <div
                        style={{
                            textAlign: 'center',
                            width: '80px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        className="output-id"
                    >
                        {item?.id}
                    </div>
                    <div
                        style={{
                            textAlign: 'center',
                            width: '155px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/adminPanel/chat/${user?.email}`)}
                        className="output-id"
                    >
                        {item?.nickname}
                    </div>
                    <div
                        style={{
                            textAlign: 'center',
                            width: '155px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        className="output-date"
                    >
                        {item?.email}
                    </div>
                    <div
                        style={{
                            textAlign: 'center',
                            width: '210px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        className="output-date"
                    >
                        {item?.newMessage}
                    </div>
                    <div
                        style={{
                            textAlign: 'center',
                            width: '155px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        className="output-sum"
                    >
                        {item?.deleteChatTime}
                    </div>
                    <div
                        style={{
                            textAlign: 'center',
                            width: '155px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        className="output-sum"
                    >
                        {item?.rate}
                    </div>
                    <div
                        style={{width: '100px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        className="output-sum"
                        onChange={(e) => changeDeleteChats(e.target.checked, item?.id)}
                    >
                        <Checkbox color="error" />
                    </div>
                </div>
            ))}
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: '5px'}}>
                <div
                    className="tabl-flex-admin-button"
                    onClick={async () => {
                        //  await Promise.all(deleteChats?.map(async (id) => await axiosDeleteDeal(Number(id), user?.email, user?.password)));
                        setDeleteChats([]);
                        await getAllChats();
                        alert('Success');
                    }}
                >
                    Удалить
                </div>
            </div>
            <Pagination
                style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}
                count={Math.ceil(chats?.length / itemsPerPage)}
                shape="rounded"
                onChange={(e, value) => setPage(Number(value) - 1)}
                renderItem={(item) => <PaginationItem {...item} />}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: '20px'
                }}
            >
                <h6 style={{margin: '0px', paddingRight: '10px'}}>Кол-во</h6>
                <input
                    className="tabl-flex-admin-pages"
                    style={{color: 'white', borderRadius: '5px'}}
                    type="number"
                    name="name"
                    value={itemsPerPage}
                    placeholder="Елементов на странице"
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    autoComplete="off"
                    required
                />
            </div>
        </>
    );
}

export default AllChats;
