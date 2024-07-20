import React, { useState } from "react";
import { getUserById } from "../../api";
import styles from "./UserDetails.module.css";

const UserDetails = () => {
	const [id, setId] = useState("");
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		setId(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setUser(null);

		try {
			const fetchedUser = await getUserById(id);
			setUser(fetchedUser);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<h2>Fetch User Details by ID</h2>
				<div className={styles.inputGroup}>
					<label>User ID</label>
					<input
						type="text"
						name="id"
						value={id}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" className={styles.button}>
					Get User
				</button>
			</form>
			{error && <p className={styles.error}>{error}</p>}
			{user && (
				<div className={styles.userDetails}>
					<p>
						<strong>ID:</strong> {user.id}
					</p>
					<p>
						<strong>Username:</strong> {user.username}
					</p>
					<p>
						<strong>Password:</strong> {user.password}
					</p>
					<p>
						<strong>Roles:</strong> {user.roles}
					</p>
				</div>
			)}
		</div>
	);
};

export default UserDetails;