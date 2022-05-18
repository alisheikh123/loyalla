import React, { createContext, useEffect, useReducer } from 'react'
import axiosInstance from '../axios.js'
import { sessions } from '.././Endpoint/Sessions'
import history from '.././history.js';
import jwtDecode from 'jwt-decode'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'digitallandscape123456'
const JWT_VALIDITY = '7days'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,

}
const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }
    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    console.log(decodedToken)
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('MeetToken', accessToken)
        // axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('MeetToken')
        // delete axiosInstance.defaults.headers.common.Authorization
    }
}
const reducer = (state, action) => {

    switch (action.type) {

        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login1: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const login1 = async (userID, password) => {


        const response = await axiosInstance.post(sessions.Login, {
            userID,
            password,
        })

        if (response.data.isSuccess) {

            const accessToken = jwt.sign({ userId: response.data.data.encrypUserId }, JWT_SECRET, {
                expiresIn: JWT_VALIDITY,
            })

            setSession(accessToken)

            const user = {
                id: response.data.data.userId,
                avatar: null,
                fname: response.data.data.firstName,
                lname: response.data.data.lastName,
                role: response.data.data.roleName,
                enc_uid: response.data.data.encrypUserId,
                enc_lid: response.data.data.encrypLoginId,
            }
            const userList = {
                id: response.data.data.userId,
                avatar: null,
                fname: response.data.data.firstName,
                lname: response.data.data.lastName,
                role: response.data.data.roleName,
                enc_uid: response.data.data.encrypUserId,
                enc_lid: response.data.data.encrypLoginId,
            }

            localStorage.setItem('usersMeetup', JSON.stringify(userList));

            dispatch({
                type: 'LOGIN',
                payload: {
                    user,
                },
            })

            return true;
        }

        else {

            return false;

        }
    }

    const register = async (email, username, password) => {
        const response = await axiosInstance.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        // setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }



    const logout = () => {
        history.push('/signin')
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ; (async () => {

            try {
                const accessToken = window.localStorage.getItem('MeetToken')
                
                if (accessToken) {

                    var usersList = [JSON.parse(localStorage.getItem("usersMeetup"))];
                    const { userId } = jwt.verify(accessToken, JWT_SECRET);
                    const user = usersList.find((u) => u.enc_uid === userId)

                    if (user) {
                        // history.push('/dashboard')
                        dispatch({
                            type: 'INIT',
                            payload: {
                                isAuthenticated: true,
                                user,
                            },
                        })
                    }
                    else {
                        // history.push('/signin')
                        dispatch({
                            type: 'INIT',
                            payload: {
                                isAuthenticated: false,
                                user: null,

                            },
                        })
                    }
                }
                else {

                    // history.push('/signin')

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,

                        },
                    })
                }
            }
            catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {

        return null
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login1,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
