import { useState } from "react";
import loginImage from "../assets/login.png";
const URL = "http://localhost:3000/api/auth/login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { z } from 'zod';
import { toast } from 'react-toastify';

// Define the validation schema 
const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 characters long" })
        .max(255, { message: "Email must not be more than 255 characters long" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(7, { message: "Password must be at least 7 characters long" })
        .max(1024, { message: "Password can't be more than 1024 characters" })
});

export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { storetokenInLs } = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.email || !user.password) {
            toast.error("Please enter both email and password");
            return;
        }
        try {
            loginSchema.parse(user);
        } catch (error) {
            if (error instanceof z.ZodError) {
                toast.error(error.errors.map(err => err.message).join("\n"));
                return;
            }
        }

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();
            console.log("res from server", res_data);

            if (response.ok) {
                toast.success("Login successful");
                storetokenInLs(res_data.token);
                setUser({ email: "", password: "" });
                navigate("/");
            } else if (response.status === 422) {
                toast(res_data.message);
            } else {
                toast.error(res_data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred during login");
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image reg-img">
                                <img
                                    src={loginImage}
                                    alt="loginImage"
                                    width="550"
                                    height="550"
                                />
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Login form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleInput}
                                            autoComplete="off"
                                            placeholder="email"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleInput}
                                            autoComplete="off"
                                            placeholder="password"
                                        />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">
                                        Login Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};
