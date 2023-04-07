function Checkbox({ rememberMe, handleRememberMe }) {
  return (
    <label tabIndex={0}  htmlFor="reminder" className="mt-[-15px] pl-5 cursor-pointer">
      <input
        type="checkbox"
        name="reminder"
        id="reminder"
        className="border-none bg-[#D9D9D9] focus:ring-[#6889FF]"
        checked={rememberMe}
        onChange={handleRememberMe}
      />
      <span className="text-sm"> Ingat saya untuk Login</span>
    </label>
  );
}

export default Checkbox;
