function Button({ className, buttonStatus }) {
  return (
    <button
      className={`${className} w-full rounded-xl bg-[#6889FF] font-bold text-white`}
    >
      {buttonStatus}
    </button>
  );
}

export default Button;
