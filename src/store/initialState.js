import isLoggedIn from "../utils/isLoggedIn"

const initialState = {
    isLoggedIn: isLoggedIn(),
    userId: null, 
    supervisions: null,
}


export default initialState