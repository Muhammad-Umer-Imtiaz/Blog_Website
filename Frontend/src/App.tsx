
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Blog from './Pages/Blog'
import Layout from './Pages/Admin/Layout.tsx'
import Dashboard from './Pages/Admin/Dashboard.tsx'
import AddBlog from './Pages/Admin/AddBlog.tsx'
import ListBlog from './Pages/Admin/ListBlog.tsx'
import Comments from './Pages/Admin/Comments.tsx'
import Login from './Components/admin/Login.tsx'
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext.tsx'
import type React from 'react'

const App : React.FC  = () => {
    const { isLogin } = useAppContext();
  
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/admin' element={ isLogin ? <Layout />:<Login/>}>
          <Route index element={<Dashboard />} />
          <Route path='addBlog' element={<AddBlog />} />
          <Route path='listBlog' element={<ListBlog />} />
          <Route path='comments' element={<Comments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App