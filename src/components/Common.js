export const HomeButton = ({
  label,
  active = false,
  className = "",
  onClick = () => {},
}) => {
  return (
    <span
      className={`text-sm leading-none rounded-2xl cursor-pointer text-white  py-2
        ${active ? "bg-[#00B3D1] font-bold px-5" : "bg-transparent"} 
        ${className}`}
      onChange={onClick}
      defaultValue={"Company"}
    >
      {label}
    </span>
  );
};

export const DropDown = ({
  className = "",
  options = [],
  onChange,
  Selected = "Company",
}) => {
  return (
    <div className="flex gap-1 items-center">
      <select
        onChange={onChange}
        value={Selected}
        className={`bg-transparent text-white  text-sm leading-none rounded-2xl cursor-pointer  border-none ${className}`}
      >
        {options.map((option, index) => (
          <option key={index} className="text-black" value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
