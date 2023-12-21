import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom'

import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Protected from './components/Protected.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import LoginPage from './pages/Login.jsx'
import SignupPage from './pages/Signup.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element:(
          <Protected authentication={false}>
            <LoginPage />
          </Protected>
        )
      },
      {
        path: '/signup',
        element:(
          <Protected authentication={false}>
            <SignupPage />
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (
            <Protected authentication>
                {" "}
                <AllPost />
            </Protected>
        ),
    },
    {
        path: "/add-post",
        element: (
            <Protected authentication>
                {" "}
                <AddPost />
            </Protected>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <Protected authentication>
                {" "}
                <EditPost />
            </Protected>
        ),
    },
    {
        path: "/logout",
        element: (
            <h1 className='text-center text-3xl p-4'>login / signup to read posts</h1>
        ),
    },
    {
        path: "/post/:slug",
        element: <AllPost />,
    },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
