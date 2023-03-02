import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../store/reduxHooks";
import { useState, useEffect } from "react"
import { socket } from "../../App";
import HeaderOutput from "./components/HeaderOutput";
import RefillsHistory from "./components/RefillsHistory";
import TransferByDetails from "./components/TransferByDetails";
import TransferToUser from "./components/TransferToUser";


function Output() {

    const navigate = useNavigate()
    const { user } = useAppSelector((store) => store.user)
    const [item, setItem] = useState(1)

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

    useEffect(() => {
        if (user?.checkRu) {
            if (user?.checkRu !== 'true') {
                navigate("/blockMaseges")
            }
        }
    }, [user.checkRu, navigate])

    useEffect(() => {
        if (!user?.email) return;
        const time = new Date().toLocaleString().replaceAll(',', '');
        socket.emit('location', { email: user?.email, location: document?.location?.pathname, time });
        // eslint-disable-next-line
    }, [user]);

    return <div className="bg-img" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <div style={{ minHeight: '80vh' }} className="container bg-img">
            <div className="page-container-2 page-container--bg_transparent">
                <HeaderOutput />
                <div className="account-wrap__nav nav-account">
                    <div className="nav-account__tabs">
                        <button onClick={(e) => visibleItem(e)} name='0' className={item === 0 ? "nav-account__link activ-link" : "nav-account__link"}>История пополнений</button>
                        <button onClick={(e) => visibleItem(e)} name='1' className={item === 1 ? "nav-account__link activ-link" : "nav-account__link"}>Перевод по реквизитам</button>
                        <button onClick={(e) => visibleItem(e)} name='2' className={item === 2 ? "nav-account__link activ-link" : "nav-account__link"}>Перевод пользователю</button>
                    </div>
                    {item === 0 && <div className="flex-box-0"> <RefillsHistory /> </div> }
                    {item === 1 && <div className="flex-box-1"> <TransferByDetails /> </div> }
                    {item === 2 && <div className="flex-box-2"> <TransferToUser /> </div> }
                </div>
            </div>
        </div>
    </div>
}

export default Output