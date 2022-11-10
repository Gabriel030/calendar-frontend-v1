import axios from "axios"
import {getEnvVariables} from "../helpers"



const {VITE_API_URL} = getEnvVariables()
const calendarApi = axios.create({
    baseURL: VITE_API_URL,
})

//Todo: confirgurar interceptores 

//axios me permite usar interceptores, permiten interceptar peticiones hacia o desd el backend
//en este caso a la hora de hacerse una request vamos a usar dicho interceptor 
//por que en la request? por q es la peticion q hace el front hacia el backend
//en ese momento yo quiero setearle en el header de la request, el token del user 

calendarApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers, 
        "x-token": localStorage.getItem("token")
    }

    return config; 
})
export default calendarApi ; 