import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage'

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [userLogued, setUserLogued] = useLocalStorage('data_user_logued', {});
    
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
