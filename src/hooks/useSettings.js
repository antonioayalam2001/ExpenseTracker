import { useEffect, useReducer } from "react";
import { SettingsReducer } from "../context/SettingsReducer";

function init() {
    /* +++++++++++++++++++++++++++++++++++
    Function inicializadora de nuestro todos (estado del Reducer)
    ++++++++++++++++++++++++++++++++++++*/
    return JSON.parse(localStorage.getItem('settings')) || {
        cards: [],
        color: "#fb2a2a"
    };
}
export function useSettings(initialState = {
    //Almacena los limites de cada tarjeta
    cards: [],
    color: "#fb2a2a"
}) {
    const [settings, dispatch] = useReducer(SettingsReducer, initialState, init);
    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings));
        return () => { }
    }, [settings])

    const addCard = (card) => {
        dispatch({
            type: "ADD_CARD",
            payload: card
        })
    }
    const deleteCard = (id) => {
        dispatch({
            type: "DELETE_CARD",
            payload: id
        })
    }
    const changeColor = (color) => {
        dispatch({
            type: "CHANGE_COLOR",
            payload: color
        })
    }
    return {
        settings,
        addCard,
        deleteCard,
        changeColor
    }
}