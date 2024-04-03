import { LOGIN, GLOGIN, LOGOUT } from './Actions'
const initialState = {
    username: "",
    email: "",
    issuccess: false,
}
function loginreducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, username: action.payload.username, email: action.payload.email, issuccess: true }
        case GLOGIN:
            return { ...state, username: action.payload.displayName, email: action.payload.email, issuccess: true }
        case LOGOUT:
            return { ...state, username: "", issuccess: false }
        default:
            return state
    }
}
export default loginreducer