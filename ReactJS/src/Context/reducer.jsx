import Cookies from "js-cookie";

export const reducer = ( state, action ) => {
    switch (action.type) {
        case "LOGOUT":
            Cookies.set('token', 'undefined')
            return {...state, user: 'undefined'}        

        case "LOGIN_USER":
            return {...state, user: action.user}               

        default:
            return state;
    }
}