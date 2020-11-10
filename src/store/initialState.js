import isLoggedIn, { getUserId } from "../utils/isLoggedIn"


const initialState = {
    isLoggedIn: isLoggedIn(),
    userId: getUserId(), 
    user: null, 
    supervisions: null,
}


export default initialState