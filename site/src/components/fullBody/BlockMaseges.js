import Chat from "./Chat"
import Footer from "./Footer"
import Header from "./Header"
import { useAppSelector } from "../../store/reduxHooks"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function BlockMaseges() {
    const navigate = useNavigate();
    const { user } = useAppSelector((store) => store.user);

    useEffect(() => {
        if (user?.checkRu === 'true') {
            navigate("/")
        }
    }, [user, navigate])


    return <div className="bg-img">
        <Header />
        <Chat />
        <div style={{ minHeight: "90vh" }} className="container">
            <h2 style={{ color: "red", marginTop: '30px' }}>Ваш аккаунт заблокирован ,обратитесь в поддержку для выяснения причин</h2>
        </div>
        <Footer />
    </div>
}

export default BlockMaseges