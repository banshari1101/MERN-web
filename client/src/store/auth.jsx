import { createContext, useContext, useEffect, useState } from "react";

const URL = "http://localhost:3000/api/auth/user";
const URL2 = "http://localhost:3000/api/data/service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");
    const [isLoading, setisLoading] = useState([]);
    const [services, setServices] = useState(""); 
    const authorizationToken = `Bearer ${token}`

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            userAuthentication();
        }
    }, [token]);

    const storetokenInLs = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const isLoggedIn = !!token;
    console.log("isLoggedIn:", isLoggedIn);

    const LogoutUser = () => {
        setToken("");
        setUser("");  // Clear user state
        localStorage.removeItem("token");
    };

    const userAuthentication = async () => {
        try {
            setisLoading(true);
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.userData) {
                    setUser(data.userData);
                    setisLoading(false);
                } else {
                    setisLoading(false);
                }
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user data ", error);
        }
    };

    const getServices = async () => {
        try {
            const response = await fetch(URL2, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Received services data:', data);
                if (Array.isArray(data.msg)) {
                    setServices(data.msg); 
                } else {
                    console.error("Expected an array of services inside `msg` but got:", data.msg);
                }
            } else {
                console.error("Response not ok", response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getServices();
    }, []);

    return (
        <AuthContext.Provider value={{ storetokenInLs, isLoggedIn, LogoutUser, user, services , authorizationToken , isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}; 

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
};

