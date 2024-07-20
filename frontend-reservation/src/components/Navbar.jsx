import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<ul className={styles.navList}>
				<li>
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? styles.active : ""
						}
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/register"
						className={({ isActive }) =>
							isActive ? styles.active : ""
						}
					>
						Register
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/login"
						className={({ isActive }) =>
							isActive ? styles.active : ""
						}
					>
						Login
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/allUsers"
						className={({ isActive }) =>
							isActive ? styles.active : ""
						}
					>
						Users List
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/user/:id"
						className={({ isActive }) =>
							isActive ? styles.active : ""
						}
					>
						User Details
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/reservations"
						className={({ isActive }) =>
							isActive ? styles.active : ""
						}
					>
						Reservations
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/cancel"
						className={({ isActive }) =>
							isActive ? styles.active : ""
						}
					>
						Cancel Reservation
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
