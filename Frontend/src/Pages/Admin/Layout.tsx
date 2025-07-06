import { Outlet } from 'react-router-dom';
import Logo1 from '../../assets/logo_main.png';
import Sidebar from '../../Components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
const Layout = () => {
    const { axios , setIsLogin, navigate} = useAppContext();

    const Logout =async () => {
        try {
            const {data} = await axios.get("/api/admin/logout")
            if(data.success){
                toast.success(data.message)
                setIsLogin(false)
                navigate("/")
            }
            else toast.error(data.message)
        } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
    }
    return (
        <>
            <div className='flex justify-between items-center py-5 px-8 sm:px-20 border-b border-gray-200 xl:mx-32'>
                <img src={Logo1} className='w-32 sm:w-40 cursor-pointer' alt='logo' onClick={() => navigate("/")} />
                <button className='text-sm px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full cursor-pointer' onClick={Logout}>Logout</button>
            </div>
            <div className='flex h-[calc(100vh-70px)]'>
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}

export default Layout