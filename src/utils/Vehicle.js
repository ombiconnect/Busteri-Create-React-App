import { getAxios } from "../helpers/axiosInterceptor";

export const GetAllVehicle = async (currentPage) => {
  try {
    const res = await getAxios().get(
      `/vehicle?currentPage=${currentPage}&pageSize=5&paging=true`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    throw error;
  }
};

export const GetVehicleById = async (id) => {
  try {
    const res = await getAxios().get(`/vehicle/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    throw error;
  }
};

export const UpsertVehicle = async (vehicleData) => {
  try {
    const data = {
      id: vehicleData.id || 0,
      totalSeats: vehicleData.totalSeats
        ? Number(vehicleData.totalSeats)
        : null,
      totalHandicapSeats: vehicleData.handicappedSeats
        ? Number(vehicleData.handicappedSeats)
        : null,
      vehicleNumber: vehicleData.vehicleNumber || "",
      brand: vehicleData.brand || "",
      model: vehicleData.model || "",
      vehicleTypeId: vehicleData.vehicleTypeId
        ? Number(vehicleData.vehicleTypeId)
        : null,
      engineTypeId: vehicleData.engineTypeId
        ? Number(vehicleData.engineTypeId)
        : null,
      emissionStandards: vehicleData.emissionStandards || "",
      firstRegistrationDate: vehicleData.firstRegistrationDate
        ? new Date(vehicleData.firstRegistrationDate).toISOString()
        : null,
      notes: vehicleData.notes || "",
      companyId: vehicleData.companyId ? Number(vehicleData.companyId) : null,
    };

    let res = "";
    if (data.id === 0) {
      res = await getAxios().post(`/vehicle`, data);
    } else {
      res = await getAxios().put(`/vehicle/${data.id}`, data);
    }
    return res;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return error;
  }
};

export const DeleteVehicle = async (id) => {
  try {
    const res = await getAxios().delete(`/vehicle/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};
