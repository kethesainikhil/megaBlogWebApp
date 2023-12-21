
import { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Footer, Header } from './components';
import authService from "./appwrite/auth"
import { login,logout } from './store/authSlice';
import Input from './components/Input';
import Login from './components/Login';
import Signup from './components/Signup';
import { Editor } from '@tinymce/tinymce-react';
import { Outlet } from 'react-router-dom';
function App({children}) {
  const [loading,setLoading] = useState(true);
  const[userEmail,setUserEmail] = useState("");
  const authData = useSelector((state)=>state.auth.userData)
  const dispatch = useDispatch();
  console.log(authData?.email,"email")
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const userData = await authService.getUserAccount();

        if (userData && userData.email) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error('Error fetching user account:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, [dispatch]);

  return !loading ? (
    <div className="App">
      
      <div className="container">
      <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      
    </div>
  ):
  (
    <div>
      <h1>loading...</h1>
    </div>
  )
}

export default App
