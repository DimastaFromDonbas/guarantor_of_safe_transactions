import { Alert} from "react-bootstrap";
import {Link} from "react-router-dom"
import '../../style/header.css'
import HomeIcon from '@mui/icons-material/Home';
import { useAppSelector } from "../../store/reduxHooks";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { SwipeableDrawer } from "@mui/material";
import io from "socket.io-client";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HelpIcon from '@mui/icons-material/Help';
import GavelIcon from '@mui/icons-material/Gavel';
import ReviewsIcon from '@mui/icons-material/Reviews';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export const socket = io.connect("localhost:5000");

function Header() {

  const {user,deals,updateHeaderAlert} = useAppSelector ((store) => store.user)
  const [sideBar, setSideBar] = useState(false)
  const [bellState, setBellState] = useState(false)
  const [checkReadMessage , setCheckReadMassage] = useState(false)
  const [checked, setChecked] = useState(false)

  const dispatch = useDispatch();

  let now = new Date();
  let dateParceUser = Date.parse(deals[0]?.createdAt)
  let dateParceNow = Date.parse(now)

  function getDateMessege() {
    if(dateParceNow - dateParceUser > 3600000*12) {
      setBellState(true)
      dispatch({
        type: reducerTypes.GET_CHECK_SYSTEM,
        payload: true,
      });
    }
  }

  function clickArrowdown() {
    if (checked) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }

  /*async function auth() {
    const getUsers = await check()
    dispatch({
      type: reducerTypes.GET_USER,
      payload: getUsers,
    });
  }*/

  async function getUsers(e) {
    dispatch({
      type: reducerTypes.GET_USER,
      payload: {}
    });
  }


  useEffect(() => {
    getDateMessege()
    // eslint-disable-next-line 
  },[deals, user])

  useEffect(() => {
    dispatch({
      type: reducerTypes.GET_UPDATE_HEADER_ALERT,
      payload: true,
    });
    setCheckReadMassage(localStorage.getItem(`${user?.email}`) === 'true') // eslint-disable-next-line 
  },[updateHeaderAlert,dispatch, user])


  return  <>
        <Alert.Heading className="alert-navBar">Технический чат поддержки работает с 10:00 до 20:00 ежедневно!</Alert.Heading>
              <div className="navbar-header">
            <SwipeableDrawer anchor={'left'} open={sideBar} onClose={() => setSideBar(false)} onOpen={() => setSideBar(true)}>
            { user?.id? 
                <div  style={{ marginLeft: "25px",display: "flex",flexDirection: "column",padding:'10px'}} >
                <Link className="color-nav-link color" to="/"><HomeIcon></HomeIcon> НА ГЛАВНУЮ</Link>
                <Link className="color-nav-link color" to="/deals"><ListAltIcon></ListAltIcon> МОИ СДЕЛКИ</Link>
                <Link className="color-nav-link color" to="/output"><AccountBalanceIcon></AccountBalanceIcon> МОЙ СЧЕТ:{user.score} РУБ.</Link>
                <Link className="color-nav-link color" to="#"><HelpIcon></HelpIcon> ПОМОЩЬ</Link>
                <Link className="color-nav-link color" to="#"><GavelIcon></GavelIcon> РАЗРЕШЕНИЕ СПОРОВ</Link>
                <Link className="color-nav-link color" to="#"><ReviewsIcon></ReviewsIcon> ОТЗЫВЫ</Link>
                </div>
              :
              <div className="flex-nav-link">
                <Link className="color-nav-link color" to="/"><HomeIcon></HomeIcon> НА ГЛАВНУЮ</Link>
                <Link className="color-nav-link color" to="#"><HelpIcon></HelpIcon> ПОМОЩЬ</Link>
                <Link className="color-nav-link color" to="#"><GavelIcon></GavelIcon> РАЗРЕШЕНИЕ СПОРОВ</Link>
                <Link className="color-nav-link color" to="#"><ReviewsIcon></ReviewsIcon> ОТЗЫВЫ</Link>
              </div>}
            </SwipeableDrawer>
              <div className="nav-main-header">
                <Link className="color-nav-link color header-home" to="/"><HomeIcon></HomeIcon></Link>
                <FormatListBulletedIcon onClick={() => setSideBar(true)} className="color-nav-link color header-burder"></FormatListBulletedIcon>
              { user?.id? 
                <div className="header-navBar" style={{ marginLeft: "25px",display: "flex",width: "600px",justifyContent: "space-between",alignItems: "center"}} >
                <Link className="color-nav-link color" to="/deals">МОИ СДЕЛКИ</Link>
                <Link className="color-nav-link color" to="/output">МОЙ СЧЕТ:{user.score} РУБ.</Link>
                <Link className="color-nav-link color" to="#">ПОМОЩЬ</Link>
                <Link className="color-nav-link color" to="#">РАЗРЕШЕНИЕ СПОРОВ</Link>
                <Link className="color-nav-link color" to="#">ОТЗЫВЫ</Link>
                </div>
              :
              <div className="flex-nav-link header-navBar">
                <Link className="color-nav-link color" to="#">ПОМОЩЬ</Link>
                <Link className="color-nav-link color" to="#">РАЗРЕШЕНИЕ СПОРОВ</Link>
                <Link className="color-nav-link color" to="#">ОТЗЫВЫ</Link>
              </div>}
              </div>
              { user?.id?
                <div onClick = {clickArrowdown} style={{display: "flex",justifyContent: "space-between"}}>
                <Link className="color-nav-link color" to="#" style={{display: 'flex', flexDirection: 'row'}}>{user.nickname}</Link>
                <KeyboardArrowDownIcon className={!checked? "hoverArrow" : "transformArrow"}></KeyboardArrowDownIcon>
                {(bellState && !checkReadMessage) || user?.systemMessage === 'true' ? <NotificationsNoneIcon className="bell-color"></NotificationsNoneIcon> : ''}
                  <div className={checked?"user-profile-block js-profile-block_open active": "user-profile-block js-profile-block_open"}>
                        <ul className="nav-detail_list">
                            <li className="nav-detail_item"><Link className="nav-detail_link" to="/systemmessages">Системные сообщения {(bellState && !checkReadMessage) || user?.systemMessage === 'true' ? <NotificationsNoneIcon className="bell-color"></NotificationsNoneIcon> : ''}</Link></li>
                              <li className="nav-detail_item"><Link className="nav-detail_link" to="/settings">Мои настройки</Link></li>
                             <li className="nav-detail_item border-exit"><Link onClick={getUsers} className="nav-detail_link" to="/">Выход</Link></li>
                           </ul>
                    </div>
                </div>
                :
                <div className="flex-nav-link-registr ">
                <Link className="color-nav-link color" to="/login" style={{display: 'flex', flexDirection: 'row'}}>Войти <div style={{width: '1px', height: '12px', border: '0.5px solid rgb(170, 170, 171)', position: 'relative', left: '12.5px', top: '6px'}}></div></Link>
                <Link className="color-nav-link color" to="/registr">Регистрация</Link>
                </div>}
              </div>
    </>
}

export default Header