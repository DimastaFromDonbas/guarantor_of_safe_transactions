import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store/reduxHooks';
import { reducerTypes } from '../../../store/Users/types';
import { axiosCreateUserToUserTransfer, axiosGetUserToUserTransfers } from '../../../api/axios';

function TransferToUser() {
    const { user, transfersToUser, nameTheSite } = useAppSelector((store) => store.user);
    const statuses = ['Открыта', 'В процессе ', 'Завершена', 'Заморожена'];
    const [receiver, setReceiver] = useState('');
    const [receiverScore, setReceiverScore] = useState(0);
    const [dataId, setDataId] = useState();
    const dispatch = useDispatch();
    const SSizeBlock = {
        width: '231px',
        display: 'flex',
        justifyContent: 'center',
    };
    const SSizeBlockUnickl = {
        width: '231px',
        display: 'flex',
        justifyContent: 'center',
        overflowWrap: 'anywhere',
    };

    async function createTransferToUser() {
        if (user?.systemMessage === 'true') return alert('Ваш аккаунт не верифицирован');
        if (user?.score < receiverScore) return alert('Недостаточно средств');
        const result = await axiosCreateUserToUserTransfer(receiverScore, user?.email, user?.nickname, receiver, user?.password);
        if (typeof result === 'string') {
            alert(result);
        } else {
            dispatch({
                type: reducerTypes.GET_USER,
                payload: result.user,
            });
            getUserTransfersToUser();
            alert('Перевод создан');
        }
    }

    async function getUserTransfersToUser() {
        let result = await axiosGetUserToUserTransfers(user?.email);
        if (result) {
            dispatch({
                type: reducerTypes.GET_TRANSFERS_TO_USER,
                payload: result,
            });
        }
    }

    useEffect(() => {
        setDataId((Math.random() * 1000).toFixed(0));
    }, []);

    useEffect(() => {
        getUserTransfersToUser();
        // eslint-disable-next-line
    }, [user, user.email]);

    return (
        <div className="flex-box-2">
            <div className="nav-account__content">
                <div className="nav-account__operation operation">
                    <div className="operation__heading">Операция №{dataId}</div>
                    <div className="form-operation">
                        <div className="form-operation__input-section">
                            <div style={{ width: '510px' }} className="form-operation__item">
                                <Form.Label htmlFor="inputPassword5">Получатель:</Form.Label>
                                <Form.Control onChange={(e) => setReceiver(e.currentTarget.value)} type="text" id="inputText" placeholder="Логин пользователя" />
                            </div>
                            <div className="form-operation__item">
                                <Form.Label htmlFor="inputPassword5">Cумма:</Form.Label>
                                <Form.Control onChange={(e) => setReceiverScore(Number(e.currentTarget.value))} type="number" id="inputText" placeholder="0.00" />
                            </div>
                        </div>
                        <button className="btn-orange" onClick={() => createTransferToUser()}>
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
            <div className="account-wrap__about-info">
                <p>{nameTheSite.name} не является банком, платежной системой или другой финансовой организацией и не ведет расчетные счета пользователей.</p>
                <p>Кабинет {nameTheSite.name} обеспечивает лишь удобство расчетов между клиентами.</p>
            </div>
            <div className="account-wrap__time-info">Перевод осуществляется в течении 24 ч</div>
            <div className="alert-block">
                {transfersToUser ? (
                    <>
                        <div className="output-description-info-block">
                            <div style={SSizeBlock} className="output-id dilit-block">
                                ID
                            </div>
                            <div style={SSizeBlock} className="output-date">
                                Email пользователя
                            </div>
                            <div style={SSizeBlock} className="output-sum">
                                Сумма
                            </div>
                            <div style={SSizeBlock} className="output-sum">
                                Время перевода
                            </div>
                            <div style={SSizeBlock} className="output-sum">
                                Состояние перевода{' '}
                            </div>
                        </div>
                        {transfersToUser
                            ?.sort((a, b) => a.id - b.id)
                            ?.map((item, index) => (
                                <div style={{ justifyContent: 'space-around' }} className="flex-info-block" key={index}>
                                    <div style={SSizeBlock} className="output-id dilit-block">
                                        {item.id}
                                    </div>
                                    <div style={SSizeBlockUnickl} className="output-date">
                                        {item.receiverEmail}
                                    </div>
                                    <div style={SSizeBlock} className="output-sum">
                                        {item.score}
                                    </div>
                                    <div style={SSizeBlock} className="output-sum">
                                        {item.time}
                                    </div>
                                    <div style={SSizeBlock} className="output-sum">
                                        {statuses[item?.status === 0 ? item?.status : item?.status - 1]}
                                    </div>
                                </div>
                            ))}
                    </>
                ) : (
                    <p className="text-alert">История выводов по реквизитам пуста</p>
                )}
            </div>
        </div>
    );
}

export default TransferToUser;
