import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [userLogued, setUserLogued] = useState({});

    return (
        <AppContext.Provider
            value={
                {
                    userLogued, setUserLogued
                }
            }>
            {children}
        </AppContext.Provider>
    )
}
