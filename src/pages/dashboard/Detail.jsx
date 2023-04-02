import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import mapsIcon from "../../assets/icons/Group86.svg";
import smsIcon from "../../assets/icons/Group85.svg";
import callIcon from "../../assets/icons/Group84.svg";
import arrowIcon from "../../assets/icons/Group87.svg";
import instance from "../../api/api";

function Detail() {
  document.title = "Detail";

  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('')

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
    // setLoading(true);
    const getData = () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `/show/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      instance
        .request(config)
        .then((response) => {
          setData(response.data.data);
          // setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // setLoading(false);
        });
    };
    getData();
  }, [data]);

  return (
    <div className="w-full relative h-full">
      <nav className="fixed top-0 flex justify-between items-center bg-white px-5 h-[65px] w-full shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)] z-10 sm:hidden">
      <Link onClick={() => navigate(-1)}>
                  <img src={arrowIcon} className="w-3" />
                </Link>
          <h1 className="font-bold text-sm capitalize">Hai, {userName}</h1>
        </nav>
      <div className="flex flex-col justify-center items-center mt-[70px] mx-2 sm:mx-4 sm:mt-10">
        {!loading ? (
          <div className="top-0 bg-black bg-opacity-40 w-full h-screen flex flex-col gap-y-10 justify-center items-center fixed z-10">
            <div className="w-[100px] h-[100px] lg:w-[330px] lg:h-[330px] border-[10px] lg:border-[40px] border-t-black rounded-[50%] bg-transparent animate-spin"></div>
          </div>
        ) : 
          data?.map((item) => (
            <main key={item.id} className="text-sm">
              <div className="flex justify-center sm:items-center sm:justify-start mb-3">
                <Link className="sm:flex sm:text-[10px] hidden" onClick={() => navigate(-1)}>
                  <img src={arrowIcon} />
                </Link>
                <h2 className="sm:ml-20 md:ml-20 lg:ml-20 text-xl sm:text-2xl font-bold">{item.name}</h2>
              </div>
              <img src={item.photo} className="rounded-lg h-[50%] w-[150vw] sm:h-[50%] sm:w-[100vw] md:w-[70vw] md:h-[50%]" />
              <span className="flex items-center text-md pt-3">
                <img
                  className="flex w-8 h-7 justify-center bg-[#6889FF] rounded-md items-center mx-2"
                  src={mapsIcon}
                />
                <p>
                  {item.address}, {item.city}
                </p>
              </span>
              <span className="flex items-center py-3">
                <img
                  className="flex w-8 h-7 justify-center bg-[#6889FF] rounded-md items-center mx-2"
                  src={smsIcon}
                />
                <p>{item.email}</p>
              </span>
              <span className="flex items-center">
                <img
                  className="flex w-8 h-7 justify-center bg-[#6889FF] rounded-md items-center mx-2"
                  src={callIcon}
                />
                <p>{item.phone}</p>
              </span>
            </main>
          )
        )}
      </div>
    </div>
  );
}

export default Detail;
