import { useReducer } from "react";
import { TransactionReducer, initialState } from "../context/TransacionReducer"

export function useTransaction() {
  
  const [state, dispatch] = useReducer(TransactionReducer, initialState);
  const addTransaction = (transaction) => { 
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction
    })
  }
  const deleteTransaction = (id) => { 
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id
    })
  }

  return {
    state,
    addTransaction,
    deleteTransaction,
  }
}
