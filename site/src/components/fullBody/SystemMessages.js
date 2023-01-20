import Footer from "./Footer"
import Header from "./Header"
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

function SystemMessages() {
    return <div className="bg-img">
        <Header />
            <div className="container wrap">
            <HeadsetMicIcon className='chat-icon icon-chat-sizes'></HeadsetMicIcon>
                <div className="">
                    <h3 style={{borderBottom : "1px solid rgb(85, 85, 88)"}} className="login-inner_title">Системные сообщения</h3>
                </div>
            </div>
        <Footer />
    </div>
}

export default SystemMessages