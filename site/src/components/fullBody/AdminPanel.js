import { useState } from "react";
import AllDeals from "./AllDeals";
import AllUsers from "./AllUsers";

function AdminPanel() {

    const [item, setItem] = useState()

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
            default:
        }
    }

    return <div style={{height: '100vh'}}>
        <div style={{display: 'flex',height: '100vh',background: "black"}}>
            <div style={{display: "flex",flexDirection: "column",width: '22%'}} className="panel_user">
                <button onClick={(e) => visibleItem(e)} name = '0' className={item === 0 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>ВСЕ ПОЛЬЗОВАТЕЛИ</h4>
                </button>
                <button onClick={(e) => visibleItem(e)} name = '1' className={item === 1 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>ВСЕ СДЕЛКИ</h4> 
                </button>
                <button onClick={(e) => visibleItem(e)} name = '2' className={item === 2 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>ВСЕ ЧАТЕРЫ</h4> 
                </button>
            </div>
            <div style={{paddingLeft: '10px'}} className="panel_user">
                <div style={item === 0 ? {display: 'block',width: '100%'}: {display: 'none'}}>
                    <AllUsers />
                </div>
                <div style={item === 1 ? {display: 'block', width: '100%'}: {display: 'none'}}>
                    <AllDeals />
                </div>
                <div style={item === 2 ? {display: 'block'}: {display: 'none'}}>
                    <h3 style={{textAlign: 'center'}}>ЧАТЕРЫ </h3>
                    <div className="tabl-flex">
                        <div style={{textAlign: 'center'}} className="output-id">ID чатера</div>
                        <div style={{textAlign: 'center'}} className="output-date">Почта чатера</div>
                        <div style={{textAlign: 'center'}} className="output-date">Пароль чатера</div>
                        <div style={{textAlign: 'center'}} className="output-sum">Роль чатера</div>
                        <div style={{textAlign: 'center'}} className="output-date">Деньги чатера</div>
                        <div style={{textAlign: 'center'}} className="output-sum">Имя чатера</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AdminPanel