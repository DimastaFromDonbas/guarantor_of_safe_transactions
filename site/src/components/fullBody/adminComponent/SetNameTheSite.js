import {StyledInput} from '../../../style/styles';
// import { useAppSelector } from "../../store/reduxHooks";
import {useState, useEffect} from 'react';
import {useAppSelector} from '../../../store/reduxHooks';
import {axiosGetWallet, axiosUpdateName} from '../../../api/axios';
import {axiosGetName} from '../../../api/axios';
import {useDispatch} from 'react-redux';
import {reducerTypes} from '../../../store/Users/types';
function SetNameTheSite() {
    //const {user, nameTheSite} = useAppSelector ((store) => store.user)
    const dispatch = useDispatch();
    const {user, nameTheSite, criptoWallet} = useAppSelector((store) => store.user);
    const [nameSite, setNameSite] = useState('');
    const [walletSite, setWalletSite] = useState('');

    async function updateName() {
        if (!nameSite) return alert('Введите название');
        const result = await axiosUpdateName(nameSite, user?.email, user?.password);
        if (result) {
            alert('Успешно');
            dispatch({
                type: reducerTypes.GET_NAME_THE_SITE,
                payload: {name: result}
            });
        }
    }

    async function updateWallet() {
        if (!walletSite) return alert('Введите кошелек');
        const result = await axiosUpdateName(walletSite, user?.email, user?.password);
        if (result) {
            alert('Успешно');
            dispatch({
                type: reducerTypes.GET_CRIPTO_WALLET,
                payload: {wallet: result}
            });
        }
    }

    async function getName() {
        const result = await axiosGetName();
        if (result) {
            dispatch({
                type: reducerTypes.GET_NAME_THE_SITE,
                payload: {name: result}
            });
            localStorage.setItem('siteName', result);
        }
    }

    async function getWallet() {
        const result = await axiosGetWallet();
        if (result) {
            dispatch({
                type: reducerTypes.GET_CRIPTO_WALLET,
                payload: {wallet: result}
            });
            localStorage.setItem('siteWallet', result);
        }
    }

    function changesNameSite(e) {
        setNameSite(e.currentTarget.value);
    }

    function changesWalletSite(e) {
        setWalletSite(e.currentTarget.value);
    }

    useEffect(() => {
        getName();
        getWallet();
        // eslint-disable-next-line
    }, [user]);

    return (
        <>
            <h3 style={{textAlign: 'center'}}>Предыдущее название: {nameTheSite?.name}</h3>
            <h3 style={{textAlign: 'center'}}>СМЕНА НАЗВАНИЯ САЙТА И КОШЕЛЬКА</h3>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                    gap: '10px'
                }}
            >
                <StyledInput
                    className="tabl-flex-admin-search"
                    style={{
                        color: 'white',
                        borderRadius: '5px',
                        paddingLeft: '10px'
                    }}
                    type="search"
                    id="Search"
                    value={nameSite}
                    placeholder="Смена названия сайта"
                    onChange={changesNameSite}
                    autoComplete="off"
                    required
                />
                <div className="tabl-flex-admin-button-changes" onClick={updateName}>
                    Изменить имя сайта
                </div>
            </div>

            <h3 style={{textAlign: 'center', marginTop: '20px'}}>Предыдущее название: {criptoWallet?.wallet}</h3>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                    gap: '18px'
                }}
            >
                <StyledInput
                    className="tabl-flex-admin-search"
                    style={{
                        color: 'white',
                        borderRadius: '5px',
                        paddingLeft: '10px'
                    }}
                    type="search"
                    id="Search"
                    value={walletSite}
                    placeholder="Смена кошелька"
                    onChange={changesWalletSite}
                    autoComplete="off"
                    required
                />
                <div className="tabl-flex-admin-button-changes" onClick={updateWallet}>
                    Изменить кошелек
                </div>
            </div>
        </>
    );
}

export default SetNameTheSite;
