import { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import Cookies from "js-cookie"
import jwt_decode from "jwt-decode"

export const GlobalContext = createContext("initial Value")

let data = {
    user : Cookies.get('token'),
};

export default function GlobalContextProvider({ children }){
    const [state, dispatch] =  useReducer(reducer, data);

    useEffect( () => {
        Cookies.set('token', state.user)
    },[state.user])

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            { children }
        </GlobalContext.Provider>
    )
}