import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

// Create the context
export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

//   fetching doctors from tbl_doctors table
  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      });
  }, []);

  const info = {
    name: "POK",
    doctors,
    setDoctors,
    loading,
  };

  return (
    <Context.Provider value={info}>
      {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ContextProvider;
