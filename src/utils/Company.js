import { getAxios } from "../helpers/axiosInterceptor";
export const GetAllCompany = async (currentPage) => {
  try {
    const res = await getAxios().get(
      `/company?currentPage=${currentPage}&pageSize=5&paging=true`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching company details:", error);
    throw error;
  }
};

export const GetCompanyById = async (id) => {
  try {
    const res = await getAxios().get(`/company/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    throw error;
  }
};

export const UpsertCompany = async (companyData) => {
  try {
    const data = {
      id: companyData.id || 0,
      name: companyData.name,
      webSite: companyData.webSite,
      logoUrl: "TempLogoUrl",
      address: {
        street1: companyData.street1,
        street2: companyData.street2,
        country: companyData.country,
        state: companyData.state,
        cityId: companyData.cityId,
        zip: companyData.zip,
        zipAreaDescription: companyData.zipAreaDescription,
      },
      isActive: true,
    };
    let res = "";
    if (data.id === 0) {
      res = await getAxios().post(`/company`, data);
    } else {
      res = await getAxios().put(`/company/${data.id}`, data);
    }
    return res;
  } catch (error) {
    console.error("Error updating company:", error);

    return error;
  }
};

export const DeleteCompany = async (id) => {
  try {
    const res = await getAxios().delete(`/company/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
};
