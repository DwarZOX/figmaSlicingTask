import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiHome5Line } from "react-icons/ri";
import { BsClipboardMinus } from "react-icons/bs";
import { BsPlusSquare } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import instance from '../api/api';

function Sidebar({setShowName,setIsShow,className}) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const checkUserName = () => {
      const user = localStorage.getItem("user");
      if(!user || user === ''){
        return navigate('/')
      }else{
        return setUserName(user.replace(/[0-9]/gi, ""));
      }}
      checkUserName()
    },[])

  const handleLogout = () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/logout',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')} `
      }
    };
    
    instance.request(config)
    .then((response) => {
      alert(`Anda berhasil ${JSON.stringify(response.data.status)}`);
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/')
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const [logout, setLoggout] = useState(false);
  const active = ({ isActive }) =>
    isActive ? "text-[#0038FF] text-[2.7em]" : "text-black text-[2.7em]";
  return (
    <>
    <div className='h-full'>
        <aside className={`left-0 fixed bg-[#F6F6F6] w-[60%] h-full px-2 py-10 flex flex-col justify-between shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)] sm:shadow-[3px__3px_3px_0px_rgba(0,0,0,0.35)] z-30 pl-6 sm:h-[60vh] md:h-[60vh] sm:translate-y-[30%] md:translate-y-[20%] lg:translate-y-[5%] lg:h-[75vh] sm:w-[8vw] md:w-[8vw] lg:w-[5vw] ${className} sm:flex sm:top-20 sm:py-10 sm:rounded-r-xl sm:items-center sm:px-0`}>
          <div className="flex flex-col justify-center sm:items-center gap-10 sm:gap-5">
          <h1 className='font-[700] text-2xl my-3 capitalize sm:hidden'>Hai, {userName}!</h1>
            <NavLink className={active} to={`/dashboard/home`}>
              <span className='flex gap-x-4'>
              <i className='text-[33px] sm:text-[1.2em] lg:text-[1em] hover:text-white hover:bg-[lightgray] hover:rounded-lg sm:p-2'>
                <RiHome5Line />
              </i>
              <p className='text-[20px] sm:hidden'>Beranda</p></span>
            </NavLink>

            <NavLink className={active} to={`/dashboard/tabel`}>
              <span className='flex gap-x-4'>
              <i className='text-[29px] sm:text-[1em] lg:text-[.9em] hover:text-white hover:bg-[lightgray] hover:rounded-lg pl-[2px] sm:p-2'>
                <BsClipboardMinus />
              </i>
              <p className='text-[20px] ml-1 sm:hidden'>Tabel</p></span>
            </NavLink>

            <NavLink className={active} to={`/dashboard/tambahwisata`}>
              <span className='flex gap-x-4'>
              <i className='text-[27px] sm:text-[1em] lg:text-[.8em] hover:text-white hover:bg-[lightgray] hover:rounded-lg pl-[2px] sm:p-2'>
                <BsPlusSquare />
              </i>
              <p className='text-[20px] ml-1 sm:hidden'>Tambah</p></span>
            </NavLink>
          </div>
        
          <span className='flex gap-x-4'
            onClick={() => {
              setLoggout(true)
              setShowName(true)
              setIsShow(false)
              }}>
              <i className='text-[31px] sm:text-[2.7em] lg:text-[2.3em] hover:text-white hover:bg-[lightgray] hover:rounded-lg sm:p-2'>
            <FiLogOut />
              </i>
              <p className='text-[20px] sm:hidden'>Keluar</p></span>
        </aside>
        <div className={`w-full h-screen bg-black opacity-20 sm:hidden fixed z-20 ${className}`} onClick={()=>{
          setShowName(true)
          setIsShow(false)}}></div>
        </div>
      {logout ? (
        <div className="top-0 bg-black bg-opacity-50 w-full h-screen flex justify-center items-center fixed z-50">
          <div className="w-[80%] sm:w-[70%] h-[40vw] sm:h-[30vh] lg:h-[350px] lg:w-[55%] bg-white flex flex-col items-center justify-end pt-[17px] rounded-lg md:rounded-xl relative py-5 gap-y-[9vw]">
            <span className="absolute top-[-8px] sm:top-[-11px] lg:top-[-10px] right-[3px] text-3xl sm:text-4xl text-[#515151] hover:text-[lightgray]">
              <Link onClick={() => setLoggout(false)}>&times;</Link>
            </span>
            <h2 className="text-[#6889FF] font-bold text-[5vw] md:text-4xl">
              Anda yakin Ingin Logout?
            </h2>
            <div className="flex justify-between gap-5">
                <button className="bg-[#F6F6F6] text-[3vw] sm:text-[1.3em] rounded-md px-[4vw] py-[2vw] lg:text-xl lg:rounded-[12px] md:py-[17px] md:px-[34px] hover:bg-[lightgray]" onClick={() => setLoggout(false)}>
                  Batal
                </button>
                <button className="bg-[#6889FF] text-[3vw] sm:text-[1.3em] rounded-md px-[4vw] py-[2vw] lg:text-xl lg:rounded-[12px] md:py-[17px] md:px-[34px] text-white hover:bg-[#3D62E5]" onClick={handleLogout}>
                  Logout
                </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Sidebar