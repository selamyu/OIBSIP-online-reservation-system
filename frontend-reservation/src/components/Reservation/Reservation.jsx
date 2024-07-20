import React, { useState } from "react";
import { makeReservation } from "../../api";
import styles from "./Reservation.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reservation = () => {
	const [formData, setFormData] = useState({
		userId: "",
		trainNumber: "",
		trainName: "",
		classType: "",
		dateOfJourney: "",
		timeOfJourney: "",
		origin: "",
		destination: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			await makeReservation(formData);
			toast.success("Reservation made successfully!");
			
			setFormData({
				userId: "",
				trainNumber: "",
				trainName: "",
				classType: "",
				dateOfJourney: "",
				timeOfJourney: "",
				origin: "",
				destination: "",
			});
		} catch (error) {
			toast.error("Failed to make reservation!");
		}
	};

	const validateForm = () => {
		const {
			userId,
			trainNumber,
			trainName,
			classType,
			dateOfJourney,
			timeOfJourney,
			origin,
			destination,
		} = formData;

		if (
			!userId ||
			!trainNumber ||
			!trainName ||
			!classType ||
			!dateOfJourney ||
			!timeOfJourney ||
			!origin ||
			!destination
		) {
			toast.error("All fields are required.");
			return false;
		}

		return true;
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<h2>Make a Reservation</h2>
				<div className={styles.inputGroup}>
					<label>User Id</label>
					<input
						type="text"
						name="userId"
						value={formData.userId}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Train Number</label>
					<input
						type="text"
						name="trainNumber"
						value={formData.trainNumber}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Train Name</label>
					<input
						type="text"
						name="trainName"
						value={formData.trainName}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Class Type</label>
					<input
						type="text"
						name="classType"
						value={formData.classType}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Date of Journey</label>
					<input
						type="date"
						name="dateOfJourney"
						value={formData.dateOfJourney}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Time of Journey (hh:mm:ss)</label>
					<input
						type="time"
						step="1"
						name="timeOfJourney"
						value={formData.timeOfJourney}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Origin</label>
					<input
						type="text"
						name="origin"
						value={formData.origin}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Destination</label>
					<input
						type="text"
						name="destination"
						value={formData.destination}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" className={styles.button}>
					Make Reservation
				</button>
			</form>
			<ToastContainer />
		</div>
	);
};

export default Reservation;
