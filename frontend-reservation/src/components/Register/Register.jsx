import React, { useState } from "react";
import { registerUser } from "../../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Register.module.css";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [roles, setRoles] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const validatePassword = (password) => {
		const regex =
			/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
		return regex.test(password);
	};

	const handleRegister = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match!");
			return;
		}

		if (!validatePassword(password)) {
			toast.error(
				"Password must contain at least one digit, one lowercase, one uppercase, one special character, and no whitespace, and be at least 8 characters long."
			);
			return;
		}

		try {
			const response = await registerUser({ username, password, roles });
			toast.success("User registered successfully!", response);
		} catch (error) {
			if (error.response && error.response.status === 409) {
				toast.error("Username is already taken.");
			} else {
				toast.error("Registration failed. Please try again later.");
			}
		}
	};

	const toggleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleRegister} className={styles.form}>
				<h2>Register</h2>
				<div className={styles.inputGroup}>
					<label>Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Password</label>
					<input
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Confirm Password</label>
					<input
						type={showPassword ? "text" : "password"}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<div className={styles.checkboxGroup}>
					<label>
						<input
							type="checkbox"
							checked={showPassword}
							onChange={toggleShowPassword}
						/>
						Show Password
					</label>
				</div>
				<div className={styles.inputGroup}>
					<label>Roles</label>
					<input
						type="text"
						value={roles}
						onChange={(e) => setRoles(e.target.value)}
						required
					/>
				</div>

				<button type="submit" className={styles.button}>
					Register
				</button>
			</form>
			<ToastContainer />
		</div>
	);
};

export default Register;
