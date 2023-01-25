function AllUsers() {
    return <>
        <h3 style={{textAlign: 'center'}}> ПОЛЬЗОВАТЕЛИ </h3>
             <div className="tabl-flex">
                <div style={{textAlign: 'center'}} className="output-id">ID Пользователя</div>
                <div style={{textAlign: 'center'}} className="output-date">Почта Пользователя</div>
                <div style={{textAlign: 'center'}} className="output-date">Пароль пользователя</div>
                <div style={{textAlign: 'center'}} className="output-sum">Роль пользователя</div>
                <div style={{textAlign: 'center'}} className="output-date">Деньги пользователя</div>
                <div style={{textAlign: 'center'}} className="output-sum">Имя пользователя</div>
                <div style={{textAlign: 'center'}} className="output-sum">Статус системного сообщения</div>
            </div>
    </>
}

export default AllUsers