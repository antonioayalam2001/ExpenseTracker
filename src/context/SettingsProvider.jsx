import { createContext } from "react";
import { useSettings } from "../hooks/useSettings";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const { settings, addCard, deleteCard, changeColor } = useSettings();

    return (
        <SettingsContext.Provider value={{ settings, addCard, deleteCard, changeColor }}>
            {children}
        </SettingsContext.Provider>
    )
}