import { useContext } from 'react'
import AuthContext from './JwtAuthentication'

const useAuth = () => useContext(AuthContext)

export default useAuth
