import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [userLogued, setUserLogued] = useState({
        iduser: 0, name: '', lastname: '', nickname: '', idroom: 0, host: false
    });


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
