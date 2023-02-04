import { useState } from "react";
import AllDeposit from "./AllDeposit";
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

    return <div style={{minHeight: '100vh'}}>
        <div style={{display: 'flex',minHeight: '100vh'}} className='styleAdminPanel'>
            <div style={{display: "flex",flexDirection: "column",width: '22%'}} className="panel_user">
                <button onClick={(e) => visibleItem(e)} name = '0' className={item === 0 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>ВСЕ ПОЛЬЗОВАТЕЛИ</h4>
                </button>
                <button onClick={(e) => visibleItem(e)} name = '1' className={item === 1 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>ВСЕ СДЕЛКИ</h4> 
                </button>
                <button onClick={(e) => visibleItem(e)} name = '2' className={item === 2 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>ПОПОЛНЕНИЯ</h4> 
                </button>
                <button onClick={(e) => visibleItem(e)} name = '3' className={item === 3 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>ПЕРЕВОДЫ</h4>
                </button>
                <button onClick={(e) => visibleItem(e)} name = '4' className={item === 4 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>ЧАТЫ ПРОСТО ЧАТЫ</h4> 
                </button>
                <button onClick={(e) => visibleItem(e)} name = '5' className={item === 5 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
                    <h4>СМЕНА ИМЕНИ САЙТА</h4> 
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
                    <AllDeposit />
                </div>
            </div>
        </div>
    </div>
}

export default AdminPanel