import axios from 'axios';
import jwt_decode from 'jwt-decode';
// const LOCAL_URL = 'https://localhost:7004/api/'
//const host = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_API_HOST || 'asdasdasd-front.onrender.com' : window.location.host;

axios.defaults.baseURL = `http://localhost:5000`;

// axios.interceptors.request.use((request:any) => {
//
// });

export default axios;

export const getConfig = () => ({
    headers: {
        'Access-Control-Allow-Origin': true,
        'Content-type': `application/json`,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});
// SITE NAME

export const axiosGetName = async () => {
    try {
        const { data } = await axios.get('api/name/get');
        return data;
    } catch (error: any) {
        console.error(error);
    }
};

export const axiosGetWallet = async () => {
    try {
        const { data } = await axios.get('api/name/getWallet');
        return data;
    } catch (error: any) {
        console.error(error);
    }
};

export const axiosUpdateName = async (name: string, email: string, password: string) => {
    try {
        const { data } = await axios.post('api/name/update', { name, email, password }, getConfig());
        return data;
    } catch (error: any) {
        console.error(error);
    }
};

export const axiosUpdateWallet = async (wallet: string, email: string, password: string) => {
    try {
        const { data } = await axios.post('api/name/updateWallet', { wallet, email, password }, getConfig());
        return data;
    } catch (error: any) {
        console.error(error);
    }
};

//USER

export const axiosRegistration = async (email: string, password: string, nickname: string, checkRu: string | null) => {
    try {
        const { data } = await axios.post('api/user/registration', { email, password, role: 'ADMIN', nickname, checkRu });
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    } catch (error: any) {
        return error?.response?.data?.message;
    }
};

export const axiosLogin = async (email: string, password: string) => {
    const { data } = await axios.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);

    return jwt_decode(data.token);
};

export const check = async () => {
    if (!localStorage.getItem('token')) return;
    const { data } = await axios.get('api/user/auth', getConfig());
    localStorage.setItem('token', data.token);

    return jwt_decode(data.token);
};

export const axiosChangeNickname = async (nickname: 'string', id: number, password: 'string') => {
    try {
        const { data } = await axios.post('api/user/nickname', { nickname, id, password }, getConfig());

        return data;
    } catch (e: any) {
        return e?.response?.data?.message;
    }
};

export const axiosChangePassword = async (newPassword: 'string', id: number, password: 'string') => {
    try {
        const { data } = await axios.post('api/user/password', { newPassword, id, password }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosGetAllUsers = async () => {
    try {
        const { data } = await axios.get('api/user/get', getConfig());

        return data?.users;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeRole = async (role: string, id: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/user/role', { role, id, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
        return e;
    }
};

export const axiosChangeScore = async (score: number, id: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/user/score', { score, id, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosIncreaseScore = async (id: number, email: string, password: string, receiver: string) => {
    try {
        const { data } = await axios.post('api/user/increaseScore', { id, email, password, receiver }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosDecreaseScore = async (score: number, email: string, password: string) => {
    try {
        const { data } = await axios.post('api/user/decreaseScore', { score, email, password }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeSystemMessage = async (systemMessage: string, id: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/user/message', { systemMessage, id, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeSystemMessageAtUser = async (email: string, password: string) => {
    try {
        const { data } = await axios.post('api/user/messageAtUser', { email, password }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeCompleted = async (completed: number, id: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/user/completed', { completed, id, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeCheckRu = async (checkRu: string, id: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/user/checkRu', { checkRu, id, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeCheckRuUser = async (checkRu: string, email: string, password: string) => {
    try {
        const { data } = await axios.post('api/user/checkRuUser', { checkRu, email, password }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeTransferAmount = async (minimumTransferAmount: number, sumTransferAmoumt: number, id: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/user/transferAmount', { minimumTransferAmount, sumTransferAmoumt, id, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeUser = async (
    id: number,
    role: string,
    score: number,
    systemMessage: string,
    checkRu: string,
    minimumTransferAmount: number,
    completed: number,
    creatorEmail: string,
    creatorPassword: string
) => {
    try {
        const { data } = await axios.post('api/user/change', { id, role, score, systemMessage, checkRu, minimumTransferAmount, completed, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosDeleteUser = async (id: number, creatorEmail: string, creatorPassword: string) => {
    const { data } = await axios.post('api/user/delete', { id, creatorEmail, creatorPassword }, getConfig());

    return data;
};
// DEAL

export const axiosCreateDeal = async (name: string, buyer: string, seller: string, sum: number, description: string, creator: string, buyerNickname?: string, sellerNickname?: string) => {
    try {
        const { data } = await axios.post('api/deal/create', { name, buyer, seller, sum, description: description, buyerNickname, sellerNickname, creator }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosGetDeal = async (email: string, password: string) => {
    const { data } = await axios.post('api/deal/getUserDeals', { email, password }, getConfig());

    return data;
};

export const axiosGetOneDeal = async (id: number) => {
    const { data } = await axios.post('api/deal/getOne', { id }, getConfig());

    return data;
};

export const axiosGetAllDeal = async () => {
    const { data } = await axios.get('api/deal/get', getConfig());

    return data;
};

export const axiosChangeDeal = async (id: number, name: string, sum: number, status: number, description: string, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/deal/update', { id, name, sum, status, description, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeDealStatus = async (id: number, status: number, email: string, password: string) => {
    try {
        const { data } = await axios.post('api/deal/updateStatus', { id, status, email, password }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosDeleteDeal = async (id: number, creatorEmail: string, creatorPassword: string) => {
    const { data } = await axios.post('api/deal/delete', { id, creatorEmail, creatorPassword }, getConfig());

    return data;
};
// REFILL

export const axiosCreateRefill = async (id: number, score: number, user: string, creatorEmail: string, creatorPassword: string) => {
    const time = new Date().toLocaleString().replaceAll(',', '');
    try {
        const { data } = await axios.post('api/refill/create', { id, time, score, user, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosUpdateRefill = async (id: number, time: string, score: number, status: number, uniqueId: number, userEmail: string, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/refill/update', { id, time, score, status, uniqueId, userEmail, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetAllRefills = async () => {
    try {
        const { data } = await axios.get('api/refill/getAll', getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetUserRefills = async (email: string) => {
    try {
        const { data } = await axios.post('api/refill/getUsersRefills', { email }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetRefill = async (id: number) => {
    try {
        const { data } = await axios.post('api/refill/getOne', { id }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosDeleteRefill = async (uniqueId: number, creatorEmail: string, creatorPassword: string) => {
    const { data } = await axios.post('api/refill/delete', { uniqueId, creatorEmail, creatorPassword }, getConfig());

    return data;
};

// USER TRANSFER

export const axiosCreateUserTransfer = async (paymantSystem: string, walletNumber: string, score: number, userEmail: string, userNickname: string, password: string) => {
    try {
        const time = new Date().toLocaleString().replaceAll(',', '');
        const { data } = await axios.post('api/transfer/create', { paymantSystem, walletNumber, time, score, userEmail, userNickname, password }, getConfig());

        return data;
    } catch (e: any) {
        console.log(e);
        return e?.response?.data?.message;
    }
};

export const axiosChangeUserTransfer = async (id: number, score: number, status: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post(
            'api/transfer/update',
            {
                id,
                score,
                status,
                creatorEmail,
                creatorPassword,
            },
            getConfig()
        );

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetAllUserTransfers = async () => {
    try {
        const { data } = await axios.get('api/transfer/getAll', getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetUserTransfers = async (email: string) => {
    try {
        const { data } = await axios.post('api/transfer/getUsersTransfers', { email }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetOneTransfer = async (id: number) => {
    try {
        const { data } = await axios.post('api/transfer/getOne', { id }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

// USER TO USER TRANSFER

export const axiosCreateUserToUserTransfer = async (score: number, userEmail: string, userNickname: string, receiverEmail: string, password: string) => {
    try {
        const time = new Date().toLocaleString().replaceAll(',', '');
        const { data } = await axios.post('api/touser/create', { score, time, userEmail, userNickname, receiverEmail, password }, getConfig());

        return data;
    } catch (e: any) {
        console.log(e);
        return e?.response?.data?.message;
    }
};

export const axiosChangeUserToUserTransfer = async (id: number, score: number, status: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post(
            'api/touser/update',
            {
                id,
                score,
                status,
                creatorEmail,
                creatorPassword,
            },
            getConfig()
        );

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetAllUserToUserTransfers = async () => {
    try {
        const { data } = await axios.get('api/touser/getAll', getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetUserToUserTransfers = async (email: string) => {
    try {
        const { data } = await axios.post('api/touser/getUsersTransfers', { email }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetOneTransferToUser = async (id: number) => {
    try {
        const { data } = await axios.post('api/touser/getOne', { id }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

//  DEAL MESSAGES

export const axiosCreateDealMessages = async (dealId: number, nickname: string, email: string, message: string, role: string) => {
    try {
        const time = new Date().toLocaleString().replaceAll(',', '');
        const { data } = await axios.post('api/dealMessages/create', { dealId, nickname, email, message, time, role }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetDealMessages = async (dealId: number) => {
    try {
        const { data } = await axios.post('api/dealMessages/getDealMessages', { dealId }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
};

//  ADMIN CHAT

export const axiosGetAdminChats = async (adminEmail: string, adminPassword: string) => {
    try {
        const { data } = await axios.post('api/adminChat/get', { adminEmail, adminPassword }, getConfig());
        return data;
    } catch (e) {
        console.log(e);
    }
};
export const axiosGetOneChat = async (email: string, password: string) => {
    try {
        const { data } = await axios.post('api/adminChat/getOne', { email, password }, getConfig());
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosDeleteAdminChat = async (id: number, adminEmail: string, adminPassword: string) => {
    try {
        const { data } = await axios.post('api/adminChat/delete', { id, adminEmail, adminPassword }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosUpdateAdminChatRate = async (rate: number, email: string) => {
    try {
        const { data } = await axios.post('api/adminChat/rate', { rate, email }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

// ADMIN MESSAGE

export const axiosGetMessagestoAdmin = async (email: string) => {
    try {
        const { data } = await axios.post('api/messagesToAdmin/get', { email }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};
