import { useDispatch } from "react-redux";
import { axiosGetChatID } from "../../../api/botSettings";
import { reducerTypes } from "../../../store/Users/types";
import { StyledDiv, StyledDivHeader } from "../Users/style"
import { useAppSelector } from '../../../store/reduxHooks';
import { Checkbox } from "@mui/material";
import { useEffect } from "react";

function BotAdmin() {

    const dispatch = useDispatch();
    const { telegramUser,user } = useAppSelector((store) => store.user);

    async function getTelegramUsers() {
        const data = await axiosGetChatID();
        if (data) {
            console.log(data);
            dispatch({
                type: reducerTypes.GET_TELEGRAM_USER,
                payload: data,
            });
            
        }
    }

    useEffect(() => {
        getTelegramUsers()
        // eslint-disable-next-line
    },[user])

    return <>
        <div style={{ borderRadius: '5px', width: '450px' }} className="tabl-flex-admin">
            <StyledDivHeader size='150px'>
                Имя
            </StyledDivHeader >
            <StyledDivHeader size='150px'>
                Chat ID
            </StyledDivHeader>
            <StyledDivHeader size='150px'>
                Удаление
            </StyledDivHeader>
        </div>
        {telegramUser?.map(item => <div style={{ marginTop: '5px', borderRadius: '5px',width: '450px'  }} className="tabl-flex-admin-user">
            <StyledDiv size='150px'>
                {item?.name}
            </StyledDiv>
            <StyledDiv size='150px'>
                {item?.chatid}
            </StyledDiv>
            <StyledDiv size='150px'>
                <Checkbox color="error" />
            </StyledDiv>

        </div>

         )}
        
    
    </>
}

export default BotAdmin