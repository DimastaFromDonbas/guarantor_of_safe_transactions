import { Form } from "react-bootstrap"
import Footer from "./Footer"
import Header from "./Header"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from "react-router-dom";

function Deals() {
    return <div className="bg-img">
        <Header />
            <div className="container wrap">
                <div className="container">
                    <div className="dial-flex_box">
                        <div>
                        <Form.Label htmlFor="inputPassword5">Мои сделки</Form.Label>
                        <button className="spec-btn-ux"><Link style={{textDecoration: "none", color: 'white', fontSize: '14px'}} to = '#'>Сделать сделку <AddCircleOutlineIcon></AddCircleOutlineIcon></Link></button>
                        </div>
                        <table class="trades-table">
                                    <tbody>
                                        <tr>
                                            <th style={{width: "25%"}}>Название</th>
                                            <th>Номер сделки</th>
                                            <th>Сумма</th>
                                            <th>Статус</th>
                                        </tr>
                        </tbody>
                        
                        </table>
                    </div>
                </div>
            </div>
        <Footer /> 
    </div>
}

export default Deals