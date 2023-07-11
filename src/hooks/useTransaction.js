import { useEffect, useReducer } from "react";
import { TransactionReducer } from "../context/TransacionReducer"

function init() {
  /* +++++++++++++++++++++++++++++++++++
  Function inicializadora de nuestro todos (estado del Reducer)
  ++++++++++++++++++++++++++++++++++++*/
  return JSON.parse(localStorage.getItem('transactions')) || [];
}

export function useTransaction(initialState = [{
  id: 0,
  concept: "",
  amount: 0,
  date: "",
}]) {

  const [transactions, dispatch] = useReducer(TransactionReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    return () => {
    }
  }, [transactions])


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

  const clearTransactions = () => {
    dispatch({
      type: "REMOVE_ALL",
    })
  }

  return {
    transactions,
    addTransaction,
    clearTransactions,
    deleteTransaction,
  }
}
