
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


export const axiosRegistration = async (email:string, password:string) => {
  const {data} = await axios.post('api/user/registration', {email, password, role: 'ADMIN', nickname: 'zalupa'})
  localStorage.setItem('token', data.token)
  console.log('registration', jwt_decode(data.token))
  return jwt_decode(data.token)
}

export const axiosLogin = async (email:string, password:string) => {
  const {data} = await axios.post('api/user/login', {email, password})
  localStorage.setItem('token', data.token)
  console.log('login' ,jwt_decode(data.token))
  return jwt_decode(data.token)
}

export const check = async () => {
  const {data} = await axios.get('api/user/auth' )
  localStorage.setItem('token', data.token)
  console.log('check', jwt_decode(data.token))
  return jwt_decode(data.token)
}

/*export async function getTocken () {
  try {
    const result = await axios.post(`auth/login`, {
      email: 'user@mail.ru',
      password: '12345'
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-type": `application/json`,
        withCredentials: true,
        mode: 'no-cors',
      },
    });
    sessionStorage.setItem('auth', JSON.stringify({token: `Bearer ${result.data.token}`}));
    console.log('result', result.data);
    return `${result.data}`;
  } catch (e) {
    console.error(e);
  }
}*/


/*export async function getUsers () {
  const token = JSON.parse(sessionStorage.getItem("auth") || '')?.token;
  try {
    const result = await axios.get(`users`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-type": `application/json`,
        withCredentials: true,
        mode: 'no-cors',
        Authorization: token
      },
    });
    return console.log('result', result.data);
  } catch (e) {
    console.error(e);
  }
}*/

