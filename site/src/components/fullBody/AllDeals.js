import { useAppSelector } from "../../store/reduxHooks";

function AllDeals() {

    const {allDeals} = useAppSelector ((store) => store.user)

    return <>
        <h3 style={{textAlign: 'center'}}>СДЕЛКИ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ НА САЙТЕ</h3> 
        <div className="tabl-flex">
            <div style={{textAlign: 'center' ,width:'100px'}} className="output-id">ID сделки</div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Время создания сделки</div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Имя продавца</div>
            <div style={{textAlign: 'center' ,width:'210px'}} className="output-sum">Почта продавца</div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-date">Имя покупателя</div>
            <div style={{textAlign: 'center' ,width:'210px'}} className="output-sum">Почта покупателя</div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Сумма сделки</div>
            <div style={{textAlign: 'center' ,width:'155px'}} className="output-sum">Статус сделки </div>
        </div>
        {allDeals?.map((item, index) => <div className="tabl-flex" key={index}>
            <div style={{textAlign: 'center',width:'100px',height:'48px'}} className="output-id">{item.id}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-id">{item.createdAt}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-date">{item.sellerNickname}</div>
            <div style={{textAlign: 'center',width:'210px',height:'48px'}} className="output-date">{item.seller}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-sum">{item.buyerNickname}</div>
            <div style={{textAlign: 'center',width:'210px',height:'48px'}} className="output-sum">{item.buyer}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-sum">{item.sum}</div>
            <div style={{textAlign: 'center',width:'155px',height:'48px'}} className="output-sum">{item.status}</div>
        </div>)}
    </>
}

export default AllDeals