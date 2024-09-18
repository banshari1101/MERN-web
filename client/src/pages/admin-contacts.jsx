import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

export const AdminContacts = () => {
    const [contactData, setContactData] = useState([]);
    const { authorizationToken } = useAuth();

    const getContactData = async (token) => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/contacts', {
                method: "GET",
                headers: {
                    "Authorization": authorizationToken,
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log("contact data ", data);
                setContactData(data); 
            }
        } catch (error) {
            console.error(error);
        }
    };


    const deletecontactById = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": authorizationToken,
                },
            });
            if (response.ok) {
                getContactData();
                toast.success("Deleted successful");
            }
            else {
                toast.error("Failed to delete");
            } 
        } catch (error) {
            console.error("Er ror deleting contact:", error);
        }
    }

    useEffect(() => {
        if (authorizationToken) {
            getContactData(authorizationToken);
        }
    }, [authorizationToken]); // Ensure that authorizationToken is not empty

    return (
        <>
            <section className="admin-contact-section">
                <h1>Admin Contacts Data</h1>
                <div className="container admin-users">
                    {contactData.map((curContact, index) => {
                        const { username, email, message, _id } = curContact; // Corrected from curContactData to curContact
                        return (
                            <div key={_id}>
                                <p>{username}</p>
                                <p>{email}</p>
                                <p>{message}</p>
                                <button className="btn" onClick={() => deletecontactById(_id)}>Delete</button>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
};
 