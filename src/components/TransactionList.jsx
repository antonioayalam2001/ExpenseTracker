import { useContext } from "react";
import { TransactionContext } from "../context/TransactionProvider";
import { useFilters } from "../hooks/useFilters";

export default function TransactionList() {
  const { clearTransactions } = useContext(TransactionContext);
  function removeAll(e) {
    e.preventDefault();
    clearTransactions();
  }
  const { transactions, deleteTransaction } = useContext(TransactionContext);

  const { filterDebts } = useFilters();

  const filteredTransactions = filterDebts(transactions);
  return (
    <div className="records__list">
      <h3>History</h3>
      <ul id="list" className="list">
        {
          filteredTransactions.map(transaction => (
            <li className={transaction.quantity < 0 ? 'minus' : 'plus'} key={transaction.id}>
              {transaction.concept}
              <span>${transaction.quantity}</span>
              <span>{transaction.date.day} / {transaction.date.month + 1}</span>
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="delete-btn">x</button>
            </li>
          ))
        }
      </ul>
      <button className="btn" onClick={removeAll} >Eliminar Todo</button>
    </div>
  )
}
