import { useContext, useState } from "react";
import { TransactionContext } from "../context/GlobalController";

export default function AddRecord() {
    const [concept, setConcept] = useState("")
    const [quantity, setQuantity] = useState(0)

    const { transactions , addTransaction } = useContext(TransactionContext);

    function submitTransaction(e) { 
        e.preventDefault();
        console.log(transactions);
        // Creating a new transaction object
        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            concept,
            quantity: +quantity
        }
    }
    return (
      <div>
          <h3>Add new transaction</h3>
          <form id="form" onSubmit={submitTransaction}>
              <div className="form-control">
                  <label htmlFor="text">Text</label>
                  <input value={concept} onChange={e=>setConcept(e.target.value)} type="text" id="text" placeholder="Enter text..." />
              </div>
              <div className="form-control">
                  <label htmlFor="quantity">Amount  <br /> ( negative - expense || positive - income)  </label>
                  <input value={quantity} onChange={e=>setQuantity(e.target.value)} type="number" id="quantity" placeholder="-123 || 123" />
              </div>
              <button type="submit" className="btn">Add</button>
          </form>
          
    </div>
  )
}
