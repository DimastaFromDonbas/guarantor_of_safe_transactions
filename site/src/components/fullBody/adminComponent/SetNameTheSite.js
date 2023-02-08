import { StyledInput } from "../../../style/styles";
// import { useAppSelector } from "../../store/reduxHooks";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../store/reduxHooks";
import { axiosUpdateName } from "../../../api/axios";
import { axiosGetName } from "../../../api/axios";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
function SetNameTheSite() {

    //const {user, nameTheSite} = useAppSelector ((store) => store.user)
    const dispatch = useDispatch();
     const {user, nameTheSite} = useAppSelector ((store) => store.user)
    const [nameSite, setNameSite] = useState('')

    async function updateName() {
        if(!nameSite) return alert('Введите название');
        const result = await axiosUpdateName(nameSite, user?.email, user?.password);
        if(result) {
            alert('Успешно')
        dispatch({
            type: reducerTypes.GET_NAME_THE_SITE,
            payload: {name: result},
          });
        }
    }

    async function getName() {
        const result = await axiosGetName();
        console.log('result', result)
        if(result) {
        dispatch({
            type: reducerTypes.GET_NAME_THE_SITE,
            payload: {name: result},
          });
        }
    }

    function changesNameSite(e) {
        setNameSite(e.currentTarget.value)
    }

    useEffect(() => {
        getName()
         // eslint-disable-next-line 
       },[])

    return <>
             <h3 style={{textAlign: 'center'}}>Предыдущее название: {nameTheSite?.name}</h3> 
         <h3 style={{textAlign: 'center'}}>СМЕНА НАЗВАНИЯ САЙТА </h3> 

         <div style={{display: 'flex',justifyContent: "center",marginTop: "20px",gap: "10px"}}>
            <StyledInput className="tabl-flex-admin-search"
                style={{color: "white",borderRadius: "5px", paddingLeft: '10px'}}
                type="search"
                id='Search'
                value={nameSite}
                placeholder="Смена названия сайта"
                onChange={changesNameSite}
                autoComplete="off"
                required />
            <div className="tabl-flex-admin-button-changes" onClick={updateName}>
            Изменить имя сайта 
            </div>
        </div>
    </>
}

export default SetNameTheSite