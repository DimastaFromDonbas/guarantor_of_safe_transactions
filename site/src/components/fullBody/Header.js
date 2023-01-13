import { Alert} from "react-bootstrap";
import {Link} from "react-router-dom"
import '../../style/header.css'
import HomeIcon from '@mui/icons-material/Home';


function Header() {
    return  <>
        <Alert.Heading style={{backgroundColor: '#E63F3F', color: 'white',margin: 0, height: "40px", textAlign: "center",fontSize: '17px',paddingBottom:'10px',paddingTop:'10px'}}>Технический чат поддержки работает с 10:00 до 20:00 ежедневно!</Alert.Heading>
              <div className="navbar-header">
              <div className="nav-main-header">
                <Link className="color-nav-link color" to="/"><HomeIcon></HomeIcon></Link>
              <div className="flex-nav-link">
                <Link className="color-nav-link color" to="#">ПОМОЩЬ</Link>
                <Link className="color-nav-link color" to="#">РАЗРЕШЕНИЕ СПОРОВ</Link>
                <Link className="color-nav-link color" to="#">ОТЗЫВЫ</Link>
              </div>
              </div>
              <div className="flex-nav-link-registr ">
                <Link className="color-nav-link color" to="/login" style={{display: 'flex', flexDirection: 'row'}}>Войти <div style={{width: '1px', height: '12px', border: '0.5px solid rgb(170, 170, 171)', position: 'relative', left: '12.5px', top: '6px'}}></div></Link>
                <Link className="color-nav-link color" to="/registr">Регистрация</Link>
              </div>
              </div>
    </>
}

export default Header