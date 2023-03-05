import axios from './axios';
import { getConfig } from './axios';

export const axiosGetChatID = async () => {
    console.log(2)
    const { data } = await axios.get('api/tg/get', getConfig());
    console.log(1, data)
    if(data) {
        return data;
    }
};

export const axiosCreateChat = async (name: string,chatid:string,email:string,password:string) => {
    const { data } = await axios.post('api/tg/create', { name, chatid, email, password }, getConfig());
    if(data) {
        return data;
    }
};

export const axiosDeleteChat = async (name: string,email:string,password:string) => {
    const { data } = await axios.post('api/tg/delete', { name, email, password }, getConfig());
    if(data) {
        return data;
    }
};

