import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Layout from './Layout'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'     
import Profile from './Profile'
import "react-toastify"
import { ToastContainer } from 'react-toastify'
import {HeroUIProvider} from "@heroui/react";
import AuthContextprovider from './Context/AuthContext'
import ProtectedUrl from './ProtectedUrl'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostDetails from './PostDetails'
import Feed from './Feed'
import Setting from './Setting'
import Notifictions from './Notifictions'


 
function App() {
 const routes =createBrowserRouter([
  {path:"/", element : <Layout></Layout>,children:[
    {index : true , element:<ProtectedUrl><Feed></Feed></ProtectedUrl> },
    {path: "/postdetails/:id" , element: <ProtectedUrl><PostDetails></PostDetails></ProtectedUrl>},
    {path: "profile" , element: <ProtectedUrl><Profile></Profile></ProtectedUrl>},
    {path: "setting" , element: <ProtectedUrl><Setting></Setting></ProtectedUrl>},
    {path: "notifictions" , element: <ProtectedUrl><Notifictions></Notifictions></ProtectedUrl>},
    {path: "login" , element:<Login></Login>},
    {path: "register" , element: <Register></Register>},
    {path: "*" , element: <NotFound></NotFound>},
  ]}
 ])
 const queryClient = new QueryClient({defaultOptions:{
  queries:{
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval:0,
  }
 }})
  
  return (
  <QueryClientProvider client={queryClient} >
    <AuthContextprovider >
    <HeroUIProvider>
    <RouterProvider router={routes}></RouterProvider>
    </HeroUIProvider>
    <ToastContainer></ToastContainer>
    </AuthContextprovider>
  </QueryClientProvider>
  )
}

export default App
