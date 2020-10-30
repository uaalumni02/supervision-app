import Localstorage from "./localstorage"

const isLoggedIn = () => {
    const loggedInUser = Localstorage.get('user')

    return loggedInUser ? true : false
}

export default isLoggedIn