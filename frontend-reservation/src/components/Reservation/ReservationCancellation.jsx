import React, { useState } from "react";
import { cancelReservation } from "../../api";
import styles from "./ReservationCancellation.module.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReservationCancellation = () => {
	const [userId, setUserId] = useState("");
	const [reservationId, setReservationId] = useState("");

	const handleCancel = async (e) => {
		e.preventDefault();
		try {
			await cancelReservation(userId, reservationId);
			toast.success("Reservation cancelled successfully!");
		} catch (error) {
			toast.error("Failed to cancel reservation.");
		}
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleCancel} className={styles.form}>
				<h2>Cancel Reservation</h2>
				<div className={styles.inputGroup}>
					<label>User ID</label>
					<input
						type="text"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Reservation ID</label>
					<input
						type="text"
						value={reservationId}
						onChange={(e) => setReservationId(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className={styles.button}>
					Cancel Reservation
				</button>
			</form>
			<ToastContainer />
		</div>
	);
};

export default ReservationCancellation;
