import { useDispatch } from 'react-redux';
import { axiosGetUserRefills } from '../../../api/axios';
import { reducerTypes } from '../../../store/Users/types';
import { useAppSelector } from '../../../store/reduxHooks';
import { useEffect } from 'react';

function RefillsHistory() {
    const { user, myRefills, nameTheSite } = useAppSelector((store) => store.user);
    const dispatch = useDispatch();
    const SSizeBlock = {
        width: '231px',
        display: 'flex',
        justifyContent: 'center',
    };

    async function getUserRefills() {
        let result = await axiosGetUserRefills(user?.email);
        if (result) {
            dispatch({
                type: reducerTypes.GET_MY_REFILLS,
                payload: result,
            });
        }
    }

    useEffect(() => {
        getUserRefills();
        // eslint-disable-next-line
    }, [user, user.email]);

    return (
        <div className="flex-box-0">
            <div className="nav-account__content">
                <div className="account-wrap__about-info" style={{ marginTop: '40px' }}>
                    <p>{nameTheSite.name} не является банком, платежной системой или другой финансовой организацией и не ведет расчетные счета пользователей.</p>
                    <p>Кабинет {nameTheSite.name} обеспечивает лишь удобство расчетов между клиентами.</p>
                </div>
            </div>
            <div className="account-wrap__time-info">Перевод осуществляется в течении 24 ч</div>
            <div className="output-description-info-block">
                <div style={SSizeBlock} className="output-id">
                    ID
                </div>
                <div style={SSizeBlock} className="output-date">
                    Дата
                </div>
                <div style={SSizeBlock} className="output-sum">
                    Сумма
                </div>
            </div>
            {myRefills?.map((item, index) => (
                <div className="flex-info-block" key={index}>
                    <div style={SSizeBlock} className="output-id">
                        {item.id}
                    </div>
                    <div style={SSizeBlock} className="output-date">
                        {item.time}
                    </div>
                    <div style={SSizeBlock} className="output-sum">
                        {item.score}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RefillsHistory;
