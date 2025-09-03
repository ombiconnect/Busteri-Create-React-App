import { useEffect, useState } from "react";
import {
  DeleteVehicle,
  GetAllVehicle,
  GetVehicleById,
} from "../../../utils/Vehicle";
import { TiPencil } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../../../Modal/Modal";
import { BsCarFront } from "react-icons/bs";
import { Table } from "../../../components/Common";
import { MasterHeader } from "../MasterCommon";
import AddVehicle from "./AddVehicle";

const Vehicle = () => {
  const [VehicleData, setVehicleData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModelOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModalOpen] = useState(false);
  const [UpdateVehicleData, setUpdateVehicleData] = useState(null);
  const [DeleteVehicleData, setDeleteVehicleData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchVehicleData = async () => {
      const data = await GetAllVehicle(page);
      setTotalPages(data.totalPages);
      setVehicleData(data.result);
      if (data.result.length === 0 && page > 1) {
        setPage(page - 1);
      } else {
        setPage(data.currentPage);
      }
    };
    fetchVehicleData();
  }, [isDeleteModelOpen, page, isEditModalOpen, isAddModelOpen]);

  const tableData =
    VehicleData?.map((vehicle) => ({
      id: vehicle.id,
      vehicleNumber: vehicle.vehicleNumber,
      companyName: vehicle?.companyDetails?.name || "",
      VehicleType: vehicle?.vehicleType || "",
      engineType: vehicle?.engineType || "",
      brand: vehicle.brand,
      totalSeats: vehicle.totalSeats,
      handicapSeats: vehicle.totalHandicapSeats,
    })) || [];

  const handleEdit = async (vehicle) => {
    const data = await GetVehicleById(vehicle.id);
    setUpdateVehicleData(data);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (vehicle) => {
    setIsDeleteModalOpen(true);
    setDeleteVehicleData({
      id: vehicle.id,
      name: vehicle.vehicleNumber,
    });
  };

  const handleAddPopup = () => {
    setIsAddModalOpen(true);
  };

  return (
    <div className="px-8 py-8 w-full">
      <MasterHeader
        AddPopup={handleAddPopup}
        Heading="Vehicle"
        AddIcon={<BsCarFront />}
        AddButtonText="Add Vehicle"
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
        title={"Add Vehicle Details"}
        body={
          <AddVehicle
            onSuccess={() => {
              setIsAddModalOpen(false);
            }}
          />
        }
        isOpen={isAddModelOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <Modal
        title={"Edit Vehicle Details"}
        body={
          <AddVehicle
            data={UpdateVehicleData}
            onSuccess={() => {
              setIsEditModalOpen(false);
            }}
          />
        }
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <Modal
        title={"Delete Vehicle"}
        body={
          <h1>
            Are you sure you want to delete
            <span className="text-red-700"> {DeleteVehicleData.name}</span>?
          </h1>
        }
        footer={
          <div className="flex justify-end w-full  gap-2">
            <button
              onClick={async () => {
                await DeleteVehicle(DeleteVehicleData.id);
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
export default Vehicle;
