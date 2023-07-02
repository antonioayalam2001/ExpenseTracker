import { useContext } from "react";
import { TransactionContext } from "../context/GlobalController";

export default function TransactionList() {
  const { transactions, deleteTransaction } = useContext(TransactionContext) ;
  return (
    <div>
      <h3>History</h3>
      <ul id="list" className="list">
        {
          transactions.map(transaction => (
            <li className={transaction.quantity < 0 ? 'minus' : 'plus'} key={transaction.id}>
              {transaction.concept} <span>${transaction.quantity}</span><button
                onClick={() => deleteTransaction(transaction.id)}
                className="delete-btn">x</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
