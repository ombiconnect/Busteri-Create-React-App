import { getAxios } from "../helpers/axiosInterceptor";
export const GetAllCompany = async () => {
  try {
    const res = await getAxios().get("/company");
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error fetching company details:", error);
    throw error;
  }
};
