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
