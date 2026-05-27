import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const userData = action.payload;

      localStorage.setItem("adminUser", JSON.stringify(userData));

      return {
        ...state,
        adminUser: userData,
        isAuthenticated: true,
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

  const [state, dispatch] = useReducer(authReducer, {
    adminUser: storedData || null,
    isAuthenticated: !!storedData,
    isAdmin : storedData?.role == "ADMIN"
  });

  const login = (loginResponse) => {
    dispatch({ type: "LOGIN", payload: loginResponse });
  };

  const logout = useCallback((logout_type) => {
    // handleLogout(logout_type);
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
