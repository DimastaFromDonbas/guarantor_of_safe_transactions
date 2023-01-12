import { Navbar,Container,Nav, Alert} from "react-bootstrap";
import {Routes,Route,Link} from "react-router-dom"
import '../../style/header.css'


function Header() {
    return  <>
        <Alert.Heading style={{backgroundColor: '#E63F3F', color: 'white',margin: 0, height: "40px", textAlign: "center",fontSize: '17px',paddingBottom:'10px',paddingTop:'10px'}}>Технический чат поддержки работает с 10:00 до 20:00 ежедневно!</Alert.Heading>
        <Navbar style={{backgroundColor: "#27272B",margin: 0,padding: 0, height: "66px", opacity: '85'}}>
          <Container className="bg-img">
            <Link style={{color: '#AAAAAB'}} className="nav-link header-hover" to="/main">НА ГЛАВНУЮ</Link>
            <Nav >
              <Link style={{color: '#AAAAAB'}} className="nav-link" to="#">ПОМОЩЬ</Link>
              <Link style={{color: '#AAAAAB'}} className="nav-link" to="#">РАЗРЕШЕНИЕ СПОРОВ</Link>
              <Link style={{color: '#AAAAAB'}} className="nav-link" to="#">ОТЗЫВЫ</Link>
            </Nav>
            <Nav>
              <Link style={{color: '#AAAAAB'}} className="nav-link" to="#">Войти</Link>
              <Link style={{color: '#AAAAAB'}} className="nav-link" to="#">Регистрация</Link>
            </Nav>
          </Container>
        </Navbar>
    </>
}

export default Header