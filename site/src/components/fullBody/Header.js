import { Alert} from "react-bootstrap";
import {Link, useNavigate, useLocation} from "react-router-dom"
import '../../style/header.css'
import HomeIcon from '@mui/icons-material/Home';
import { useAppSelector } from "../../store/reduxHooks";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState,useMemo } from "react";
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
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

export const socket = io.connect("localhost:5000");

function Header() {

  const navigate= useNavigate();
  const {state} = useLocation();
  const {user, transfers, transfersToUser, updateHeaderAlert} = useAppSelector ((store) => store.user)
  const [sideBar, setSideBar] = useState(false)
  const [bellState, setBellState] = useState(false)
  const [checkReadMessage , setCheckReadMassage] = useState(false)
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch();

  function getDateMessege() {
    let now = new Date();
    let dateParceNow = Date.parse(now)
    if(!transfers[0]?.time && !transfersToUser[0]?.time) return;
    let dateParceUser = new Date(transfers[0]?.time?.replaceAll('.', '/'))
    let dateParceUser2 = new Date(transfersToUser[0]?.time?.replaceAll('.', '/'))
    const triggerTime = Date.parse(new Date(dateParceUser.getFullYear(), dateParceUser.getMonth(), dateParceUser.getDate()+1, 9, 0, 0));
    const triggerTime2 = Date.parse(new Date(dateParceUser2.getFullYear(), dateParceUser2.getMonth(), dateParceUser2.getDate()+1, 9, 0, 0));
    let time = triggerTime || triggerTime2;

    if(triggerTime > triggerTime2) time = triggerTime2;
    if(dateParceNow - time > 0) {
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

  function handleClick() {
    document.getElementById('reviews').scrollIntoView({behavior: 'smooth'})
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
  },[transfers, transfersToUser, user])

  useEffect(() => {
    dispatch({
      type: reducerTypes.GET_UPDATE_HEADER_ALERT,
      payload: true,
    });
    setCheckReadMassage(localStorage.getItem(`${user?.email}`) === 'true') // eslint-disable-next-line 
  },[updateHeaderAlert,dispatch, user])

  const messages = ['Технический чат поддержки работает с 10:00 до 20:00 ежедневно!', 'В настоящее время мы не можем обслуживать клиентов, проживающих не в Российской Федерации.'];

  const [text, setText] = useState(messages[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIndex((index + 1) % messages.length);
    }, 10000);
  }, [index,messages.length]);
  
  const nextText = useMemo(() => {
    return ['Технический чат поддержки работает с 10:00 до 20:00 ежедневно!', 'В настоящее время мы не можем обслуживать клиентов, проживающих не в Российской Федерации.'][index]},
   [index]);

  useEffect(() => {
    setText(nextText);
  }, [nextText]);

  useEffect(() => {
    if(state) {
      handleClick()
      navigate('/')
    };
  }, [state, navigate]);

  return  <>
        <Alert.Heading className="alert-navBar "><span className="fade-in-out">{text}</span></Alert.Heading>
              <div className="navbar-header">
            <SwipeableDrawer anchor={'left'} open={sideBar} onClose={() => setSideBar(false)} onOpen={() => setSideBar(true)}>
            { user?.id? 
                <div  style={{display: "flex",flexDirection: "column",padding:'20px',gap: "15px", fontSize: "18px", background: "#191919", height: '100%'}} >
                <Link className="color-nav-link color" to="/"><HomeIcon></HomeIcon> НА ГЛАВНУЮ</Link>
                <Link className="color-nav-link color" to="/deals"><ListAltIcon></ListAltIcon> МОИ СДЕЛКИ</Link>
                <Link className="color-nav-link color" to="/output"><AccountBalanceIcon></AccountBalanceIcon> МОЙ СЧЕТ:{user.score} РУБ.</Link>
                <Link className="color-nav-link color" to="/howitwork"><HelpIcon></HelpIcon> ПОМОЩЬ</Link>
                <Link className="color-nav-link color" to="#"><GavelIcon></GavelIcon> РАЗРЕШЕНИЕ СПОРОВ</Link>
                <Link className="color-nav-link color" to="/sertificates"><DocumentScannerIcon></DocumentScannerIcon> СЕРТИФИКАТЫ</Link>
                <div style={{cursor:'pointer'}} onClick={() => navigate('/', {state: {key: 'revievs',value: 'true',},
                    })} className="color-nav-link color" ><ReviewsIcon></ReviewsIcon> ОТЗЫВЫ
                  </div>

                </div>
              :
              <div style={{display: "flex",flexDirection: "column",padding:'20px',gap: "15px", fontSize: "18px", background: "#191919", height: '100%'}}>
                <Link className="color-nav-link color" to="/"><HomeIcon></HomeIcon> НА ГЛАВНУЮ</Link>
                <Link className="color-nav-link color" to="/howitwork"><HelpIcon></HelpIcon> ПОМОЩЬ</Link>
                <Link className="color-nav-link color" to="#"><GavelIcon></GavelIcon> РАЗРЕШЕНИЕ СПОРОВ</Link>
                <Link className="color-nav-link color" to="/sertificates"><DocumentScannerIcon></DocumentScannerIcon> СЕРТИФИКАТЫ</Link>
                <div style={{cursor:'pointer'}} onClick={() => navigate('/', {state: {key: 'revievs',value: 'true',},
                    })} className="color-nav-link color" ><ReviewsIcon></ReviewsIcon> ОТЗЫВЫ
                  </div>

              </div>}
            </SwipeableDrawer>
              <div className="nav-main-header">
                <Link className="color-nav-link color header-home" to="/"><HomeIcon></HomeIcon></Link>
                <FormatListBulletedIcon onClick={() => setSideBar(true)} className="color-nav-link color header-burder"></FormatListBulletedIcon>
              { user?.id? 
                <div className="header-navBar" style={{ marginLeft: "25px",display: "flex",width: "640px",justifyContent: "space-between",alignItems: "center"}} >
                <Link className="color-nav-link color" to="/deals">МОИ СДЕЛКИ</Link>
                <Link className="color-nav-link color" to="/output">МОЙ СЧЕТ:{user.score} РУБ.</Link>
                <Link className="color-nav-link color" to="/howitwork">ПОМОЩЬ</Link>
                <Link className="color-nav-link color" to="#">РАЗРЕШЕНИЕ СПОРОВ</Link>
                <Link className="color-nav-link color" to="/sertificates">СЕРТИФИКАТЫ</Link>
                  <div style={{cursor:'pointer'}} onClick={() => navigate('/', {state: {key: 'revievs',value: 'true',},
                    })} className="color-nav-link color" > ОТЗЫВЫ
                  </div>
                </div>
              :
              <div className="flex-nav-link header-navBar">
                <Link className="color-nav-link color" to="/howitwork">ПОМОЩЬ</Link>
                <Link className="color-nav-link color" to="#">РАЗРЕШЕНИЕ СПОРОВ</Link>
                <Link className="color-nav-link color" to="/sertificates">СЕРТИФИКАТЫ</Link>
                <div style={{cursor:'pointer'}} onClick={() => navigate('/', {state: {key: 'revievs',value: 'true',},
                    })} className="color-nav-link color" > ОТЗЫВЫ
                  </div>

              </div>}
              </div>
              { user?.id?
                <div style={{display: "flex",justifyContent: "space-between"}}>
                <Link onClick = {clickArrowdown} className="color-nav-link color" to="#" style={{display: 'flex', flexDirection: 'row'}}>{user.nickname}</Link>
                <KeyboardArrowDownIcon onClick = {clickArrowdown} className={!checked? "hoverArrow" : "transformArrow"}></KeyboardArrowDownIcon>
                {(bellState && !checkReadMessage) || user?.systemMessage === 'true' ? <NotificationsNoneIcon className="bell-color"></NotificationsNoneIcon> : ''}
                  <div onClick={(e) => e.stopPropagation()} className={checked?"user-profile-block js-profile-block_open active": "user-profile-block js-profile-block_open"}>
                        <ul className="nav-detail_list">
                              {user?.role === 'USER' || null || ''?
                              '':
                              <li className="nav-detail_item"><Link className="nav-detail_link" to="/AdminPanel">Админ панель</Link></li>}
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