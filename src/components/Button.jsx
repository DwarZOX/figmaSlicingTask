function Button({ className, buttonStatus }) {
  return (
    <button
      className={`${className} w-full rounded-xl bg-[#6889FF] focus:ring-0 font-bold text-white hover:bg-[#3D62E5]`}
    >
      {buttonStatus}
    </button>
  );
}

export default Button;
