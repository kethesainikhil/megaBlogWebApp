import React from 'react'
import Container from '../Container/Container'
import LogoutBtn from './LogoutBtn'
import { Link, useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import Logo from '../Logo'
const Header = () => {
    const authStatus = useSelector((state)=>state.auth.status)
    const navigate = useNavigate();
    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      ]
    
  return (
    <Container>
        <nav className='flex justify-between bg-gray-500 px-10'>
            <div className='py-2 pl-20'>
                <Link to="/">
                    <Logo />
                </Link>
            </div> 
            <div className='flex items-center pr-20'>
                <ul className='flex justify-items-start'>
                    {
                        navItems.map((item,index)=>{
                            if(item.active){
                                return (
                                    <li className='mr-10' key={index}>
                                        <button onClick={()=>navigate(item.slug)}>
                                        {item.name}
                                        </button>
                                        </li>
                                )
                            }
                        })
                    }
                    <li>{authStatus && (<Link to="/logout"><LogoutBtn /></Link>)}</li>
                </ul>
            </div>
        </nav>
    </Container>
  )
}

export default Header
