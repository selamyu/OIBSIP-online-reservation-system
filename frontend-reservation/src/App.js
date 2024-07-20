import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Reservation from "./components/Reservation/Reservation";
import UsersList from "./components/Register/UsersList"
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetails from "./components/Register/UserDetails";
import ReservationCancellation from "./components/Reservation/ReservationCancellation";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";

const App = () => {
	return (
		<Router>
			<Navbar />
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/" element={<Navigate to="/login" />} />
					<Route path="/login" element={<Login />} />
					<Route path="/reservations" element={<Reservation />} />
					<Route path="/allUsers" element={<UsersList />} />
					<Route path="/user/:id" element={<UserDetails />} />
					<Route
						path="/cancel"
						element={<ReservationCancellation />}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
