import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import arrowIcon from "../../assets/icons/Group87.svg";
import instance from "../../api/api";
import Sidebar from "../../components/Sidebar";

function Ubah() {
  document.title = "Ubah Wisata";

  const navigate = useNavigate();
  const [buttonStatus, setButtonStatus] = useState("Update Data");
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState("");
  const [userName, setUserName] = useState('');

  const handleInputImg = (e) => {
    const file = e.target.files[0];
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg"
    ) {
      if (file.size <= 3000000) {
        setImg(URL.createObjectURL(file));
        setPhoto(file);
      } else {
        alert("Ukuran file harus dibawah 3 MB!");
      }
    } else {
      alert("Format file harus berformat = png/jpeg/jpg !");
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
          setName(response.data.data[0].name);
          setEmail(response.data.data[0].email);
          setTelephone(response.data.data[0].phone);
          setAddress(response.data.data[0].address);
          setCity(response.data.data[0].city);
          setImg(response.data.data[0].photo);
          fetch(response.data.data[0].photo)
            .then((res) => res.blob())
            .then((blob) => {
              const imgname = response.data.data[0].name;
              const newFile = new File([blob], imgname, { type: blob.type });
              setPhoto(newFile);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setButtonStatus("Updating..");

    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phone", telephone);
    data.append("address", address);
    data.append("city", city);
    data.append("photo", photo);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/UP/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/formdata",
      },
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setButtonStatus("Update Data");
        navigate("/dashboard/tabel");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setButtonStatus("Update Data");
        setLoading(false);
      });
  };
  return (
    <>
      {loading ? (
        <>
          <div className="top-0 bg-black bg-opacity-40 w-full h-screen flex flex-col gap-y-10 justify-center items-center fixed z-10">
            <div className="w-[100px] h-[100px] lg:w-[180px] lg:h-[180px] border-[10px] lg:border-[18px] border-t-black rounded-[50%] bg-transparent animate-spin"></div>
          </div>
          <nav className="fixed top-0 flex justify-between items-center bg-white px-5 h-[65px] w-full shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)] sm:hidden">
            <Link to={"/dashboard/tabel"}>
              <img src={arrowIcon} className="w-3" />
            </Link>
              <h1 className="font-[700] text-xl capitalize">Hai, {userName}!</h1>
          </nav>
          <div className="flex flex-col sm:justify-around md:items-center sm:items-center justify-center items-center">
            <form className="w-[90%] sm:w-[75vw] flex flex-col md:flex-row  md:justify-evenly md:gap-x-20 lg:justify-evenly md:items-center md:h-[65vh] gap-y-7 md:mt-20 mt-20 sm:mt-[15px]" onSubmit={handleSubmit}>
              <div className="lg:w-[35%] flex flex-col justify-center gap-y-7 md:gap-y-[40px] lg:gap-y-[50px] mt-[20px]">
                <h1 className="font-[700] text-[40px] md:text-3xl text-[#6889FF]">Ubah Wisata</h1>
                <Input type="text" className="py-[15px]"
                placeholder="Masukkan Nama Wisata" value={name} onChange={(e) => setName(e.target.value)} />
                <Input type="email" className="py-[15px]"
                placeholder="Masukkan Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="number" className="py-[15px]"
                placeholder="Masukkan No.Telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                <Input type="text" className="py-[15px]"
                placeholder="Masukkan Kota" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="flex flex-col justify-around gap-y-8 md:mt-[200px] lg:mt-[200px]">
                <Input type="text"
                placeholder="Masukkan Alamat" className="py-[15px] md:py-[24px]" value={address} onChange={(e) => setAddress(e.target.value)} />

                <label tabIndex={0} htmlFor="tambah" className="flex justify-center items-center cursor-pointer h-[40vh] sm:h-[50vh] md:h-[230px] md:my-1 md:w-[35vw] w-full lg:h-[260px] rounded-xl bg-[#F6F6F6]">
                  <div className="flex flex-col justify-center items-center opacity-100">
                    <img src={img} className="w-[100vw] h-[40vh] sm:h-[50vh] md:w-[35vw] md:h-[230px] lg:h-[260px] rounded-md" />
                    <input id="tambah" type="file" className="hidden" onChange={handleInputImg} />
                    <p className="text-md py-5 md:pt-10 hidden">Tambah Gambar</p>
                  </div>
                </label>
                <div className="flex justify-center mb-5">
                  <Button className="w-full md:w-[27vw] py-[15px] lg:py-3" buttonStatus={buttonStatus} />
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <nav className="fixed top-0 flex justify-between items-center bg-white px-5 h-[65px] w-full shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)] sm:hidden">
            <Link to={"/dashboard/tabel"}>
              <img src={arrowIcon} className="w-3" />
            </Link>
          {!loading ? (
              <h1 className="font-[700] text-xl capitalize">Hai, {userName}!</h1>
            ) : (
              <div className="w-20 h-8 bg-gray-200 rounded-xl animate-pulse"></div>
            )}
          </nav>
        <Sidebar className={'hidden'}/>
          <div className="flex flex-col sm:justify-around md:items-center sm:items-center justify-center items-center">
            <form className="w-[90%] sm:w-[75vw] flex flex-col md:flex-row  md:justify-evenly md:gap-x-20 lg:justify-evenly md:items-center md:h-[65vh] gap-y-7 md:mt-20 mt-20 sm:mt-[15px]" onSubmit={handleSubmit}>
              <div className="lg:w-[35%] flex flex-col justify-center gap-y-7 md:gap-y-[40px] lg:gap-y-[50px] mt-[20px]">
                <h1 className="font-[700] text-[40px] md:text-3xl text-[#6889FF]">Ubah Wisata</h1>
                <Input type="text" className="py-[15px]"
                placeholder="Masukkan Nama Wisata" value={name} onChange={(e) => setName(e.target.value)} />
                <Input type="email" className="py-[15px]"
                placeholder="Masukkan Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="number" className="py-[15px]"
                placeholder="Masukkan No.Telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                <Input type="text" className="py-[15px]"
                placeholder="Masukkan Kota" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="flex flex-col justify-around gap-y-8 md:mt-[200px] lg:mt-[200px]">
                <Input type="text"
                placeholder="Masukkan Alamat" className="py-[15px] md:py-[24px]" value={address} onChange={(e) => setAddress(e.target.value)} />

                <label tabIndex={0} htmlFor="tambah" className="flex justify-center items-center cursor-pointer h-[40vh] sm:h-[50vh] md:h-[230px] md:my-1 md:w-[35vw] w-full lg:h-[260px] rounded-xl bg-[#F6F6F6]">
                  <div className="flex flex-col justify-center items-center opacity-100">
                    <img src={img} className="w-[100vw] h-[40vh] sm:h-[50vh] md:w-[35vw] md:h-[230px] lg:h-[260px] rounded-md" />
                    <input id="tambah" type="file" className="hidden" onChange={handleInputImg} />
                    <p className="text-md py-5 md:pt-10 hidden">Tambah Gambar</p>
                  </div>
                </label>
                <div className="flex justify-center mb-5">
                  <Button className="w-full md:w-[27vw] py-[15px] lg:py-3" buttonStatus={buttonStatus} />
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Ubah;
