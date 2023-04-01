import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center shadow-[0__4px_22px_11px_rgba(0,0,0,0.25)] rounded-xl w-[50vw] h-[50vh]">
        <div className="flex flex-col text-[30px]">
          <h1 className="text-[100px] font-bold">404</h1>
          <hr />
          <p>Unfortunately, this page doesn't exist.</p>
          <button className="w-[30%] bg-[lightgray] rounded-lg shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)]">
            <Link to={"/dashboard/home"}>Go Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
