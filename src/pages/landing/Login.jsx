import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useState } from "react";
import instance from "../../api/api";

function Login() {
  document.title = "Login Page";

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        console.log(JSON.stringify(response.data));
        navigate("/dashboard/home");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center border-2 rounded-xl shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)]">
        <div className="my-10">
          <h1 className="text-4xl sm:text-4xl font-bold text-[#6889FF] leading">Login</h1>
        </div>

        <form className="flex flex-col px-6 gap-7" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Masukkan Email"
            value={email} className={' py-4 px-7 text-md'}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Masukkan Password"
            value={password} className={' py-4 px-7 text-md'}
            onChange={(e) => setPassword(e.target.value)}
            setPassword
          />
          <Button type="submit" buttonStatus={"Login"} className={' py-4 px-7 text-md'} />
          <label htmlFor="reminder" className="mt-[-25px] pl-5">
            <input
              type="checkbox"
              name="reminder"
              id="reminder"
              className="border-none bg-[#D9D9D9] focus:ring-[#6889FF] "
            />
            <span className="text-sm"> Ingat saya untuk Login</span>
          </label>
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
