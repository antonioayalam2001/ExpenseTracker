
export function SettingsReducer(state, action) {
    switch (action.type) {
        case "ADD_CARD":
            return {
                ...state,
                cards: [...state.cards, action.payload]
            }
        case "DELETE_CARD":
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.payload)
            }
        case "CHANGE_COLOR":
            return {
                ...state,
                color: action.payload
            }
        default:
            return state;
    }
}