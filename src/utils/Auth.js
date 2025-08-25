import { getAxios } from "../helpers/axiosInterceptor";
export const userLogin = async (request) => {
  try {
    let res = await getAxios().post("/auth", request);
    return res;
  } catch (error) {
    return error;
  }
};
export const UserDetails = async (id) => {
  try {
    const res = await getAxios().get(`/user/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
