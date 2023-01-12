import { Navbar,Container,Nav, Alert} from "react-bootstrap";
import {Routes,Route,Link} from "react-router-dom"
import '../../style/header.css'
import img1 from '../../image/free-icon-home-7544449.png'
import HomeIcon from '@mui/icons-material/Home';

function Header() {
    return  <>
        <Alert.Heading style={{backgroundColor: '#E63F3F', color: 'white',margin: 0, height: "40px", textAlign: "center",fontSize: '17px',paddingBottom:'10px',paddingTop:'10px'}}>Технический чат поддержки работает с 10:00 до 20:00 ежедневно!</Alert.Heading>
        <Navbar style={{backgroundColor: "#27272B",margin: 0,padding: 0, height: "66px", opacity: '85'}}>
          <Container className="bg-img">
            <Link className="color-nav-link" to="/main"><HomeIcon/></Link>
              <div className="flex-nav-link ">
              <Link className="color-nav-link" to="#">ПОМОЩЬ</Link>
              <Link className="color-nav-link" to="#">РАЗРЕШЕНИЕ СПОРОВ</Link>
              <Link className="color-nav-link" to="#">ОТЗЫВЫ</Link>
              </div>
            <Nav>
              <Link className="color-nav-link" to="#">Войти</Link>
              <Link className="color-nav-link" to="#">Регистрация</Link>
            </Nav>
          </Container>
        </Navbar>
    </>
}

export default Header