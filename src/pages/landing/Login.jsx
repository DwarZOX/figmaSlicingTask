import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import instance from "../../api/api";
import Checkbox from "../../components/Checkbox";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
  document.title = "Login Page";

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false)
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    setRememberMe(rememberMe);
  }, []);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("email", email);
    data.append("password", password);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/login",
      headers: {},
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        navigate("/dashboard/home");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user.name);
        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center border-2 rounded-xl shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)]">
        <div className="my-10">
          <h1 className="text-4xl sm:text-4xl font-bold text-[#6889FF] leading">
            Login
          </h1>
        </div>

        <form className="flex flex-col px-6 gap-7" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Masukkan Email"
            value={email}
            className={" py-4 px-7 text-md"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="inline-flex justify-between items-center bg-[#F7F7F7]">
          <Input
            type={eye?"text":"password"}
            placeholder="Masukkan Password"
            value={password}
            className={"w-[80%] py-4 px-7 text-md"}
            onChange={(e) => setPassword(e.target.value)}
            setPassword
          />
          <span className="pr-4 text-3xl" onClick={()=>setEye(!eye)}>{eye ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)}</span>
          </div>
          <Button
            type="submit"
            buttonStatus={"Login"}
            className={" py-4 px-7 text-md"}
          />
          <Checkbox
            rememberMe={rememberMe}
            handleRememberMe={handleRememberMe}
          />
        </form>
        <p className="my-10">
          Belum memiliki akun,
          <span className="text-[#0038FF]">
            <Link to={"/register"}> Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
