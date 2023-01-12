import Body from "./fullBody/Body";
import Footer from "./fullBody/Footer";
import Header from "./fullBody/Header";
import '../style/body.css'

function Main() {
    return <div className="bg-img">
        <Header />
        <Body />
        <Footer />
    </div>
}

export default Main;