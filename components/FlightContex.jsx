// FlightContext.jsx
import { createContext, useContext, useState } from "react";

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <FlightContext.Provider value={{ 
      selectedFrom, setSelectedFrom,
      selectedTo, setSelectedTo,
      startDate, setStartDate,
      endDate, setEndDate
    }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => useContext(FlightContext);
