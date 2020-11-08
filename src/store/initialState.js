import isLoggedIn from "../utils/isLoggedIn"

const initialState = {
    isLoggedIn: isLoggedIn(),
    userId: null, 
    user: null, 
    supervisions: null,
}


export default initialState