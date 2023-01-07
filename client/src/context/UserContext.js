import createDataContext from "./createDataContext"
import jwt_decode from "jwt-decode"

const userReducer = (state, action) => {
    switch(action.type) {
        case "login":
            return {...state, user:action.payload}
        case "logout":
            return {...state, user: action.payload}
        default:
            return state
    }
}


const login = (dispatch) => {
    return async (userInfo) => {
        try{
            await localStorage.setItem('userInfo', JSON.stringify(userInfo))
            dispatch({
                type: 'login',
                payload: userInfo
            })
        }catch (err) {

        }
    }
}

const localSignin = (dispatch) => {
    return async () => {
        const userInfo = await localStorage.getItem('userInfo')
        if(userInfo) {
            console.log("local signing successful")
            dispatch({
                type: 'login',
                payload: JSON.parse(userInfo)
            })
        }else{
            console.log("local signin failed")
        }
    }
}

const logout = (dispatch) => {
    return async () => {
        await localStorage.clear('userInfo')
        dispatch({
            type: 'logout',
            payload: null
        })
    }
}

export const {Provider, Context} = createDataContext(
    userReducer,
    {
        login,
        localSignin,
        logout
    },
    {
        user: null
    }
)