function AllDeposit() {
    return <>
           <div style={{display: "flex",justifyContent: "center"}}> <h2>ПОЛЬЗОВАТЕЛИ</h2></div>

            <div style={{borderRadius: "5px"}} className="tabl-flex-admin">
                <div style={{textAlign: 'center' ,width:'80px'}} className="output-id">ID</div>
                <div style={{textAlign: 'center' ,width:'210px'}} className="output-date">Почта Пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Роль пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Деньги пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Имя пользователя</div>
                <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Статус системного сообщения</div>
                <div style={{textAlign: 'center' ,width:'80px'}} className="output-sum">Completed</div>
                <div style={{textAlign: 'center' ,width:'80px'}} className="output-sum">Удалить</div>
            </div>
        </>
}

export default AllDeposit