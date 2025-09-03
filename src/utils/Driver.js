import { getAxios } from "../helpers/axiosInterceptor";
export const GetAllDriver = async (currentPage) => {
  try {
    const paging = currentPage ? true : false;
    if (!paging) {
      currentPage = 1;
    }
    const res = await getAxios().get(
      `/driver?currentPage=${currentPage}&pageSize=5&paging=${paging}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching driver details:", error);
    throw error;
  }
};

export const GetDriverById = async (id) => {
  try {
    const res = await getAxios().get(`/driver/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching driver by ID:", error);
    throw error;
  }
};

export const UpsertDriver = async (driverData) => {
  try {
    const data = {
      id: driverData.id || 0,
      firstName: driverData.firstName,
      lastName: driverData.lastName,
      languageId: 1,
      role: "Driver",
      email: driverData.email,
      phone: driverData.phone,
      licenceNumber: driverData.licenceNumber,
      notes: driverData.notes,
      companyId: driverData.companyId,
      profileUrl: "TempProfileUrl",
    };
    let res = "";
    if (data.id === 0) {
      res = await getAxios().post(`/driver`, data);
    } else {
      res = await getAxios().put(`/driver/${data.id}`, data);
    }
    return res;
  } catch (error) {
    console.error("Error updating driver:", error);

    return error;
  }
};

export const DeleteDriver = async (id) => {
  try {
    const res = await getAxios().delete(`/driver/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting driver:", error);
    throw error;
  }
};
