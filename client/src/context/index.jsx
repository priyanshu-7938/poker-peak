import { createContext, useContext, useState } from "react";

const thisContext = createContext();

export default function ContextProvierAllOver({ children }) {
  const [userData, setUserData] = useState();

  return (
    <thisContext.Provider
      value={{
        userData,
        setUserData
      }}
    >
      {children}
    </thisContext.Provider>
  );
}

export const useTheContext = () => {
  return useContext(thisContext);
};
