import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

const EditModal = ({ isOpen, onRequestClose, employee, onUpdate }) => {
  const [formData, setFormData] = useState({ name: "", email: "", position: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        position: employee.position || "",
      });
    }
  }, [employee]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.position) {
      toast.error("All fields are required!");
      return;
    }

    if (!employee) return;

    setIsSubmitting(true);

    setTimeout(() => {
      onUpdate(employee._id, formData);
      toast.success("Employee updated successfully!");
      setIsSubmitting(false);
      onRequestClose();
    }, 600);
  };

  const inputFields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", icon: "👤" },
    { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", icon: "📧" },
    { name: "position", label: "Job Position", type: "text", placeholder: "Frontend Developer", icon: "💼" }
  ];

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onRequestClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onRequestClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onRequestClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[600px] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl p-8 animate-scale-in overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-110 hover:rotate-90 z-10"
        >
          ✕
        </button>

        <div className="mb-8 text-center transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Edit Employee
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Update employee information below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {inputFields.map((field, index) => (
            <div
              key={field.name}
              className="relative group"
              style={{
                animation: `fade-in 0.6s ease-out ${index * 0.1}s backwards`
              }}
            >
              <div
                className={`relative transform transition-all duration-300 ${
                  focusedField === field.name 
                    ? "scale-105 -translate-y-1" 
                    : "scale-100"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: focusedField === field.name 
                    ? "perspective(1000px) rotateX(2deg)" 
                    : "perspective(1000px) rotateX(0deg)"
                }}
              >
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none font-medium ${
                    formData[field.name] || focusedField === field.name
                      ? "-top-6 text-xs text-blue-600 dark:text-blue-400"
                      : "top-3 text-sm text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <span className="mr-2">{field.icon}</span>
                  {field.label}
                </label>

                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={focusedField === field.name ? field.placeholder : ""}
                  className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 rounded-xl
                    transition-all duration-300 outline-none
                    ${focusedField === field.name
                      ? "border-blue-500 shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }
                    text-gray-800 dark:text-gray-200
                    placeholder-gray-400 dark:placeholder-gray-500
                    transform transition-transform duration-200
                  `}
                  style={{
                    transform: focusedField === field.name 
                      ? "translateZ(10px)" 
                      : "translateZ(0px)"
                  }}
                  required
                />

                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                    focusedField === field.name ? "w-full" : "w-0"
                  }`}
                ></div>

                {focusedField === field.name && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl -z-10 animate-pulse"></div>
                )}
              </div>
            </div>
          ))}

          <div className="flex gap-4 justify-end pt-4">
            <button
              type="button"
              onClick={onRequestClose}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-xl
                transform transition-all duration-300
                hover:scale-105 hover:shadow-lg
                active:scale-95"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl
                overflow-hidden group
                transform transition-all duration-300
                hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50
                active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              `}
              style={{
                transformStyle: "preserve-3d",
                transform: isSubmitting ? "rotateX(0deg)" : "rotateX(-2deg)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <span className="relative flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    <span>Update Employee</span>
                  </>
                )}
              </span>

              <div className="absolute inset-0 rounded-xl bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                style={{ transform: "translateZ(-2px)" }}
              ></div>
            </button>
          </div>
        </form>

        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-400/10 to-blue-400/10 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>,
    document.body
  );
};

export default EditModal;
