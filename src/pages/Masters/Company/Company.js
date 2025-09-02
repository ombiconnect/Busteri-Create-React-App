import { useEffect, useState } from "react";
import {
  DeleteCompany,
  GetAllCompany,
  GetCompanyById,
} from "../../../utils/Company";
import { TiPencil } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../../../Modal/Modal";
import AddCompany from "./AddCompany";
import { BsBuildingAdd } from "react-icons/bs";

const Company = () => {
  const [CompanyData, setCompanyData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModelOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModalOpen] = useState(false);
  const [UpdateCompanyData, setUpdateCompanyData] = useState(null);
  const [DeleteCompanyData, setDeleteCompanyData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCompanyData = async () => {
      const data = await GetAllCompany(page);
      console.log("Paginated data", data);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
      setCompanyData(data.result);
    };
    fetchCompanyData();
  }, [isDeleteModelOpen, page]);

  const formatAddress = (address) => {
    if (!address) return "";

    return [
      address.street1,
      address.street2,
      address.cityDetails?.name,
      address.state,
      address.country,
      address.zip,
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className="px-8 py-8 w-full">
      <div className="flex justify-between items-center">
        <span className="text-3xl font-semibold">Company</span>
        <div
          className="cursor-pointer flex gap-2 items-center"
          onClick={() => {
            setIsAddModalOpen(true);
          }}
        >
          <BsBuildingAdd />
          <span className="font-semibold">Add Company</span>
        </div>
      </div>

      <table className="w-full mt-7">
        <thead>
          <tr className="bg-[rgb(238,249,253)] text-left">
            {/* <th className="px-6 py-4">Logo</th> */}
            <th className="px-6 py-4">Company Name</th>
            <th className="px-6 py-4">Address</th>
            <th className="px-6 py-4">City</th>
            <th className="px-6 py-4">Website</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {CompanyData &&
            CompanyData.map((company) => (
              <tr key={company.id} className="border-b">
                {/* <td className="px-6 py-4">{company.id}</td> */}
                <td className="px-6 py-4">{company.name}</td>
                <td className="px-6 py-4">{formatAddress(company.address)}</td>
                <td className="px-6 py-4">
                  {company.address.cityDetails.name}
                </td>
                <td className="px-6 py-4">{company.webSite}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-4 text-gray-600">
                    <TiPencil
                      className="cursor-pointer"
                      onClick={async () => {
                        const data = await GetCompanyById(company.id);
                        setUpdateCompanyData(data);
                        setIsEditModalOpen(true);
                      }}
                    />
                    <FaRegTrashAlt
                      className="cursor-pointer"
                      onClick={async () => {
                        setIsDeleteModalOpen(true);
                        setDeleteCompanyData({
                          id: company.id,
                          name: company.name,
                        });
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center gap-4 mt-4">
        <button
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          prev
        </button>
        <label>
          Page {page} of {totalPages}
        </label>

        <button
          onClick={() => {
            if (page < totalPages) {
              setPage(page + 1);
            }
          }}
        >
          next
        </button>
      </div>

      <Modal
        title={"Edit Company Details"}
        body={
          <AddCompany
            data={UpdateCompanyData}
            onSuccess={() => {
              setIsEditModalOpen(false);
            }}
          />
        }
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      <Modal
        title={"Add Company Details"}
        body={
          <AddCompany
            onSuccess={() => {
              setIsAddModalOpen(false);
            }}
          />
        }
        isOpen={isAddModelOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <Modal
        title={"Delete Company"}
        body={
          <h1>
            Are you sure you want to delete
            <span className="text-red-700"> {DeleteCompanyData.name}</span>?
          </h1>
        }
        footer={
          <div className="flex justify-end w-full  gap-2">
            <button
              onClick={async () => {
                await DeleteCompany(DeleteCompanyData.id);
                setIsDeleteModalOpen(false);
              }}
              className="bg-black text-white rounded-md px-4 py-2"
            >
              Delete
            </button>
          </div>
        }
        isOpen={isDeleteModelOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};
export default Company;
