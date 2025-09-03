import { useContext, useEffect, useState } from "react";
import { Table } from "../../../components/Common";
import { MasterHeader } from "../MasterCommon";
import { IoBusOutline } from "react-icons/io5";
import {
  DeleteDriver,
  GetAllDriver,
  GetDriverById,
} from "../../../utils/Driver";
import { TiPencil } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import AddDriver from "./AddDriver";
import Modal from "../../../Modal/Modal";
import { UserContext } from "../../../Context/Context";

const Driver = () => {
  const [DriverData, setDriverData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isAddModelOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [UpdateDriverData, setUpdateDriverData] = useState(null);
  const [DeleteDriverData, setDeleteDriverData] = useState({});
  const [isDeleteModelOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddPopup = () => {
    setIsAddModalOpen(true);
  };
  const handleEdit = async (driver) => {
    const data = await GetDriverById(driver.id);
    setUpdateDriverData(data);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (driver) => {
    setIsDeleteModalOpen(true);
    setDeleteDriverData({
      id: driver.id,
      name: driver.firstName + " " + driver.lastName,
    });
  };
  useEffect(() => {
    const fetchDriverData = async () => {
      const data = await GetAllDriver(page);
      setTotalPages(data.totalPages);
      setDriverData(data.result);
      if (data.result.length === 0 && page > 1) {
        setPage(page - 1);
      } else {
        setPage(data.currentPage);
      }
    };
    fetchDriverData();
  }, [page, isEditModalOpen, isAddModelOpen, isDeleteModelOpen]);

  const tableData =
    DriverData?.map((driver) => ({
      id: driver.id,
      firstName: driver.firstName,
      lastName: driver.lastName,
      email: driver.email,
      phone: driver.phone,
      licenceNumber: driver.licenceNumber,
      notes: driver.notes,
      companyName: driver.companyName,
    })) || [];
  return (
    <div className="px-8 py-8 w-full">
      <MasterHeader
        AddPopup={handleAddPopup}
        Heading="Driver"
        AddIcon={<IoBusOutline />}
        AddButtonText="Add Driver"
      />

      <Table
        data={tableData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showEdit={true}
        showDelete={true}
        editIcon={TiPencil}
        deleteIcon={FaRegTrashAlt}
      />
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
        title={"Add Driver Details"}
        body={
          <AddDriver
            onSuccess={() => {
              setIsAddModalOpen(false);
            }}
          />
        }
        isOpen={isAddModelOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <Modal
        title={"Edit Driver  Details"}
        body={
          <AddDriver
            data={UpdateDriverData}
            onSuccess={() => {
              alert("Driver details updated successfully");
              setIsEditModalOpen(false);
            }}
          />
        }
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <Modal
        title={"Delete Driver"}
        body={
          <h1>
            Are you sure you want to delete
            <span className="text-red-700"> {DeleteDriverData.name}</span>?
          </h1>
        }
        footer={
          <div className="flex justify-end w-full  gap-2">
            <button
              onClick={async () => {
                await DeleteDriver(DeleteDriverData.id);
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
export default Driver;
