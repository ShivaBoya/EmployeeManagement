import React, { useState } from "react";

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>

        <div className="overflow-x-auto">
          <table className="min-w-full relative">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span>👤</span>
                    <span>Name</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <span>Email</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span>💼</span>
                    <span>Position</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-center font-bold text-sm uppercase tracking-wider">
                  <div className="flex items-center justify-center gap-2">
                    <span>⚙️</span>
                    <span>Actions</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-12">
                    <div className="flex flex-col items-center gap-3 animate-fade-in">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-4xl animate-pulse">
                        📋
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                        No employees found.
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-sm">
                        Add your first employee to get started!
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                employees.map((emp, index) => (
                  <tr
                    key={emp._id}
                    onMouseEnter={() => setHoveredRow(emp._id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${
                      hoveredRow === emp._id
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-750 shadow-lg scale-[1.02]"
                        : "bg-white dark:bg-gray-800"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ${
                            hoveredRow === emp._id
                              ? "scale-110 shadow-lg shadow-blue-500/50"
                              : "scale-100"
                          }`}
                        >
                          {emp.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{emp.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{emp.email}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 transition-all duration-300 ${
                          hoveredRow === emp._id ? "scale-105 shadow-md" : "scale-100"
                        }`}
                      >
                        {emp.position}
                      </span>
                    </td>
                    <td className="py-4 px-6 flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(emp)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition-all transform hover:scale-105"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => onDelete(emp._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all transform hover:scale-105"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-pink-400/10 to-blue-400/10 rounded-full blur-3xl -z-10"></div>
      </div>

      {employees.length > 0 && (
        <div className="mt-4 flex justify-center">
          <div className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg animate-fade-in">
            <span className="font-semibold">
              {employees.length} {employees.length === 1 ? "Employee" : "Employees"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
