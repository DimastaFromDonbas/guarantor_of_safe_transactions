import { useEffect, useState } from "react";
import AllDeposit from "./adminComponent/AllDeposit";
import AllDeals from "./adminComponent/AllDeals";
import AllUsers from "./adminComponent/AllUsers";
import AllTransfers from "./adminComponent/AllTransfers";
import { useAppSelector } from "../../store/reduxHooks";
import { useNavigate } from "react-router-dom";
import SetNameTheSite from "./adminComponent/SetNameTheSite";
import io from "socket.io-client";
import AllChats from "./adminComponent/AllChats";
import { axiosGetAdminChats } from "../../api/axios";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";


export const socketAdmin = io.connect("localhost:5000");

function AdminPanel() {

    const dispatch = useDispatch()
    const [item, setItem] = useState()
    const [checkNewMessage, setCheckNewMessage] = useState(false)
    const [statebackground, setStatebackground] = useState(!!localStorage.getItem('backroundImg'))
    const { user, adminChat } = useAppSelector((store) => store.user)
    const navigate = useNavigate()

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

    function visibleItem(e) {
        switch (e.currentTarget.name) {
            case "0":
                setItem(0);
                break;
            case "1":
                setItem(1);
                break;
            case "2":
                setItem(2);
                break;
            case "3":
                setItem(3);
                break;
            case "4":
                setItem(4);
                break;
            case "5":
                setItem(5);
                break;
            default:
        }
    }

    useEffect(() => {
        setCheckNewMessage(adminChat.some(item => item.newMessage === 1));
        // eslint-disable-next-line
    }, [adminChat]);

    useEffect(() => {
        getAllChats();
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        if (user?.role === 'USER' || user?.role === null || user?.role === '' || user?.role === undefined) {
            navigate("/")
        }
    }, [user?.role, navigate, user])

    useEffect(() => {
        socketAdmin.on('newMessage', ({ data }) => {
            if (data) {
                getAllChats();
            }
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (user?.email) {
            socketAdmin.emit('join', { name: '1', room: '1' });
        }
    }, [user]);

    return <div style={{ minHeight: '100vh' }}>
        <div style={{ display: 'flex', minHeight: '100vh' }} className={!statebackground ? 'styleAdminPanel' : 'styleAdminPanel2'}>
            <div style={{ display: "flex", flexDirection: "column", width: '22%' }} className="panel_user">
                <button onClick={(e) => visibleItem(e)} name='0' className={item === 0 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>ВСЕ ПОЛЬЗОВАТЕЛИ</h4>
                </button>
                <button onClick={(e) => visibleItem(e)} name='1' className={item === 1 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>ВСЕ СДЕЛКИ</h4>
                </button>
                <button onClick={(e) => visibleItem(e)} name='2' className={item === 2 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>ПОПОЛНЕНИЯ</h4>
                </button>
                <button onClick={(e) => visibleItem(e)} name='3' className={item === 3 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>ПЕРЕВОДЫ</h4>
                </button>
                <button onClick={(e) => visibleItem(e)} name='4' className={item === 4 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4 style={{ color: checkNewMessage ? 'red' : 'white' }}>ВСЕ ЧАТЫ</h4>
                </button>
                <button onClick={(e) => visibleItem(e)} name='5' className={item === 5 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>СМЕНА ИМЕНИ САЙТА <br /> И КОШЕЛЬКА</h4>
                </button>
                <button onClick={() => {
                    localStorage.setItem('backroundImg', !statebackground ? ' ' : '')
                    setStatebackground(prev => !prev)
                }} className={statebackground ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>СМЕНА ФОНА </h4>
                </button>
            </div>
            <div style={{ paddingLeft: '10px' }} className="panel_user">
                {item === 0 ? <div style={{ display: 'block', width: '100%' }}>
                    <AllUsers />
                </div> : ''}
                {item === 1 ? <div style={{ display: 'block', width: '100%' }}>
                    <AllDeals />
                </div> : ''}
                {item === 2 ? <div style={{ display: 'block' }}>
                    <AllDeposit />
                </div> : ''}
                {item === 3 ? <div style={{ display: 'block', width: '100%' }}>
                    <AllTransfers />
                </div> : ''}
                {item === 4 ? <div style={{ display: 'block', width: '100%' }}>
                    <AllChats />
                </div> : ''}
                {item === 5 ? <div style={{ display: 'block' }}>
                    <SetNameTheSite />
                </div> : ''}
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: '10px', color: 'white' }}>
                    <div onClick={() => navigate("/")} className="tabl-flex-admin-button-global2">
                        Вернуться назад
                    </div>
                </div>
            </div>

        </div>
    </div>
}

export default AdminPanel