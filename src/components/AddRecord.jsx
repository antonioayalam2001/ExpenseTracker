import { useContext, useState } from "react";
import { TransactionContext } from "../context/GlobalController";

export default function AddRecord() {
    const [concept, setConcept] = useState("")
    const [quantity, setQuantity] = useState(0)
    // Iniciando fecha con el dia de hoy
    const [fecha, setFecha] = useState("")
    const [checked, setChecked] = useState(true)

    const { addTransaction } = useContext(TransactionContext);

    function submitTransaction(e) {
        e.preventDefault();

        const inputDate = fecha.split("-").reverse()

        const formattedDate = new Date(`${inputDate[1]}-${inputDate[0]}-${inputDate[2]}`)
        const date = new Date(formattedDate)

        if (concept.trim() === "" || quantity.trim() === "" || date.toLocaleString().trim() === "Invalid Date") {
            alert("Please enter a valid concept and amount")
            return false
        }
        // Creating a new transaction object
        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            concept,
            date: {
                fullDate: date.toLocaleString(),
                day: date.getDate(), // del 1 al 31
                month: date.getMonth() , // de 0 a 11
            },
            quantity: +quantity,
            9765: checked
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
                    <input value={concept} onChange={e => setConcept(e.target.value)} type="text" id="text" placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="quantity">Cantidad<br /> ( negative - expense || positive - income)  </label>
                    <input value={quantity} onChange={e => setQuantity(e.target.value)} type="number" id="quantity" placeholder="-123 || 123" />
                </div>
                <div className="form-control">
                    <label htmlFor="date">Fecha de Compra: </label>
                    <input min={"2023-01-01"} value={fecha} onChange={e => setFecha(e.target.value)} type="date" id="date" placeholder="" />
                </div>
                <button type="submit" className="btn">Add</button>
                <div className="checkbox">
                    <input type="checkbox" name="card_number" id="checkbox-rect1" checked={checked} value={"9765"}
                        onChange={() => setChecked(!checked)} 
                    />
                    <label htmlFor="checkbox-rect1" className="checkmark">9765</label>
                </div>
            </form>

        </div>
    )
}
