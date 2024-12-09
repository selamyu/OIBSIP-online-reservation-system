// import axios from "axios";

// const api = axios.create({
// 	baseURL: "http://localhost:5050/api",
// });

// export const registerUser = (userData) => api.post("/users/register", userData);
// export const loginUser = (credentials) => api.post("/users/login", credentials);
// export const createReservation = (reservationData) =>
// 	api.post("/reservations", reservationData);
// export const getReservations = () => api.get("/reservations");
// export const cancelReservation = (id) => api.delete(`/reservations/${id}`);

import axios from "axios";

const API_URL = "http://localhost:5050/api/users"; //user
const API_URL2 = "http://localhost:5050/api/reservation"; //reser

export const loginUser = async (credentials) => {
	return axios.post(`${API_URL}/login`, credentials);
};

// export const registerUser = async (userDetails) => {
// 	return axios.post(`${API_URL}/register`, userDetails);
// };

export const registerUser = async ({ username, password, roles }) => {
	try {
		const response = await axios.post(`${API_URL}/register`, {
			username,
			password,
			roles,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const makeReservation = async (reservationDetails) => {
	return axios.post(`${API_URL2}/make-reservation`, reservationDetails);
};

// export const getAllUsers = async () => {
// 	return axios.get(`${API_URL}/all-users`);
// };
const getToken = () => {
	return localStorage.getItem("token");
};

// export const getAllUsers = async (page, size) => {
// 	const token = getToken();
// 	return axios.get(`${API_URL}/all-users?page=${page}&size=${size}`);
// };

export const getAllUsers = async (page, size) => {
	const token = getToken();
	return await axios.get(`${API_URL}/all-users`, {
		params: { page, size },
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

// export const deleteUser = (userId) => {
// 	return axios.delete(`${API_URL}/${userId}`);
// };
export const deleteUser = async (userId) => {
	const token = getToken();
	return await axios.delete(`${API_URL}/delete${userId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const updateUser = async (userId, userDetails) => {
	return await axios.put(`${API_URL}/delete/${userId}`, userDetails);
};

export const getUserById = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/${id}`);
		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 404) {
			throw new Error("No user with the given ID found.");
		} else {
			throw new Error("An error occurred while fetching the user.");
		}
	}
};

export const cancelReservation = async (userId, reservationId) => {
	try {
		const response = await axios.delete(
			`${API_URL2}/${userId}/${reservationId}`
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};
