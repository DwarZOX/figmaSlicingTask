import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import instance from "../../api/api";
import Card from "../../components/Card";
import LoadingCard from "../../components/LoadingCard";
import Search from "../../components/Search";
import Sidebar from "../../components/Sidebar";
import { GrList } from "react-icons/gr";

function Dashboard() {
  document.title = "Home";
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [showName, setShowName] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [resultSearch, setResultSearch] = useState("");

  const getGreeting = () => {
    const thisDate = new Date();
    const currHrs = thisDate.getHours();
    if (currHrs >= 1 && currHrs < 11) {
      return "Selamat Pagi";
    } else if (currHrs >= 11 && currHrs < 15) {
      return "Selamat Siang";
    } else if (currHrs >= 15 && currHrs < 19) {
      return "Selamat Sore";
    } else {
      return "Selamat Malam";
    }
  };

  useEffect(() => {
    const checkUserToken = () => {
      const userToken = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (!userToken || (userToken === "undefined" && !user) || user === "") {
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
  }, [setIsShow]);

  useEffect(() => {
    const dataResult = data.filter((item) => {
      return item.name.toLowerCase().includes(resultSearch.toLowerCase());
    });
    console.log(dataResult);
    setSearchResult(dataResult);
  }, [data, resultSearch]);

  const renderCards = () => {
    if (searchResult.length > 0) {
      return searchResult.map((item) => (
        <NavLink to={`/dashboard/detail/${item.id}`}>
          <Card item={item} key={item.id} />
        </NavLink>
      ));
    } else {
      return (
        <div className="h-screen flex justify-center items-center">
          <p className="font-bold text-md md:text-xl">
            Data Wisata Yang Dimasukkan Tidak Ada.
          </p>
        </div>
      );
    }
  };
  const showSideBar = () => (isShow ? "" : "hidden");
  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center">
        <nav className="fixed top-0 flex justify-between items-center bg-white px-5 h-[65px] w-full shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)] duration-700 transition delay-300 ease-in-out z-10 sm:hidden">
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
        <Sidebar
          setShowName={setShowName}
          setIsShow={setIsShow}
          className={`${showSideBar()}`}
        />

        <div
          id="wrap-card"
          className="mx-3 my-10 flex flex-wrap justify-center gap-y-10 gap-x-10"
        >
          <div className="flex sm:justify-evenly md:justify-between sm:w-[80%] items-center">
            <div className="md:flex sm:hidden hidden">
              {!loading ? (
                <h1 className="text-md font-bold capitalize">
                  Hai {userName} , {getGreeting()}.
                </h1>
              ) : (
                <div className="w-60 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
              )}
            </div>
            <Search onSearch={setResultSearch} />
          </div>
          {loading ? <LoadingCard /> : renderCards()}
        </div>
        <footer className="w-full bg-[#6889FF] h-20 flex justify-center items-center flex-col text-white text-sm">
          <p>Footer Component</p>
          <p>Copyright 2023 All right reserved</p>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
