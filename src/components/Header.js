import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../app/services/auth/authServices'
import { logout, setCredentials } from '../features/auth/authSlice'
// import {getUserDetails} from '../features/auth/authActions'
import '../styles/header.css'
import { useEffect } from 'react'

const Header = () => {
  const { userInfo,userToken } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
  // perform a refetch every 15mins
    pollingInterval: 900000,
  })
  useEffect(() => {
    if (data) dispatch(setCredentials(data))
    console.log(data) // user object
  }, [data, dispatch])

  
  // useEffect(()=>{
  //   if(userToken){
  //     dispatch(getUserDetails)
  //   }
  // },[userToken,dispatch])

  return (
    <header>
      <div className='header-status'>
        <span>
          {isFetching
            ? `Fetching your profile...`
            : userInfo !== null
            ? `Logged in as ${userInfo.email}`
            : "You're not logged in"}
        </span>
        <div className='cta'>
          {userInfo ? (
            <button className='button' onClick={() => dispatch(logout())}>
              Logout
            </button>
          ) : (
            <NavLink className='button' to='/login'>
              Login
            </NavLink>
          )}
        </div>
      </div>
      <nav className='container navigation'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
        <NavLink to='/user-profile'>Profile</NavLink>
      </nav>
    </header>
  )
}
export default Header;