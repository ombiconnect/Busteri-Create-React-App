import { useEffect, useState } from "react";
import { DropDown } from "../../../components/Common";
import { FormMessage, InputField, InputLabel } from "../../../components/Form";
import { GetAllCities } from "../../../utils/Common";
import { UpsertCompany } from "../../../utils/Company";

const AddCompany = ({ data, onSuccess }) => {
  const [cityList, setCityList] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
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

    fetchCities();
  }, []);

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    webSite: "",
    street1: "",
    street2: "",
    city: "",
    cityId: 0,
    zip: "",
    zipAreaDescription: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    setFormData({
      id: data?.id || 0,
      name: data?.name || "",
      webSite: data?.webSite || "",
      street1: data?.address?.street1 || "",
      street2: data?.address?.street2 || "",
      city: data?.address.cityDetails?.name || "",
      cityId: data?.address?.cityDetails?.id || 0,
      zip: data?.address?.zip || "",
      zipAreaDescription: data?.address?.zipAreaDescription || "",
      state: data?.address?.state || "",
      country: data?.address?.country || "",
    });
  }, [data]);

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <form className="grid grid-cols-2 gap-6">
      {/* Company Name */}
      <div>
        <InputLabel label="Company Name" isManadatory={true} />
        <InputField
          placeholder="Enter company name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <FormMessage
          message={error["Name"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Website */}
      <div>
        <InputLabel label="Company Website" isManadatory={true} />
        <InputField
          placeholder="Company website"
          value={formData.webSite}
          onChange={(e) => handleChange("webSite", e.target.value)}
        />
        <FormMessage
          message={error["WebSite"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Street 1 */}
      <div>
        <InputLabel label="Street 1" isManadatory={true} />
        <InputField
          placeholder="Street 1"
          value={formData.street1}
          onChange={(e) => handleChange("street1", e.target.value)}
        />
        <FormMessage
          message={error["Address.Street1"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Street 2 */}
      <div>
        <InputLabel label="Street 2" isManadatory={true} />
        <InputField
          placeholder="Street 2"
          value={formData.street2}
          onChange={(e) => handleChange("street2", e.target.value)}
        />
        <FormMessage
          message={error["Address.Street2"]}
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
          message={error["Address.CityId"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Zip */}
      <div>
        <InputLabel label="Zip" isManadatory={true} />
        <InputField
          placeholder="Zip"
          value={formData.zip}
          onChange={(e) => handleChange("zip", e.target.value)}
        />
        <FormMessage
          message={error["Address.Zip"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Zip Area Description */}
      <div>
        <InputLabel label="Zip Area Description" isManadatory={true} />
        <InputField
          placeholder="Zip Area Description"
          value={formData.zipAreaDescription}
          onChange={(e) => handleChange("zipAreaDescription", e.target.value)}
        />
        <FormMessage
          message={error["Address.ZipAreaDescription"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* State */}
      <div>
        <InputLabel label="State" isManadatory={true} />
        <InputField
          placeholder="State"
          value={formData.state}
          onChange={(e) => handleChange("state", e.target.value)}
        />
        <FormMessage
          message={error["Address.State"]}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Country */}
      <div className="col-span-2">
        <InputLabel label="Country" isManadatory={true} />
        <InputField
          placeholder="Country"
          value={formData.country}
          onChange={(e) => handleChange("country", e.target.value)}
        />
        <FormMessage
          message={error["Address.Country"]}
          className="cursor-pointer text-red-600"
        />
      </div>
      <div className="col-span-2">
        <div className="flex justify-center w-full  gap-2">
          <button
            // type="button"
            className="bg-black text-white rounded-md px-4 py-2"
            onClick={async (e) => {
              e.preventDefault();
              const data = await UpsertCompany(formData);
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

export default AddCompany;
