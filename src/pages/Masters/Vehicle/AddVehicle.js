import { useEffect, useState } from "react";
import { InputField, InputLabel, FormMessage } from "../../../components/Form";
import { DropDown } from "../../../components/Common";
import { GetAllCompany } from "../../../utils/Company";
import { UpsertVehicle } from "../../../utils/Vehicle";
import { GetAllLookupType } from "../../../utils/Common";

const AddVehicle = ({ data, onSuccess }) => {
  const [error, setError] = useState({});
  const [companyList, setCompanyList] = useState([]);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [engineTypeList, setEngineTypeList] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    companyId: 0,
    vehicleType: "",
    vehicleTypeId: 0,
    engineTypeId: 0,
    totalSeats: "",
    handicappedSeats: "",
    vehicleNumber: "",
    engineType: "",
    brand: "",
    model: "",
    emissionStandards: "",
    firstRegistrationDate: "",
    note: "",
  });

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  // Fetch company list
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

    const fetchEngineTypes = async () => {
      try {
        const response = await GetAllLookupType("Engine Type");
        const engineTypes = response.map((engineType) => ({
          id: engineType.id,
          name: engineType.name,
        }));
        setEngineTypeList([
          { id: 0, name: "Select Engine type" },
          ...engineTypes,
        ]);
      } catch (error) {
        console.error("Error fetching Engine type:", error);
      }
    };

    const fetchVehicleTypes = async () => {
      try {
        const response = await GetAllLookupType("Vehicle Type");
        const vehicleTypes = response.map((vehicleType) => ({
          id: vehicleType.id,
          name: vehicleType.name,
        }));
        setVehicleTypeList([
          { id: 0, name: "Select vehicle type" },
          ...vehicleTypes,
        ]);
      } catch (error) {
        console.error("Error fetching vehicle type:", error);
      }
    };
    fetchCompanies();
    fetchVehicleTypes();
    fetchEngineTypes();
  }, []);

  useEffect(() => {
    if (data) {
      setFormData({
        id: data?.id || 0,
        companyId: data?.companyDetails.id || 0,
        vehicleType: data?.vehicleType || "",
        vehicleTypeId: data?.vehicleTypeId || 0,
        engineTypeId: data?.engineTypeId || 0,
        totalSeats: data?.totalSeats || "",
        handicappedSeats: data?.totalHandicapSeats || "",
        vehicleNumber: data?.vehicleNumber || "",
        engineType: data?.engineTypeId || "",
        brand: data?.brand || "",
        model: data?.model || "",
        emissionStandards: data?.emissionStandards || "",
        firstRegistrationDate: data?.firstRegistrationDate
          ? data.firstRegistrationDate.split("T")[0] // 👉 gives "2025-09-30"
          : "",
        note: data?.notes || "",
      });
    }
  }, [data]);

  return (
    <form className="grid grid-cols-2 gap-6">
      {/* Company Name */}
      <div>
        <InputLabel label="Company Name" isManadatory={true} />
        <DropDown
          optionsObject={companyList}
          className="w-full bg-[#F8F8F8] px-4 py-3 border border-[#E7E7E7] rounded-md"
          Selected={formData.companyId}
          onChange={(e) => handleChange("companyId", e.target.value)}
        />
        <FormMessage
          message={error["CompanyId"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Vehicle Type */}
      <div>
        <InputLabel label="Vehicle Type" isManadatory={true} />
        <DropDown
          optionsObject={vehicleTypeList}
          className="w-full bg-[#F8F8F8] px-4 py-3 border border-[#E7E7E7] rounded-md"
          Selected={formData.vehicleTypeId}
          onChange={(e) => handleChange("vehicleTypeId", e.target.value)}
        />
        <FormMessage
          message={error["VehicleTypeId"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Total Seats */}
      <div>
        <InputLabel label="Total Seats" isManadatory={true} />
        <InputField
          placeholder="Enter total seats"
          value={formData.totalSeats}
          onChange={(e) => handleChange("totalSeats", e.target.value)}
        />
        <FormMessage
          message={error["TotalSeats"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Handicapped Seats */}
      <div>
        <InputLabel label="Handicapped Seats" isManadatory={true} />
        <InputField
          placeholder="Enter handicapped seats"
          value={formData.handicappedSeats}
          onChange={(e) => handleChange("handicappedSeats", e.target.value)}
        />
        <FormMessage
          message={error["TotalHandicapSeats"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Vehicle Number */}
      <div>
        <InputLabel label="Vehicle Number" isManadatory={true} />
        <InputField
          placeholder="Enter vehicle number"
          value={formData.vehicleNumber}
          onChange={(e) => handleChange("vehicleNumber", e.target.value)}
        />
        <FormMessage
          message={error["VehicleNumber"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Engine Type */}
      <div>
        <InputLabel label="Engine Type" isManadatory={true} />
        <DropDown
          optionsObject={engineTypeList}
          className="w-full bg-[#F8F8F8] px-4 py-3 border border-[#E7E7E7] rounded-md"
          Selected={formData.engineTypeId}
          onChange={(e) => handleChange("engineTypeId", e.target.value)}
        />
        <FormMessage
          message={error["EngineTypeId"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Brand */}
      <div>
        <InputLabel label="Brand" isManadatory={false} />
        <InputField
          placeholder="Enter brand"
          value={formData.brand}
          onChange={(e) => handleChange("brand", e.target.value)}
        />
      </div>

      {/* Model */}
      <div>
        <InputLabel label="Model" isManadatory={false} />
        <InputField
          placeholder="Enter model"
          value={formData.model}
          onChange={(e) => handleChange("model", e.target.value)}
        />
      </div>

      {/* Emission Standards */}
      <div>
        <InputLabel label="Emission Standards" isManadatory={false} />
        <InputField
          placeholder="Enter emission standards"
          value={formData.emissionStandards}
          onChange={(e) => handleChange("emissionStandards", e.target.value)}
        />
      </div>

      {/* First Registration Date */}
      <div>
        <InputLabel label="First Registration Date" isManadatory={false} />
        <InputField
          type="date"
          placeholder="Select registration date"
          value={formData.firstRegistrationDate}
          onChange={(e) =>
            handleChange("firstRegistrationDate", e.target.value)
          }
        />
      </div>

      {/* Note */}
      <div className="col-span-2">
        <InputLabel label="Note" isManadatory={false} />
        <InputField
          placeholder="Enter note"
          value={formData.note}
          onChange={(e) => handleChange("note", e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="col-span-2">
        <div className="flex justify-center w-full gap-2">
          <button
            className="bg-black text-white rounded-md px-4 py-2"
            onClick={async (e) => {
              e.preventDefault();
              const response = await UpsertVehicle(formData);
              if (response?.response?.data?.errors) {
                setError(response.response.data.errors);
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

export default AddVehicle;
