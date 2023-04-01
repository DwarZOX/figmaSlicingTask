import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsClipboardMinus } from "react-icons/bs";
import { TbPlaylistAdd } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";

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
  const [logout, setLoggout] = useState(false);
  const active = ({ isActive }) =>
    isActive ? "text-[#0038FF] text-[2.5em]" : "text-black text-[2.5em]";
  return (
    <>
    <div className='w-full'>
        <nav className={`left-0 top-0 fixed bg-[#F6F6F6] w-[70%] h-full px-2 py-10 flex flex-col justify-between shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)] z-30 pl-6 z-20 sm:h-[70vh] md:h-[70vh] md:top-20 lg:top-20 lg:h-[75vh] sm:w-[4em] ${className} sm:flex sm:top-20 sm:py-10 sm:rounded sm:items-center sm:px-0`}>
          <div className="flex flex-col justify-center gap-10">
          <h1 className='font-bold text-2xl capitalize sm:hidden'>Hai, {userName}</h1>
            <NavLink className={active} to={`/dashboard/home`}>
              <span className='flex gap-x-2'>
              <i className='text-[.8em] sm:text-[.7em]'>
                <AiOutlineHome />
              </i>
              <p className='text-[.5em] sm:hidden'>Beranda</p></span>
            </NavLink>

            <NavLink className={active} to={`/dashboard/tabel`}>
              <span className='flex gap-x-2'>
              <i className='text-[.7em] sm:text-[.6em]'>
                <BsClipboardMinus />
              </i>
              <p className='text-[.5em] ml-1 sm:hidden'>Tabel</p></span>
            </NavLink>

            <NavLink className={active} to={`/dashboard/tambahwisata`}>
              <span className='flex gap-x-2'>
              <i className='text-[.7em]'>
                <TbPlaylistAdd />
              </i>
              <p className='text-[.5em] ml-1 sm:hidden'>Tambah</p></span>
            </NavLink>
          </div>
        
          <NavLink
            onClick={() => {
              setLoggout(true)
              setShowName(true)
              setIsShow(false)
              }}>
          <span className='flex gap-x-2'>
              <i className='text-[1.7em] sm:text-[1.4em]'>
            <FiLogOut />
              </i>
              <p className='text-[1.1em] sm:hidden'>Logout</p></span>
          </NavLink>
        </nav>
        <div className={`w-full h-screen bg-black opacity-30 sm:hidden fixed z-20 ${className}`} onClick={()=>{
          setShowName(true)
          setIsShow(false)}}></div>
        </div>
      {logout ? (
        <div className="top-0 bg-black bg-opacity-50 w-full h-screen flex justify-center items-center fixed z-50">
          <div className="w-60 sm:w-80 bg-white flex flex-col items-center justify-around rounded-xl relative py-5 sm:py-7 lg:py-10 lg:w-[36%] sm:gap-y-8 lg:gap-y-20 gap-y-5">
            <span className="absolute top-[-8px] sm:top-[-7px] lg:top-[-10px] right-[1px] text-2xl lg:text-5xl text-[#515151]">
              <Link onClick={() => setLoggout(false)}>&times;</Link>
            </span>
            <h2 className="text-[#6889FF] font-bold text-md sm:text-xl lg:text-2xl">
              Anda yakin Ingin Logout?
            </h2>
            <div className="flex justify-between gap-10">
              <Link onClick={() => setLoggout(false)}>
                <button className="bg-[#F6F6F6] text-[.8em] sm:text-[1em] rounded-md p-2 sm:px-4 sm:py-3 lg:text-xl lg:rounded-[12px] lg:py-[19px] lg:px-[24px]">
                  Batal
                </button>
              </Link>
              <Link
                to={"/"}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                }}
              >
                <button className="bg-[#6889FF] text-[.8em] sm:text-[1em] rounded-md p-2 sm:px-4 sm:py-3 lg:text-xl lg:rounded-[12px] lg:py-[19px] lg:px-[24px] text-white">
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Sidebar