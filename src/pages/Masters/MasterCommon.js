import { BsBuildingAdd } from "react-icons/bs";
import AddCompany from "./Company/AddCompany";

export const MasterHeader = ({ AddPopup, Heading, AddIcon, AddButtonText }) => {
  return (
    <div className="flex justify-between items-center ">
      <span className="text-3xl font-semibold">{Heading}</span>
      <div
        className="cursor-pointer flex gap-2 items-center"
        onClick={AddPopup}
      >
        {AddIcon}
        <span className="font-semibold">{AddButtonText}</span>
      </div>
    </div>
  );
};
