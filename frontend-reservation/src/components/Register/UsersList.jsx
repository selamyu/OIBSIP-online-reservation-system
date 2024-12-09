import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUser } from "../../api";
import styles from "./UsersList.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUserForm from "./EditUserForm";

const UsersList = () => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [editingUser, setEditingUser] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await getAllUsers(page, size);
				setUsers(response.data.content);
				setTotalPages(response.data.totalPages);
			} catch (error) {
				setError("Failed to fetch users.");
			}
		};

		fetchUsers();
	}, [page, size]);

	const handleDelete = async (userId) => {
		try {
			const confirm = window.confirm(
				"Are you sure you want to delete this user?"
			);
			if (!confirm) return;
			await deleteUser(userId);
			toast.success("User deleted successfully");
			setUsers(users.filter((user) => user.id !== userId));
		} catch (error) {
			toast.error("Failed to delete user.");
		}
	};

	const handleEdit = (user) => {
		setEditingUser(user);
	};

	const handleUpdate = async (updatedUser) => {
		try {
			const response = await updateUser(updatedUser.id, updatedUser);
			setUsers(
				users.map((user) =>
					user.id === updatedUser.id ? response.data : user
				)
			);
			setEditingUser(null);
		} catch (error) {
			setError("Failed to update user.");
		}
	};

	const handlePreviousPage = () => {
		setPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	const handleNextPage = () => {
		setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
	};

	const handleSizeChange = (e) => {
		setSize(Number(e.target.value));
		setPage(0);
	};

	return (
		<div className={styles.container}>
			<h2>All Users</h2>
			{error && <p className={styles.error}>{error}</p>}
			{users.length === 0 && !error && (
				<p>Sorry but no user is registered</p>
			)}
			{users.length > 0 && (
				<>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>User ID</th>
								<th>Username</th>
								<th>Password</th>
								<th>Roles</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.username}</td>
									<td>{user.password}</td>
									<td>{user.roles}</td>
									<td className={styles.actions}>
										<button
											className={styles.editButton}
											onClick={() => handleEdit(user)}
										>
											Edit
										</button>
										<button
											className={styles.deleteButton}
											onClick={() =>
												handleDelete(user.id)
											}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className={styles.pagination}>
						<button
							onClick={handlePreviousPage}
							disabled={page === 0}
						>
							Previous
						</button>
						<span>
							Page {page + 1} of {totalPages}
						</span>
						<button
							onClick={handleNextPage}
							disabled={page === totalPages - 1}
						>
							Next
						</button>
					</div>
					<div className={styles.pageSize}>
						<label htmlFor="pageSize">Items per page:</label>
						<select
							id="pageSize"
							value={size}
							onChange={handleSizeChange}
						>
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={50}>50</option>
						</select>
					</div>
				</>
			)}
			<ToastContainer />
			{editingUser && (
				<EditUserForm
					user={editingUser}
					onUpdate={handleUpdate}
					onClose={() => setEditingUser(null)}
				/>
			)}
		</div>
	);
};

export default UsersList;
