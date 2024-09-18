import { useState } from "react";
import signImage from "../assets/sign.png"; 
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:3000/api/auth/register";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';


export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });
    const navigate = useNavigate();
    
    const { storetokenInLs } = useAuth();

    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

   const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(user);

    try {
    const response = await fetch (URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const res_data = await response.json();
    console.log("res from server", res_data);

    if(response.ok) {
        storetokenInLs(res_data.token);
        setUser({username: "", email: "", phone: "", password: ""});
        toast.success("Registration successful")
        navigate("/");
    }
    else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
    }
    } catch (error) {
        console.error("register error", error);
    }
  };

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img
                                    src={signImage}
                                    alt="Sign in"
                                    width="550"
                                    height="550"
                                />
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Registration form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="username"
                                            id="username"
                                            required
                                            placeholder="Enter your username"
                                            autoComplete="off"
                                            value={user.username}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            className="email"
                                            id="email"
                                            required
                                            placeholder="Enter your email"
                                            autoComplete="off"
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            className="phone"
                                            id="phone"
                                            required
                                            placeholder="Enter your phone"
                                            autoComplete="off"
                                            value={user.phone}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="password"
                                            id="password"
                                            required
                                            placeholder="Enter your password"
                                            autoComplete="off"
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">
                                        Register Now
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
