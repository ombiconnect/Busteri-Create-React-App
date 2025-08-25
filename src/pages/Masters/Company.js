import { useEffect, useState } from "react";
import { GetAllCompany } from "../../utils/Company";

const Company = () => {
  const [CompanyData, setCompanyData] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      const data = await GetAllCompany();
      setCompanyData(data.result);
    };
    fetchCompanyData();
  }, []);

  return (
    <div className="mx-8 my-8 w-12/12">
      <table className="w-[100%]">
        <thead>
          <tr className="bg-[rgb(238,249,253)]">
            <div className="px-6 py-6">
              <th className="pr">Logo</th>

              <th>Company Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Website</th>
              <th>Actions</th>
            </div>
          </tr>
        </thead>
        <tbody>
          {console.log("CompanyData__________+", CompanyData)}
          {CompanyData &&
            CompanyData.map((company) => (
              <tr>
                <td>{company.id}</td>
                <td>{company.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Company;
