function AllDeals() {
    return <>
        <h3 style={{textAlign: 'center'}}>СДЕЛКИ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ НА САЙТЕ</h3> 
        <div className="tabl-flex">
            <div className="output-id">ID сделки</div>
            <div className="output-date">Время создания сделки</div>
            <div className="output-date">Имя продавца</div>
            <div className="output-sum">Почта продавца</div>
            <div className="output-date">Имя покупателя</div>
            <div className="output-sum">Почта покупателя</div>
            <div className="output-sum">Сумма сделки</div>
            <div className="output-sum">Статус сделки </div>
        </div>
    </>
}

export default AllDeals