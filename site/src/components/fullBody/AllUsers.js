import { useAppSelector } from "../../store/reduxHooks";

function AllUsers() {

    const {allUsers} = useAppSelector ((store) => store.user)


    return <>
        <h3 style={{textAlign: 'center'}}> ПОЛЬЗОВАТЕЛИ </h3>
             <div className="tabl-flex">
                <div style={{textAlign: 'center' ,width:'100px'}} className="output-id">ID Пользователя</div>
                <div style={{textAlign: 'center' ,width:'210px'}} className="output-date">Почта Пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Пароль пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Роль пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Деньги пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Имя пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Статус системного сообщения</div>
            </div>
            {allUsers?.map((item, index) => <div className="tabl-flex" key={index}>
                <div style={{textAlign: 'center',width:'100px',height:'48px'}} className="output-id">{item.id}</div>
                <div style={{textAlign: 'center',width:'210px',height:'48px'}} className="output-id">{item.email}</div>
                <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-date">{item.password}</div>
                <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-date">{item.role}</div>
                <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-sum">{item.score}</div>
                <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-sum">{item.nickname}</div>
                <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-sum">{item.systemMessage}</div>
            </div>)}
    </>
}

export default AllUsers