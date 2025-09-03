export const FormHeader = ({ title, className = "" }) => {
  return (
    <span className={`font-semibold text-4xl inline ${className}`}>
      {title}
    </span>
  );
};

export const InputField = ({
  placeholder,
  className = "",
  // ref,
  value = "",
  type = "text",
  onChange = () => {},
}) => {
  return (
    <input
      type={type}
      // ref={ref}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`px-4 py-4 bg-[#F8F8F8] border-1 border-[#E7E7E7] rounded-md outline-none ${className}`}
    />
  );
};

export const PasswordField = ({
  placeholder,
  className = "",
  value = "",
  // ref,
  onChange = { onChange },
}) => {
  return (
    <input
      type="password"
      // ref={ref}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={`px-4 py-4 bg-[#F8F8F8] border-1 border-[#E7E7E7] rounded-md outline-none ${className}`}
    />
  );
};

export const CheckboxField = ({ label, className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input type="checkbox" className="h-4 w-4 rounded-sm" />
      <span className="text-xs ml-1 text-[#24252B] font-normal">{label}</span>
    </div>
  );
};

export const SubmitButton = ({ text, className = "", onClick }) => {
  return (
    <button
      className={`bg-black py-4 text-white text-center rounded-md ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const FormMessage = ({
  message,
  className = "",
  onClick = () => {},
}) => {
  return (
    <p
      className={`font-normal text-[12px] text-[#24252B] ${className}`}
      onClick={onClick}
    >
      {message}
    </p>
  );
};

export const InputLabel = ({ label, className = "", isManadatory = false }) => {
  return (
    <div>
      <label className={`text-sm font-medium text-[#6aafe2] pl-4 ${className}`}>
        {label}
      </label>
      {isManadatory && <span className="text-red-700">*</span>}
    </div>
  );
};
