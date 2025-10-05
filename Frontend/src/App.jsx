import React, { useState, useEffect } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import EditModal from "./components/EditModal";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "./api/employeeApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchAllEmployees = async (query = "") => {
    try {
      const res = await getEmployees(query);
      setEmployees(res.data);
    } catch (error) {
      toast.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const handleAdd = async (employee) => {
    try {
      await createEmployee(employee);
      fetchAllEmployees();
      toast.success("Employee added successfully!");
    } catch (error) {
      toast.error("Failed to add employee");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await deleteEmployee(id);
      fetchAllEmployees();
      toast.success("Employee deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateEmployee(id, data);
      fetchAllEmployees();
      toast.success("Employee updated successfully!");
      setModalOpen(false);
      setEditingEmployee(null);
    } catch (error) {
      toast.error("Failed to update employee");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchAllEmployees(value);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Employee Management</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearch}
          className="border px-4 py-2 w-full md:w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                     transform transition-transform duration-150 hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 shadow-lg"
        />
      </div>

      <EmployeeForm onAdd={handleAdd} />
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />

      <EditModal
        isOpen={modalOpen}
        onRequestClose={() => {
          setModalOpen(false);
          setEditingEmployee(null);
        }}
        employee={editingEmployee}
        onUpdate={handleUpdate}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
