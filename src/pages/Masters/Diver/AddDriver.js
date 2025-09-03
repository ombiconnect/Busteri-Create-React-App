import { useContext, useEffect, useState } from "react";
import { InputField, InputLabel, FormMessage } from "../../../components/Form";
import { DropDown } from "../../../components/Common";
import { GetAllCompany } from "../../../utils/Company";
import { UpsertDriver } from "../../../utils/Driver";
import { UserContext } from "../../../Context/Context";

const AddDriver = ({ data, onSuccess }) => {
  const [error, setError] = useState({});
  const [companyList, setCompanyList] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenceNumber: "",
    notes: "",
    companyId: 0,
  });
  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };
  useEffect(() => {
    setFormData({
      id: data?.id || 0,
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      email: data?.email || "",
      phone: data?.phone || "",
      licenceNumber: data?.licenceNumber || "",
      notes: data?.notes || "",
      companyId: data?.companyId || 0,
    });
  }, [data]);
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await GetAllCompany();
        const companies = response.result.map((company) => ({
          id: company.id,
          name: company.name,
        }));

        setCompanyList([{ id: 0, name: "Select Company" }, ...companies]);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);
  return (
    <form className="grid grid-cols-2 gap-6">
      {/* First Name */}
      <div>
        <InputLabel label="First Name" isManadatory={true} />
        <InputField
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <FormMessage
          message={error["FirstName"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Last Name */}
      <div>
        <InputLabel label="Last Name" isManadatory={true} />
        <InputField
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <FormMessage
          message={error["LastName"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Email */}
      <div>
        <InputLabel label="Email" isManadatory={true} />
        <InputField
          placeholder="Enter email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <FormMessage
          message={error["Email"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Phone */}
      <div>
        <InputLabel label="Phone" isManadatory={true} />
        <InputField
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <FormMessage
          message={error["Phone"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Licence Number */}
      <div>
        <InputLabel label="Licence Number" isManadatory={true} />
        <InputField
          placeholder="Enter licence number"
          value={formData.licenceNumber}
          onChange={(e) => handleChange("licenceNumber", e.target.value)}
        />
        <FormMessage
          message={error["LicenceNumber"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* City */}
      <div>
        <InputLabel label="Company Name" isManadatory={true} />
        <DropDown
          optionsObject={companyList}
          className="w-full bg-[#F8F8F8] px-4 py-3 border border-[#E7E7E7] rounded-md"
          Selected={formData.companyId}
          onChange={(e) => {
            handleChange("companyId", e.target.value);
          }}
        />
        <FormMessage
          message={error["CompanyId"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Notes */}
      <div>
        <InputLabel label="Notes" isManadatory={false} />
        <InputField
          placeholder="Enter notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
        <FormMessage
          message={error["Notes"]}
          className="cursor-pointer text-red-600"
        />
      </div>
      <div className="col-span-2">
        <div className="flex justify-center w-full  gap-2">
          <button
            className="bg-black text-white rounded-md px-4 py-2"
            onClick={async (e) => {
              e.preventDefault();
              const data = await UpsertDriver(formData);
              if (data?.response?.data?.errors) {
                setError(data.response.data.errors);
              } else {
                setError({});
                if (onSuccess) onSuccess();
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
export default AddDriver;
