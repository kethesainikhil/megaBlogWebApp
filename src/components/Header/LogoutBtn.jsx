import React from 'react'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
const LogoutBtn = () => {
const dispatch  = useDispatch();
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        });

    }
  return (
    <div>
      <button className=' inline-block ' onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default LogoutBtn
