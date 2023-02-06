import { StyledInput } from "../../../style/styles";
// import { useAppSelector } from "../../store/reduxHooks";
import { useState } from "react";

function SetNameTheSite() {

    // const {nameTheSite} = useAppSelector ((store) => store.user)
    const [nameSite, setNameSite] = useState('')

    function changesNameSite(e) {
        setNameSite(e.currentTarget.value)
    }

    return <>
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
            <div className="tabl-flex-admin-button-changes">
            Изменить имя сайта 
            </div>
        </div>
    </>
}

export default SetNameTheSite