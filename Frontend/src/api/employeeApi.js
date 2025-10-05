import axios from "axios";

const API_URL = "http://localhost:3000/employees";

export const getEmployees = (query = "") => axios.get(query ? `${API_URL}?q=${query}` : API_URL);

export const createEmployee = (employee) => axios.post(API_URL, employee);

export const updateEmployee = (id, employee) => axios.put(`${API_URL}/${id}`, employee);

export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
