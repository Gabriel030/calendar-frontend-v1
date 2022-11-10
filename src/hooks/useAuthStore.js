import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import axios from "axios"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"
import { onLogoutCalendar } from "../store/calendar/calendarSlice"

export const useAuthStore = () => {
    const {status, user, errorMessage} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    //---------------------------------------------------------//


    const startLogin = async ({email, password}) => {
        //console.log(email, password)	
        //cuando comienzo el proceso de login, seteo el estado en cheking
        dispatch(onChecking());
        try {
            
            const {data} = await calendarApi.post("/auth", {email, password})
            //console.log(data)
            //cuando recibo la data, voy a setear en el localStorage el token
            localStorage.setItem("token", data.token)
            //con esto seteo la hora en que se cargo el token
            localStorage.setItem("token-init-date", new Date().getTime())
            dispatch(onLogin({name:data.name, uid : data.uid}))
            //console.log(data.uid)
            localStorage.setItem("user", JSON.stringify({name:data.name, uid : data.uid}) )
        } catch (error) {
            console.log(error)
            dispatch(onLogout("Credenciales incorrectas"))

            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
            
        }
    }

    // -------------------------------------------------------// 

    const startRegister = async ({email, password, name}) => { 
        dispatch(onChecking());

        try {
            
            const {data} = await calendarApi.post("/auth/new", {email, password, name})
            console.log(data)
            //cuando recibo la data, voy a setear en el localStorage el token
            localStorage.setItem("token", data.token)
            //con esto seteo la hora en que se cargo el token
            localStorage.setItem("token-init-date", new Date().getTime())
            dispatch(onLogin({name:data.name, uid : data.uid}))

        } catch (error) {
            console.log(error)

            dispatch(onLogout(error.response.data?.msg || "--"))

            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    // ----------------------------------------------------//
    
    const checkAuthToken = async () => {

        const token = localStorage.getItem("token")
        if(!token) return dispatch(onLogout())        
        

        try {

           
            const {data} = await calendarApi.get("auth/renew")
            console.log("LA DATA!! - >", data)
            localStorage.setItem("token", data.token)
            //con esto seteo la hora en que se cargo el token
            localStorage.setItem("token-init-date", new Date().getTime())
            dispatch(onLogin({name:data.name, uid : data.uid}))
        } catch (error) {
            console.log(error)
            localStorage.clear(); 
            dispatch(onLogout())
        }
    }

    //----------------------------------------------------------------//

    const startLogout = () => {
        localStorage.clear() 
        dispatch(onLogoutCalendar())
        dispatch(onLogout()) 

    }



    return {
        //Propiedades 
        status, 
        user, 
        errorMessage, 

        //metodos
        startLogin, 
        startRegister,
        checkAuthToken,
        startLogout
    }
}