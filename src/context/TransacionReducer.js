export const initialState = {
    transactions: [{
        id: 1,
        concept: "Flower",
        quantity: -20
    },
    {
        id: 3,
        concept: "Flowers",
        quantity: 20
    },
    ]
}

export const TransactionReducer = (state, action) => { 
    switch (action.type) {
        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        case "DELETE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }
        default:
            return state;
    }
}