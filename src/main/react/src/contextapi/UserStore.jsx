import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

const UserStore = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedError = localStorage.getItem("error");
    if (storedError) {
      navigate("/error", { state: { error: parseInt(storedError) } });
    }
  }, [navigate]);

  return (
    <UserContext.Provider value={{ error, setError }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
