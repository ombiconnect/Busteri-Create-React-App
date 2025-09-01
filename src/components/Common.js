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
  optionsObject = {},
  options = [],
  onChange = () => {},
  Selected = 1,
}) => {
  return (
    <div className="flex gap-1 items-center">
      <select
        onChange={onChange}
        value={Selected}
        className={` text-sm leading-none rounded-2xl cursor-pointer  border-none ${className}`}
      >
        {Array.isArray(options) &&
          options.map((option, index) => (
            <option key={index} className="text-black" value={option}>
              {option}
            </option>
          ))}
        {Array.isArray(optionsObject) &&
          optionsObject.map((option, index) => (
            <option key={index} className="text-black" value={option.id}>
              {option.name}
            </option>
          ))}
        ;
      </select>
    </div>
  );
};
