import { useParams } from "react-router-dom"

function RefillID() {

    const { id } = useParams()

    return <>
            <div style={{display: 'flex',minHeight: '100vh',justifyContent: "center",}} className='styleAdminPanel'>
                <div style={{width: "100%",display: "flex",flexDirection: "column",alignItems: "center",background: "rgba(17, 17, 18, 0.65)"}}>
                    
                </div>
            </div>
    </>
}

export default RefillID