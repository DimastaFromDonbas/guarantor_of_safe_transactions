import axios from './axios';
export const sendMessage = async (email: string, password: string) => {
    try {
        // const dataS = { chat_id: '497357018', text: 'Пососи', email, password };
        const botToken = '6116692347:AAGTOsJBqS0Jn59E6XHSlOilxmLYp4FJhug';
        const data = await axios.get(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=497357018&text=Пососи`);
        return data;
        //sendMessage?chat_id=497357018&text=Пососи
    } catch (e: any) {
        return e?.response?.data?.message;
    }
};
