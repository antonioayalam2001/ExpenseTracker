import { createContext } from "react";
import PropTypes from 'prop-types'
import { useTransaction } from "../hooks/useTransaction";

export const TransactionContext = createContext();

export default function TransactionProvider({ children }) {
    const { state,
        addTransaction,
        deleteTransaction } = useTransaction(); 

  return (
      <TransactionContext.Provider value={{
          transactions: state.transactions,
          addTransaction,
          deleteTransaction
      }}>
          {children}
        </TransactionContext.Provider>
  )
}

//Agregando proptypes a TransactionProvider
TransactionProvider.propTypes = {
    children: PropTypes.node.isRequired
}