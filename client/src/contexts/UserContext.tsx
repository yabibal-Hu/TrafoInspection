import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define UserContext Type
interface UserContextType {
  username: string;
  setUsername: (name: string) => void;
  role: string;
  setRole: (role: string) => void;
  logout: () => void; // Added logout function
}

// Create Context with Default Values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom Hook to Use Context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Provider Component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Load from session storage on initial render
  const [username, setUsername] = useState<string>(
    () => sessionStorage.getItem("username") || ""
  );
  const [role, setRole] = useState<string>(
    () => sessionStorage.getItem("role") || ""
  );

  // Save to session storage whenever username or role changes
  useEffect(() => {
    sessionStorage.setItem("username", username);
  }, [username]);

  useEffect(() => {
    sessionStorage.setItem("role", role);
  }, [role]);

  // Logout function to clear username & role from state and session storage
  const logout = () => {
    setUsername("");
    setRole("");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
  };

  return (
    <UserContext.Provider
      value={{ username, setUsername, role, setRole, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
