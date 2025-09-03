import { useEffect, useState } from "react";
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
import { DeleteRoute, GetAllRoutes, GetRouteById } from "../../../utils/Routes";
import AddRoute from "./AddRoute";
import Modal from "../../../Modal/Modal";

const RouteComponent = () => {
  const [RouteData, setRouteData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isAddModelOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [UpdateRouteData, setUpdateRouteData] = useState(null);
  const [DeleteRouteData, setDeleteRouteData] = useState({});
  const [isDeleteModelOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddPopup = () => {
    setIsAddModalOpen(true);
  };
  const handleEdit = async (route) => {
    const data = await GetRouteById(route.id);
    setUpdateRouteData(data);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (route) => {
    setIsDeleteModalOpen(true);
    setDeleteRouteData({
      id: route.id,
      name: route.name,
    });
  };
  useEffect(() => {
    const fetchRouteData = async () => {
      const data = await GetAllRoutes(page);
      setTotalPages(data.totalPages);
      setRouteData(data.result);
      if (data.result.length === 0 && page > 1) {
        setPage(page - 1);
      } else {
        setPage(data.currentPage);
      }
    };
    fetchRouteData();
  }, [page, isEditModalOpen, isAddModelOpen, isDeleteModelOpen]);

  const tableData =
    RouteData?.map((route) => ({
      id: route.id,
      name: route.name,
      cityName: route.cityName,
      companyName: route.companyName,
      driverName: route.driverName,
    })) || [];
  return (
    <div className="px-8 py-8 w-full">
      <MasterHeader
        AddPopup={handleAddPopup}
        Heading="Routes"
        AddIcon={<IoBusOutline />}
        AddButtonText="Add Route"
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
        title={"Add Route Details"}
        body={
          <AddRoute
            onSuccess={() => {
              setIsAddModalOpen(false);
            }}
          />
        }
        isOpen={isAddModelOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <Modal
        title={"Edit Route  Details"}
        body={
          <AddRoute
            data={UpdateRouteData}
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
            <span className="text-red-700"> {DeleteRouteData.name}</span>?
          </h1>
        }
        footer={
          <div className="flex justify-end w-full  gap-2">
            <button
              onClick={async () => {
                await DeleteRoute(DeleteRouteData.id);
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
export default RouteComponent;
