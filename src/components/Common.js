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

export const Table = ({
  data,
  onEdit,
  onDelete,
  showEdit = false,
  showDelete = false,
  editIcon: EditIcon,
  deleteIcon: DeleteIcon,
  className = "",
}) => {
  if (!data || data.length === 0) return null;

  // Extract column headers from the first object's keys
  const columns = Object.keys(data[0]).filter((key) => key !== "id");

  return (
    <table className={`w-full mt-7 ${className}`}>
      <thead>
        <tr className="bg-[rgb(238,249,253)] text-left">
          {columns.map((column) => (
            <th key={column} className="px-6 py-4 capitalize">
              {column.replace(/([A-Z])/g, " $1").trim()}
            </th>
          ))}
          {(showEdit || showDelete) && <th className="px-6 py-4">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id || index} className="border-b">
            {columns.map((column) => (
              <td key={column} className="px-6 py-4">
                {item[column]}
              </td>
            ))}
            {(showEdit || showDelete) && (
              <td className="px-6 py-4">
                <div className="flex gap-4 text-gray-600">
                  {showEdit && onEdit && EditIcon && (
                    <EditIcon
                      className="cursor-pointer"
                      onClick={() => onEdit(item)}
                    />
                  )}
                  {showDelete && onDelete && DeleteIcon && (
                    <DeleteIcon
                      className="cursor-pointer"
                      onClick={() => onDelete(item)}
                    />
                  )}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
