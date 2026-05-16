import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            const loginData = {
                ...action.payload, 
                isAuthenticated: true
            };
            localStorage.setItem("adminUser", JSON.stringify(loginData));
            return {
                ...state,
                loginData
            };
        case "LOGOUT":
            localStorage.removeItem("adminUser");
            return {
                ...state,
                adminUser: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const storedData = JSON.parse(localStorage.getItem("adminUser"));
    const isExpired = storedData && Date.now() > storedData.expiry;

    const [state, dispatch] = useReducer(authReducer, {
        adminUser: !isExpired ? storedData?.user : null,
        isAuthenticated: !isExpired && !!storedData?.user,
    });

    const login = (loginResponse) => {
        dispatch({ type: "LOGIN", payload: loginResponse });
    };

    const logout = useCallback((logout_type) => {
        handleLogout(logout_type)
        dispatch({ type: "LOGOUT" });
    }, []);


    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
