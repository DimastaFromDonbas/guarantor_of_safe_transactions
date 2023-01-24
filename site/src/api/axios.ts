
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

export const getConfig = () => ({
    headers: {
      "Access-Control-Allow-Origin": true,
      "Content-type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }})

//USER

export const axiosRegistration = async (email:string, password:string, nickname: string) => {
  try {const {data} = await axios.post('api/user/registration', {email, password, role: 'ADMIN', nickname});
  localStorage.setItem('token', data.token);
  console.log('registration', jwt_decode(data.token))
  return jwt_decode(data.token)}
  catch (error: any){
    console.log(error?.response?.data?.message)
    return error?.response?.data?.message
  }
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
  try {const {data} = await axios.post('api/user/nickname', {nickname, id, password}, getConfig());
  console.log('nickname', data);
  return data;}
  catch (e: any) {
    return e?.response?.data?.message
  }
}

export const axiosChangePassword = async (newPassword: 'string', id: number, password: 'string') => {
  const {data} = await axios.post('api/user/password', {newPassword, id, password}, getConfig());
  console.log('password', data);
  return data;
}

// DEAL

export const axiosCreateDeal = async (
  name:string, 
  buyer:string, 
  seller: string, 
  sum: number, 
  description: string, 
  buyerNickname?: string, 
  sellerNickname?: string) => {
  const {data} = await axios.post('api/deal/create', {name, buyer, seller, sum, description, buyerNickname, sellerNickname}, getConfig());
  console.log('create deal', data)
  return data;
}

export const axiosGetDeal = async (email:string, password:string) => {
  const {data} = await axios.post('api/deal/getUserDeals', {email, password}, getConfig());
  console.log('get deal', data)
  return data;
}

export const axiosGetOneDeal = async (id: number) => {
  const {data} = await axios.post('api/deal/getOneDeal', {id}, getConfig());
  console.log('get one deal', data)
  return data;
}

// REFILL

export const axiosCreateRefill = async (id: number,
   time: string, 
   score: number,
   status: number, 
   userEmail: string, 
   creatorEmail: string, 
   creatorPassword: string) => {
  try{const {data} = await axios.post('api/refill/create', {id, time, score, status,userEmail, creatorEmail, creatorPassword}, getConfig());
  console.log('create refill', data)
  return data}
  catch (e) {console.log(e)}
}

export const axiosUpdateRefill = async (id: number,
  time: string, 
  score: number,
  status: number, 
  userEmail: string, 
  creatorEmail: string, 
  creatorPassword: string) => {
 try{const {data} = await axios.post('api/refill/update', {id, time, score, status,userEmail, creatorEmail, creatorPassword}, getConfig());
 console.log('update refill', data)
 return data}
 catch (e) {console.log(e)}
}

export const axiosGetAllRefills = async () => {
 try{const {data} = await axios.get('api/refill/getAll', getConfig());
 console.log('get all refill', data)
 return data}
 catch (e) {console.log(e)}
}

export const axiosGetUserRefills = async (email: string) => {
 try{const {data} = await axios.post('api/refill/getUsersRefills', {email}, getConfig());
 console.log('users refills', data)
 return data}
 catch (e) {console.log(e)}
}

export const axiosGetRefill = async (id: number) => {
  try{const {data} = await axios.post('api/refill/getOne', {id}, getConfig());
  console.log('get refill', data)
  return data}
  catch (e) {console.log(e)}
 }