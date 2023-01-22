import Footer from "./Footer";
import Header from "./Header";
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";

function Deal() { 
    const [progress, setProgress] = useState(50)

    return <div className="bg-img">
        <Header />
            <div className='container wrap'>
                <div className="message-body">
                <LinearProgress variant="determinate" value={progress} />
                </div>
            </div>
        <Footer />
    </div>
}

export default Deal;