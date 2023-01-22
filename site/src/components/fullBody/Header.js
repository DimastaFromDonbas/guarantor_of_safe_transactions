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


function Header() {

  const {user,deals,updateHeaderAlert} = useAppSelector ((store) => store.user)
  const [checked, setChecked] = useState(false)
  const [bellState, setBellState] = useState(false)
  const [checkReadMessage , setCheckReadMassage] = useState(false)

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

  useEffect(() => {
    getDateMessege()
    // eslint-disable-next-line 
  },[deals])

  function clickArrowdown() {
    if (checked) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }

  async function getUsers(e) {
    dispatch({
      type: reducerTypes.GET_USER,
      payload: {}
    });
  }

  useEffect(() => {
    dispatch({
      type: reducerTypes.GET_UPDATE_HEADER_ALERT,
      payload: true,
    });
    setCheckReadMassage(localStorage.getItem(`${user?.email}`) === 'true')
  },[updateHeaderAlert,dispatch])


  return  <>
        <Alert.Heading style={{backgroundColor: '#E63F3F', color: 'white',margin: 0, height: "40px", textAlign: "center",fontSize: '17px',paddingBottom:'10px',paddingTop:'10px'}}>Технический чат поддержки работает с 10:00 до 20:00 ежедневно!</Alert.Heading>
              <div className="navbar-header">
              <div className="nav-main-header">
                <Link className="color-nav-link color" to="/"><HomeIcon></HomeIcon></Link>
              { user?.id? 
                <div style={{ marginLeft: "25px",display: "flex",width: "600px",justifyContent: "space-between",alignItems: "center"}} >
                <Link className="color-nav-link color" to="/deals">МОИ СДЕЛКИ</Link>
                <Link className="color-nav-link color" to="/output">МОЙ СЧЕТ:{user.score} РУБ.</Link>
                <Link className="color-nav-link color" to="#">ПОМОЩЬ</Link>
                <Link className="color-nav-link color" to="#">РАЗРЕШЕНИЕ СПОРОВ</Link>
                <Link className="color-nav-link color" to="#">ОТЗЫВЫ</Link>
                </div>
              :
              <div className="flex-nav-link">
                <Link className="color-nav-link color" to="#">ПОМОЩЬ</Link>
                <Link className="color-nav-link color" to="#">РАЗРЕШЕНИЕ СПОРОВ</Link>
                <Link className="color-nav-link color" to="#">ОТЗЫВЫ</Link>
              </div>}
              </div>
              { user?.id?
                <div onClick = {clickArrowdown} style={{display: "flex",justifyContent: "space-between"}}>
                <Link className="color-nav-link color" to="#" style={{display: 'flex', flexDirection: 'row'}}>{user.nickname}</Link>
                <KeyboardArrowDownIcon className={!checked? "hoverArrow" : "transformArrow"}></KeyboardArrowDownIcon>
                {bellState && !checkReadMessage ? <NotificationsNoneIcon className="bell-color"></NotificationsNoneIcon> : ''}
                  <div className={checked?"user-profile-block js-profile-block_open active": "user-profile-block js-profile-block_open"}>
                        <ul className="nav-detail_list">
                            <li className="nav-detail_item"><Link className="nav-detail_link" to="/systemmessages">Системные сообщения {bellState && !checkReadMessage ? <NotificationsNoneIcon className="bell-color"></NotificationsNoneIcon> : ''}</Link></li>
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