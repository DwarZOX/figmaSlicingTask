import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import instance from "../../api/api";
import { BsInfoCircle } from 'react-icons/bs'
import { TfiPencil } from 'react-icons/tfi';
import { HiOutlineTrash } from 'react-icons/hi'
import { TbAlignJustified } from "react-icons/tb";

function Tabel() {
  document.title = "Tabel";
  const navigate = useNavigate();
  const [userName, setUserName] = useState('')

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [showName, setShowName] = useState(true)
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const checkUserToken = () => {
      const userToken = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (!userToken || userToken === "undefined" && !user || user === '') {
        return navigate("/");
      } else {
        return setUserName(user.replace(/[0-9]/gi, ""));
      }
    };
    checkUserToken();
  }, []);

  useEffect(() => {
    setLoading(true);
    const getData = () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "/index",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      instance
        .request(config)
        .then((response) => {
          setData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    getData();
  }, [isDelete]);

  const handleDelete = (id) => {
    setIsDelete(true);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/delete/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setIsDelete(false);
      })
      .catch((error) => {
        console.log(error);
        setIsDelete(false);
      });
  };
  const showSideBar = () => (isShow ? "" : "hidden");

  return (
    <div>
      {isDelete && (
        <div className="top-0 bg-black bg-opacity-40 w-full h-screen flex flex-col gap-y-10 justify-center items-center fixed z-10">
        <div className="w-[100px] h-[100px] lg:w-[180px] lg:h-[180px] border-[10px] lg:border-[18px] border-t-black rounded-[50%] bg-transparent animate-spin"></div>
      </div>
      )}
        <Sidebar
          setShowName={setShowName}
          setIsShow={setIsShow}
          className={`${showSideBar()}`}
        />
      <>
        <nav className="fixed top-0 flex justify-between items-center bg-white px-5 h-[65px] w-full shadow-[3px__3px_3px_0px_rgba(0,0,0,0.35)] z-10 sm:hidden">
          <Link
            onClick={() => {
              setShowName(false);
              setIsShow(true);
            }}
          >
            <i className="text-4xl">
              <TbAlignJustified />
            </i>
          </Link>
          {showName ? (
            !loading ? (
              <h1 className="font-[700] text-xl capitalize">Hai, {userName}!</h1>
            ) : (
              <div className="w-20 h-8 bg-gray-200 rounded-xl animate-pulse"></div>
            )
          ) : null}
        </nav>
        <article className="w-full flex-col md:pl-24 md:pr-24  overflow-x-auto flex lg:justify-center">
          <h1 className="text-[40px] font-bold lg:mb-5 mb-5 pl-5 sm:pl-20 md:p-0 lg:mt-14 mt-[100px] md:mt-14  text-[#6889FF]">
            Tabel Wisata
          </h1>
          <table className="rounded-[20px] overflow-hidden shadow-lg ml-5 mr-5 sm:mx-20 md:mx-1 lg:mx-0 mb-20 border-box">
            <thead className="text-[#212529] text-[16px] font-[500] border-[1px] border-[#E7EAF0] bg-[#E7EAF0]">
              <tr>
                <th className="py-6">No</th>
                <th className="py-6">Nama</th>
                <th className="py-6">Alamat</th>
                <th className="py-6">No. Telephone</th>
                <th className="py-6">Email</th>
                <th className="py-6">Aksi</th>
              </tr>
            </thead>
            <tbody className="border text-[#465170] text-[14px] divide-y">
              {loading ? (
                <>
                  <tr>
                    <td className="px-5 py-1">
                      <div className="w-20 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-1">
                      <div className="w-20 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-1">
                      <div className="w-20 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="px-5 py-1">
                      <div className="w-40 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                  </tr>
                </>
              ) : (
                data?.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="px-5 py-1 sm:py-5 md:py-6">{idx + 1}</td>
                    <td className="px-10 py-1 capitalize">{item.name}</td>
                    <td className="px-10 py-1 capitalize">
                      {item.address}, {item.city}
                    </td>
                    <td className="px-5 py-1">{item.phone}</td>
                    <td className="px-10 py-1">{item.email}</td>
                    <td className="text-md my-2 sm:mt-4 md:mt-5 lg:mt-3 md:text-lg lg:text-xl gap-x-5 lg:gap-x-3 lg:p-1 px-5 lg:px-6 flex justify-center ">
                      <NavLink to={`/dashboard/detail/${item.id}`} className='border-2 rounded p-2 '>
                        <BsInfoCircle className="hover:text-white hover:bg-[lightgray] hover:rounded"/>
                      </NavLink>
                      <NavLink to={`/dashboard/ubah/${item.id}`} className='border-2 rounded p-2 '>
                        <TfiPencil className="hover:text-white hover:bg-[lightgray] hover:rounded" />
                      </NavLink>
                      <NavLink
                        onClick={() => {
                          const chose = confirm("Mau Hapus data ?");
                          if (chose) {
                            handleDelete(item.id);
                          }
                        }} className='border-2 rounded p-2 '
                      >
                        <HiOutlineTrash className="hover:text-white hover:bg-[lightgray] hover:rounded" />
                      </NavLink>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </article>
      </>
    </div>
  );
}

export default Tabel;