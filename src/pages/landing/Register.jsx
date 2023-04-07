import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Button from '../../components/Button'
import Input from '../../components/Input'
import instance from "../../api/api";

const Register = () => {
    document.title="Form Register"

    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault()


      let data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("password", password);
      data.append("password_confirmation", password_confirmation);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/register",
        headers: {},
        data: data,
      };

      instance
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });

    }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center border-2 rounded-xl shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)]">
        <div className="my-10">
          <h1 className="text-4xl font-bold text-[#6889FF] leading">
            Register
          </h1>
        </div>

        <form className="flex flex-col px-7 gap-5" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Masukkan Nama"
            value={name} className={' py-4 px-7 text-md'}
            onChange={(e) => setName(e.target.value)}
          />
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
          />
          <Input
            type="password"
            placeholder="Konfirmasi Password"
            value={password_confirmation} className={' py-4 px-7 text-md'}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button type="submit" buttonStatus={"Register"} className={'p-4 px-7 text-lg'} />
        </form>
        <p className="my-6">
          Sudah memiliki akun,
          <span className="text-[#0038FF]">
            <Link to={"/"}> Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register