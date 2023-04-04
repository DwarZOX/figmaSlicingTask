import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import instance from "../../api/api";
import { GrList } from "react-icons/gr";
import { BsInfoSquare } from 'react-icons/bs'
import { TfiPencil } from 'react-icons/tfi';
import { HiOutlineTrash } from 'react-icons/hi'

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
    <div className="overflow-x-auto">
      {isDelete && (
        <div className="top-0 bg-black bg-opacity-40 w-full h-screen flex flex-col gap-y-10 justify-center items-center fixed z-10">
          <div className="w-[330px] h-[330px] border-[40px] border-t-black rounded-[50%] bg-transparent animate-spin"></div>
          <p className="text-[50px] font-bold italic">Wait, Load Data..</p>
        </div>
      )}
        <Sidebar
          setShowName={setShowName}
          setIsShow={setIsShow}
          className={`${showSideBar()}`}
        />
      <>
        <nav className="fixed top-0 flex justify-between items-center bg-white px-5 h-[65px] w-full shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)] z-10 sm:hidden">
          <Link
            onClick={() => {
              setShowName(false);
              setIsShow(true);
            }}
          >
            <i className="text-4xl">
              <GrList />
            </i>
          </Link>
          {showName ? (
            !loading ? (
              <h1 className="font-bold text-lg capitalize">Hai, {userName}</h1>
            ) : (
              <div className="w-20 h-8 bg-gray-200 rounded-xl animate-pulse"></div>
            )
          ) : null}
        </nav>
        <article className="w-full rounded-xl sm:items-center sm:flex flex-col mt-20 sm:mt-[-20px] md:mt-0 mx-[1.2em] sm:mx-[35vw] md:mx-[20vw] lg:mx-[1em] mb-10 sm:mb-20">
          <h1 className="sm:self-start sm:ml-[-100px]git log lg:ml-[120px] font-bold text-2xl text-[#6889FF] my-10">
            Tabel Wisata
          </h1>
          <table className="overflow-hidden rounded-xl">
            <thead className=" bg-[#E7EAF0] ">
              <tr>
                <th className="py-4">No</th>
                <th className="">Nama</th>
                <th>Alamat</th>
                <th>No. Telephone</th>
                <th>Email</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="border text-[#465170] text-sm divide-y">
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
                    <td className="text-2xl mt-3 sm:mt-4 md:mt-5 lg:mt-4 md:text-3xl gap-x-5 lg:gap-x-3 lg:p-1 px-5 lg:px-6 flex justify-center ">
                      <NavLink to={`/dashboard/detail/${item.id}`}>
                        <BsInfoSquare className="hover:text-white hover:bg-[lightgray] hover:rounded"/>
                      </NavLink>
                      <NavLink to={`/dashboard/ubah/${item.id}`}>
                        <TfiPencil className="hover:text-white hover:bg-[lightgray] hover:rounded" />
                      </NavLink>
                      <NavLink
                        onClick={() => {
                          const chose = confirm("Mau Hapus data ?");
                          if (chose) {
                            handleDelete(item.id);
                          }
                        }}
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
