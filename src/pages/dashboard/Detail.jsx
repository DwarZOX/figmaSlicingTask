import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import mapsIcon from "../../assets/icons/Group86.svg";
import smsIcon from "../../assets/icons/Group85.svg";
import callIcon from "../../assets/icons/Group84.svg";
import arrowIcon from "../../assets/icons/Group87.svg";
import instance from "../../api/api";

function Detail() {
  document.title = "Detail";
  const user = localStorage.getItem("user");
  const name = user.replace(/[0-9]/gi, "");

  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const checkUserToken = () => {
      const userToken = localStorage.getItem("token");
      if (!userToken || userToken === "undefined") {
        return navigate("/");
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
        url: `/show/${id}`,
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
  });

  return (
    <div className="w-full relative h-screen w-[80%]">
      <nav className="fixed top-0 flex justify-between items-center bg-white px-5 h-[65px] w-full shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)] z-10 sm:hidden">
      <Link onClick={() => navigate(-1)}>
                  <img src={arrowIcon} className="w-3" />
                </Link>
          <h1 className="font-bold text-sm capitalize">Hai, {name}</h1>
        </nav>
      <div className="flex flex-col justify-center items-center mt-[70px] sm:mt-10">
        {loading ? (
          data.map((item) => (
            <main key={item.id} className="text-sm">
              <div className="flex justify-center sm:items-center sm:justify-start mb-3">
                <Link className="sm:flex sm:text-[10px] hidden" onClick={() => navigate(-1)}>
                  <img src={arrowIcon} />
                </Link>
                <h2 className="sm:ml-20 md:ml-20 lg:ml-20 text-xl sm:text-2xl font-bold">{item.name}</h2>
              </div>
              <img src={item.photo} className="rounded-lg h-[50vh] sm:h-[70vh] sm:w-[60vw] md:w-[90vw] md:h-[80vh]" />
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
          ))
        ) : (
          <div>
            <h1>LOADING</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
