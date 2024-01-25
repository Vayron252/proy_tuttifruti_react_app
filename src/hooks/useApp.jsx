import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

export const useApp = () => {
    const { userLogued, setUserLogued } = useContext(AppContext);

    return {
        userLogued, setUserLogued
    }
}
