import { useContext } from "react";

const DataContext = useContext();

export const DataProvider = ({ children }) => {

    

  return <DataContext.provider value={{}}>{children}</DataContext.provider>;
};
