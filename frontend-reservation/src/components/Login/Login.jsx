import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../api";
import styles from "./Login.module.css";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await loginUser({ username, password });
			toast.success("Login successful!", response);
			navigate("/reservations"); // Redirect to reservation form
		} catch (error) {
			toast.error("Login failed. Please check your credentials.");
		}
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleLogin} className={styles.form}>
				<h2>Login</h2>
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
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className={styles.button}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;