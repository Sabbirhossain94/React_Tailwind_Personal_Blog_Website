import { createContext, useContext } from "react";

const SessionContext = createContext(null);

export const SessionProvider = ({ children, session }) => (
    <SessionContext.Provider value={session}>
        {children}
    </SessionContext.Provider>
);

export const useSessionContext = () => useContext(SessionContext);