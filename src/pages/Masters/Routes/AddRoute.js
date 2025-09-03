import { useEffect, useState } from "react";
import { InputField, InputLabel, FormMessage } from "../../../components/Form";
import { DropDown } from "../../../components/Common";
import { GetAllCompany } from "../../../utils/Company";
import { UpsertVehicle } from "../../../utils/Vehicle";
import { GetAllCities, GetAllLookupType } from "../../../utils/Common";
import { GetAllDriver } from "../../../utils/Driver";
import { UpsertRoute } from "../../../utils/Routes";

const AddRoute = ({ data, onSuccess }) => {
  const [error, setError] = useState({});
  const [companyList, setCompanyList] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    companyId: 0,
    driverId: 0,
    cityId: 0,
    name: "",
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

    const fetchCities = async () => {
      try {
        const response = await GetAllCities();
        const cities = response.map((city) => ({
          id: city.id,
          name: city.name,
        }));
        setCityList([{ id: 0, name: "Select City" }, ...cities]);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await GetAllDriver();
        const drivers = response.result.map((driver) => ({
          id: driver.id,
          name: driver.firstName + " " + driver.lastName,
        }));
        setDriverList([{ id: 0, name: "Select driver" }, ...drivers]);
      } catch (error) {
        console.error("Error fetching drive:", error);
      }
    };
    fetchCompanies();
    fetchCities();
    fetchDrivers();
  }, []);

  useEffect(() => {
    if (data) {
      setFormData({
        id: data?.id || 0,
        companyId: data?.companyId || 0,
        name: data?.name || "",
        cityId: data?.cityId || 0,
        driverId: data?.driverId || 0,
      });
    }
  }, [data]);

  return (
    <form className="grid grid-cols-2 gap-6">
      {/* Name */}
      <div>
        <InputLabel label="Name" isManadatory={true} />
        <InputField
          placeholder="Enter name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <FormMessage
          message={error["Name"]}
          className="cursor-pointer text-red-600"
        />
      </div>

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

      {/* City */}
      <div>
        <InputLabel label="City Name" isManadatory={true} />
        <DropDown
          optionsObject={cityList}
          className="w-full bg-[#F8F8F8] px-4 py-3 border border-[#E7E7E7] rounded-md"
          Selected={formData.cityId}
          onChange={(e) => {
            handleChange("cityId", e.target.value);
          }}
        />
        <FormMessage
          message={error["CityId"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Driver */}
      <div>
        <InputLabel label="Driver" isManadatory={true} />
        <DropDown
          optionsObject={driverList}
          className="w-full bg-[#F8F8F8] px-4 py-3 border border-[#E7E7E7] rounded-md"
          Selected={formData.driverId}
          onChange={(e) => {
            handleChange("driverId", e.target.value);
          }}
        />
        <FormMessage
          message={error["DriverId"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Buttons */}
      <div className="col-span-2">
        <div className="flex justify-center w-full gap-2">
          <button
            className="bg-black text-white rounded-md px-4 py-2"
            onClick={async (e) => {
              e.preventDefault();
              const response = await UpsertRoute(formData);
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

export default AddRoute;
