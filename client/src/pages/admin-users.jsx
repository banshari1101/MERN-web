import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom"

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllusersData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/users', {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(`users ${data}`);
            setUsers(data);
        } catch (error) {
            console.log('Fetching users failed:', error);
        }
    };
    const deleteUsers = async (id) => {
        try {
        const response = await fetch(`http://localhost:3000/api/admin/users/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: authorizationToken,
            },
        });
        const data = await response.json();
            console.log(`users after delete ${data}`);
            if (response.ok) {
                getAllusersData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllusersData();
    }, [authorizationToken]);

    return (
        <>
        <section className="admin-user-section">
            <div className="container">
                <h1>Admin Users Data</h1>
            </div>
            <div className="container admin-users">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((curUser, index) => (
                <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td><Link to={`/admin/users/${curUser._id}/edit`}><button>Edit</button></Link></td>
                    <td><button onClick={() => deleteUsers(curUser._id) }>Delete</button></td>
                </tr>
                ))}
                </tbody>
            </table>
            </div>
        </section>
        </>
    );
};
