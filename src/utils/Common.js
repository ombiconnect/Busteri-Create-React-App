import { getAxios } from "../helpers/axiosInterceptor";

export const GetAllCities = async () => {
  try {
    const res = await getAxios().get("/city");
    return res.data;
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    throw error;
  }
};

export const GetAllLookupType = async (type) => {
  try {
    const res = await getAxios().get(`/common/lookup?typeName=${type}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching vehicle type details:", error);
    throw error;
  }
};
