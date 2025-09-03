import { getAxios } from "../helpers/axiosInterceptor";
export const GetAllRoutes = async (currentPage) => {
  try {
    const res = await getAxios().get(
      `/route?currentPage=${currentPage}&pageSize=5&paging=true`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching driver details:", error);
    throw error;
  }
};

export const GetRouteById = async (id) => {
  try {
    const res = await getAxios().get(`/route/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching route by ID:", error);
    throw error;
  }
};

export const UpsertRoute = async (routeData) => {
  try {
    const data = {
      id: routeData.id || 0,
      name: routeData.name,
      cityId: routeData.cityId,
      companyId: routeData.companyId,
      driverId: routeData.driverId,
    };
    let res = "";
    if (data.id === 0) {
      res = await getAxios().post(`/route`, data);
    } else {
      res = await getAxios().put(`/route/${data.id}`, data);
    }
    return res;
  } catch (error) {
    console.error("Error updating route:", error);

    return error;
  }
};

export const DeleteRoute = async (id) => {
  try {
    const res = await getAxios().delete(`/route/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting route:", error);
    throw error;
  }
};
