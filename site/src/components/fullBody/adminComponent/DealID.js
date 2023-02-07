import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../store/reduxHooks"

function DealID() {

    const { id } = useParams()
    const {allDeals} = useAppSelector ((store) => store.user)

    return <>
        <div style={{display: 'flex',minHeight: '100vh',justifyContent: "center",}} className='styleAdminPanel'>
            <div style={{width: "100%",display: "flex",flexDirection: "column",alignItems: "center",background: "rgba(17, 17, 18, 0.65)"}}>
                <div style={{marginTop:'20px',color: "white"}}>
                    <div style={{borderRadius: "5px"}} className="tabl-flex-admin">
                        <div style={{textAlign: 'center' ,width:'50px'}} className="output-id">ID</div>
                        <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Имя пользователя</div>
                        <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Cумма сделки</div>
                        <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Статус сделки</div>
                        <div style={{textAlign: 'center' ,width:'210px'}} className="output-date">Описание</div>

                    </div>
                    {allDeals?.filter( user => user.id === Number(id) )?.map((item, index) => <div style={{marginTop:'5px',borderRadius:'5px'}} className="tabl-flex-admin-user" key={item?.email}>
                        <div style={{width:'50px',display: "flex",alignItems: "center",justifyContent: "center"}}  className="output-id">{item.id}</div>
                        <div style={{width:'155px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.name}</div>
                        <div style={{width:'155px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-date">{item.sum}</div>
                        <div style={{width:'155px',display: "flex",alignItems: "center",justifyContent: "center"}} className="output-sum">{item.status}p</div>
                        <div style={{width:'210px',display: "flex",alignItems: "center",justifyContent: "center",overflowWrap: "anywhere"}} className="output-id">{item.description}</div>
                    </div>)}
                </div>
            </div>
        </div>
    </>
}

export default DealID