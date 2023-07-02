import { useContext, useState } from "react";
import { TransactionContext } from "../context/GlobalController";

export default function AddRecord() {
    const [concept, setConcept] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [fecha, setFecha] = useState("")

    const { addTransaction } = useContext(TransactionContext);

    function submitTransaction(e) { 
        e.preventDefault();
        // Validating the form
        const date = new Date(fecha).toLocaleDateString();
        console.log(date);
        if (concept.trim() === "" || quantity.trim() === "" || date.trim() === "Invalid Date") { 
            alert("Please enter a valid concept and amount")
            return false
        }
        // Creating a new transaction object
        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            concept,
            date,
            quantity: +quantity
        }
        // Adding the transaction to the state
        addTransaction(newTransaction);
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
                  <label htmlFor="quantity">Cantidad<br /> ( negative - expense || positive - income)  </label>
                  <input value={quantity} onChange={e=>setQuantity(e.target.value)} type="number" id="quantity" placeholder="-123 || 123" />
              </div>
              <div className="form-control">
                  <label htmlFor="date">Fecha de Compra: </label>
                  <input value={fecha} onChange={e=>setFecha(e.target.value)} type="date" id="quantity" placeholder="" />
              </div>
              <button type="submit" className="btn">Add</button>
          </form>
          
    </div>
  )
}
