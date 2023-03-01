import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { axiosGetAllRefills } from "../../../api/axios";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from "../../../store/Users/types";
import { refillStatusMock } from "../../../components/mock/OutputMock";
import { axiosUpdateRefill } from "../../../api/axios";

function RefillID() {

    const { id } = useParams()
    const dispatch = useDispatch();
    const statebackground = !!localStorage.getItem('backroundImg')
    const [currentRefill, setCurrentRefill] = useState(null)
    const [idRefill, setIdRefil] = useState()
    const [timeRefill, setTimeRefill] = useState('')
    const [scoreRefiil, setScoreRefill] = useState()
    const [statusRefill, setStatusRefill] = useState('')
    const [uniqueID, setUniqueID] = useState()
    const { user, allRefills } = useAppSelector((store) => store.user)
    const navigate = useNavigate()

    async function getAllRefills() {
        const data = await axiosGetAllRefills();
        if (data) {
            dispatch({
                type: reducerTypes.GET_ALL_REFILLS,
                payload: data,
            });
        }
    }

    async function changeRefill() {
        if (!timeRefill || !scoreRefiil || !scoreRefiil) return alert('Введите все данные');
        if (scoreRefiil < 0) return alert('Значение меньше 0')
        const result = await axiosUpdateRefill(Number(idRefill), timeRefill, Number(scoreRefiil), Number(statusRefill), Number(uniqueID), currentRefill?.userEmail, user?.email, user?.password);
        if (result) {
            getAllRefills();
            return alert('Успешно')
        };
        alert('Что-то пошло не так')
    }

    useEffect(() => {
        if (user?.role === 'USER' || user?.role === null || user?.role === '' || user?.role === undefined) {
            navigate("/")
        }
    }, [user?.role, navigate, user])

    useEffect(() => {
        const temporaryRefill = allRefills?.filter(item => item.uniqueId === Number(id))[0]
        if (temporaryRefill) {
            setCurrentRefill(temporaryRefill)
            setIdRefil(temporaryRefill?.id)
            setTimeRefill(temporaryRefill?.time)
            setScoreRefill(temporaryRefill?.score)
            setStatusRefill(temporaryRefill?.status)
            setUniqueID(temporaryRefill?.uniqueId)
        }
        // eslint-disable-next-line 
    }, [allRefills])


    useEffect(() => {
        getAllRefills();
        // eslint-disable-next-line 
    }, [])

    return <>
        <div style={{ display: 'flex', minHeight: '100vh', justifyContent: "center", }} className={!statebackground ? 'styleAdminPanel' : 'styleAdminPanel2'}>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(17, 17, 18, 0.65)" }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: '10px', color: 'white' }}>
                    <div onClick={() => navigate("/adminPanel")} className="tabl-flex-admin-button-global2">
                        Вернуться назад
                    </div>
                </div>
                <div style={{ marginTop: '20px', color: "white" }}>
                    <div style={{ borderRadius: "5px" }} className="tabl-flex-admin">
                        <div style={{ textAlign: 'center', width: '50px' }} className="output-id">ID</div>
                        <div style={{ textAlign: 'center', width: '155px' }} className="output-sum">Имя пользователя</div>
                        <div style={{ textAlign: 'center', width: '210px' }} className="output-sum">Почта пользователя</div>
                        <div style={{ textAlign: 'center', width: '155px' }} className="output-sum">Время создания</div>
                        <div style={{ textAlign: 'center', width: '155px' }} className="output-sum">Сумма пополнения</div>
                        <div style={{ textAlign: 'center', width: '120px' }} className="output-date">Сутатус</div>
                        <div style={{ textAlign: 'center', width: '100px' }} className="output-date">UNIQUE ID</div>
                    </div>
                    {<div style={{ marginTop: '5px', borderRadius: '5px' }} className="tabl-flex-admin-user" key={currentRefill?.email}>
                        <div style={{ width: '50px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center" }} className="output-id">{idRefill}</div>
                        <div style={{ width: '155px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center" }} className="output-sum">{currentRefill?.userNickname}</div>
                        <div style={{ width: '210px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center", overflowWrap: "anywhere" }} className="output-sum">{currentRefill?.userEmail}</div>
                        <div style={{ width: '155px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center" }} className="output-sum">{timeRefill}</div>
                        <div style={{ width: '155px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center" }} className="output-sum">{scoreRefiil}p</div>
                        <div style={{ width: '120px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center" }} className="output-date">{refillStatusMock[statusRefill - 1]}</div>
                        <div style={{ width: '100px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center", overflowWrap: "anywhere" }} className="output-sum">{uniqueID}</div>
                    </div>}
                    <div className='pages-user-box-2'>
                        <div style={{ flexDirection: "column" }} className='pages-user-block'>
                            <h6 style={{ margin: "0", textAlign: "center" }}>Изменение ID пополнения</h6>
                            <input
                                onChange={(e) => setIdRefil(e.target.value || 0)}
                                className="tabl-flex-admin-user-scores "
                                style={{ color: "white", borderRadius: "5px" }}
                                type="number"
                                name="name"
                                placeholder="Изменение денег пользователя"
                                autoComplete="off"
                                required
                                value={idRefill || 0}
                            />
                        </div>
                        <div style={{ flexDirection: "column" }} className='pages-user-block'>
                            <h6 style={{ margin: "0", textAlign: "center" }}>Изменение времени пополнения</h6>
                            <input
                                onChange={(e) => setTimeRefill(e.target.value)}
                                className="tabl-flex-admin-user-scores "
                                style={{ color: "white", borderRadius: "5px" }}
                                type="text"
                                name="name"
                                placeholder="Изменение денег пользователя"
                                autoComplete="off"
                                required
                                value={timeRefill || ''}
                            />
                        </div>
                        <div style={{ flexDirection: "column" }} className='pages-user-block'>
                            <h6 style={{ margin: "0", textAlign: "center" }}>Изменение суммы пополнения</h6>
                            <input
                                onChange={(e) => setScoreRefill(e.target.value || 0)}
                                className="tabl-flex-admin-user-scores "
                                style={{ color: "white", borderRadius: "5px" }}
                                type="number"
                                name="name"
                                placeholder="Изменение денег пользователя"
                                autoComplete="off"
                                required
                                value={scoreRefiil || 0}
                            />
                        </div>
                        <div style={{ flexDirection: "column" }} className='pages-user-block'>
                            <h6 style={{ margin: "0", textAlign: "center" }}>Изменение статуса пополнения</h6>
                            <select
                                onChange={(e) => setStatusRefill(e.target.value)}
                                style={{ color: "white", borderRadius: "5px" }}
                                className="tabl-flex-admin-user-scores "
                                name="select"
                                value={String(statusRefill || 1)}>
                                <option value="1">В обработке</option>
                                <option value="2">Успешный</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ width: '100%', display: "flex", marginTop: "20px", justifyContent: "center" }}>
                        <div className="tabl-flex-admin-button-global" onClick={changeRefill}>
                            Внести изменения
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default RefillID