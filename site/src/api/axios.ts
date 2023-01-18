
import axios from "axios";
import jwt_decode from "jwt-decode";
// const LOCAL_URL = 'https://localhost:7004/api/'
/*const host =
  process.env.NODE_ENV === "development"
    ? (process.env.REACT_APP_LOCAL_API_HOST || "localhost:5000")
    : window.location.host;*/

    const host = "localhost:5000";

axios.defaults.baseURL = `http://${host}/`;

// axios.interceptors.request.use((request:any) => {
//
// });

export default axios;


export const axiosRegistration = async (email:string, password:string, nickname: string) => {
  const {data} = await axios.post('api/user/registration', {email, password, role: 'ADMIN', nickname});
  localStorage.setItem('token', data.token);
  console.log('registration', jwt_decode(data.token))
  return jwt_decode(data.token)
}

export const axiosLogin = async (email:string, password:string) => {
  const {data} = await axios.post('api/user/login', {email, password});
  localStorage.setItem('token', data.token);
  console.log('login' ,jwt_decode(data.token));
  return jwt_decode(data.token);
}

export const check = async () => {
  const {data} = await axios.get('api/user/auth' );
  localStorage.setItem('token', data.token);
  console.log('check', jwt_decode(data.token));
  return jwt_decode(data.token);
}

export const axiosChangeNickname = async (nickname: 'string', id: number, password: 'string') => {
  const {data} = await axios.post('api/user/nickname', {nickname, id, password}, {
    headers: {
      "Access-Control-Allow-Origin": true,
      "Content-type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }});
  console.log('nickname', data);
  return data;
}

export const axiosChangePassword = async (newPassword: 'string', id: number, password: 'string') => {
  const {data} = await axios.post('api/user/password', {newPassword, id, password}, {
    headers: {
      "Access-Control-Allow-Origin": true,
      "Content-type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }});
  console.log('password', data);
  return data;
}

export const axiosCreateDeal = async (name:string, buyer:string, seller: string, sum: number, description: string) => {
  const {data} = await axios.post('api/deal/create', {name, buyer, seller, sum, description});
  console.log('create deal', data)
  return data;
}