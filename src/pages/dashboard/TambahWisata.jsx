import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Sidebar from "../../components/Sidebar";
import uploadIcon from "../../assets/icons/gallery-export.svg";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../api/api";
import { GrList } from "react-icons/gr";

function TambahWisata() {
  document.title = "Tambah Wisata";

  const navigate = useNavigate();
  const [buttonStatus, setButtonStatus] = useState("Create");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showName, setShowName] = useState(true)
  const [isShow, setIsShow] = useState(false);
  const [userName, setUserName] = useState('')

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
      if (!userToken || userToken === "undefined" && !user || user === '') {
        return navigate("/");
      } else {
        return setUserName(user.replace(/[0-9]/gi, ""));
      }
    };
    checkUserToken();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setButtonStatus("Creating..");
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
      url: "/create",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        setButtonStatus("Create");
        navigate("/dashboard/tabel");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setButtonStatus("Create");
      });
  };
  const showSideBar = () => (isShow ? "" : "hidden");

  return (
    <>
      {loading ? (
        <>
          <div className="top-0 bg-black bg-opacity-40 w-full h-screen flex flex-col gap-y-10 justify-center items-center fixed z-10">
            <div className="w-[100px] h-[100px] lg:w-[330px] lg:h-[330px] border-[10px] lg:border-[40px] border-t-black rounded-[50%] bg-transparent animate-spin"></div>
            <p className="lg:text-[50px] font-bolt italic">
              Wait, Create Your Data..
            </p>
          </div>
          
          <div
            className="flex flex-col sm:justify-around md:items-center justify-center items-center sm:items-center"
          >
            <form className="w-[90%] sm:w-[70%] md:w-full flex flex-col md:flex-row md:justify-around lg:justify-evenly md:items-center md:h-[85vh] gap-y-7 md:mt-10 mt-20 sm:mt-[15px]"
            onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center gap-y-7">
              <h1 className="font-bold text-xl md:text-3xl text-[#6889FF] lg:text-2xl">
                Tambah Wisata
              </h1>
              <Input
                type="text"
                placeholder="Masukkan Nama Wisata"
                className="lg:py-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-none"
              />
              <Input
                type="number"
                placeholder="Masukkan No.Telephone"
                className="border-none"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Masukkan Kota"
                className="border-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              /></div>
            <div className="flex flex-col justify-around gap-y-5 md:mt-[150px]">
              <Input
                type="text"
                placeholder="Masukkan Alamat"
                className="py-[15px] md:py-[20px]"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <label tabIndex={0}
                htmlFor="tambah"
                className="flex justify-center items-center cursor-pointer h-[287px] sm:h-[180px] sm:w-full md:h-[180px] md:w-full w-full rounded-xl bg-[#F6F6F6]"
              >
                <div className="flex flex-col justify-center items-center opacity-100">
                  {img ? (
                    <>
                      <img src={img} className="w-[470px] h-[287px] sm:w-[600px] sm:h-[200px] md:w-[310px] md:h-[180px] rounded-md" />
                      <input
                        id="tambah"
                        type="file"
                        className="hidden"
                        onChange={handleInputImg}
                      />
                    </>
                  ) : (
                    <>
                      <img className="w-[53px] md:w-[63px] sm:mt-5 md:mt-5" src={uploadIcon} />
                      <input
                        id="tambah"
                        type="file"
                        className="hidden"
                        onChange={handleInputImg}
                      />
                      <p className="text-sm sm:text-lg md:text-xl py-5 md:pt-10">Tambah Gambar</p>
                    </>
                  )}
                </div>
              </label>
              <div className="flex justify-center mb-5">
                <Button className="w-full md:w-[308px] py-2" buttonStatus={buttonStatus} />
              </div>
            </div>
            </form>
          </div>
        </>
      ) : (
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
          {showName ? !loading ? (<h1 className="font-bold text-lg capitalize">Hai, {userName}</h1>) : (
              <div className="w-20 h-8 bg-gray-200 rounded-xl animate-pulse"></div>
            ) : null}
        </nav>
        <Sidebar setShowName={
              setShowName} setIsShow={setIsShow} className={`${showSideBar()}`} />
          <div
            className="flex flex-col sm:justify-around md:items-center justify-center items-center sm:items-center"
          >
            <form className="w-[90%] sm:w-[75vw] flex flex-col md:flex-row md:justify-around md:gap-x-20 lg:justify-evenly md:items-center md:h-[65vh] gap-y-7 md:mt-20 mt-20 sm:mt-[15px]"
            onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center gap-y-7 md:gap-y-[50px] lg:gap-y-[60px]">
              <h1 className="font-bold text-xl md:text-3xl text-[#6889FF] lg:text-2xl">
                Tambah Wisata
              </h1>
              <Input
                type="text"
                placeholder="Masukkan Nama Wisata"
                className="py-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-3"
              />
              <Input
                type="number"
                placeholder="Masukkan No.Telephone"
                className="py-3"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Masukkan Kota"
                className="py-3"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              /></div>
            <div className="flex flex-col justify-around gap-y-5 md:gap-y-[30px] md:mt-[180px]">
              <Input
                type="text"
                placeholder="Masukkan Alamat"
                className="py-[15px] md:py-[20px]"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <label tabIndex={0}
                htmlFor="tambah"
                className="flex justify-center items-center cursor-pointer h-[40vh] sm:h-[50vh] sm:w-full md:h-[40vh] md:my-1 md:w-[35vw] w-full lg:h-[48vh] rounded-xl bg-[#F6F6F6]"
              >
                <div className="flex flex-col justify-center items-center opacity-100">
                  {img ? (
                    <>
                      <img src={img} className="w-[100vw] h-[40vh] sm:w-[100vw] sm:h-[50vh] md:w-[35vw] md:h-[40vh] lg:h-[48vh] rounded-md" />
                      <input
                        id="tambah"
                        type="file"
                        className="hidden"
                        onChange={handleInputImg}
                      />
                    </>
                  ) : (
                    <>
                      <img className="w-[53px] md:w-[63px] sm:mt-5 md:mt-5" src={uploadIcon} />
                      <input
                        id="tambah"
                        type="file"
                        className="hidden"
                        onChange={handleInputImg}
                      />
                      <p className="text-sm sm:text-lg md:text-xl py-5 md:pt-10">Tambah Gambar</p>
                    </>
                  )}
                </div>
              </label>
              <div className="flex justify-center mb-5">
                <Button className="w-full md:w-[30vw] py-2" buttonStatus={buttonStatus} />
              </div>
            </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default TambahWisata;
