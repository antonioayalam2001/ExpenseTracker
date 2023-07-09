import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionProvider";
import { useForm } from "../hooks/useForm";
import { SettingsContext } from "../context/SettingsProvider";
import { InputCard } from "./InputCard";

function initDate() {
    const date = new Date(window.Date.now()).toLocaleDateString().split("/")
    //Dando formato a la fecha
    const year = date[2]
    const month = date[1].length === 1 ? `0${date[1]}` : date[1]
    const day = date[0].length === 1 ? `0${date[0]}` : date[0]
    return `${year}-${month}-${day}`
}

export default function AddRecord() {

    const { addTransaction } = useContext(TransactionContext);
    const { settings: { cards } } = useContext(SettingsContext)
    const { form: { concept, quantity, date: formDate, card }, handleChangeForm } = useForm({
        concept: "",
        quantity: 0,
        date: initDate(),
    });

    //Obteniendo fecha actual para colocar en el formulario
    function submitTransaction(e) {
        e.preventDefault();
        const date = new Date(formDate);
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
                day: date.getDate() + 1, // del 1 al 31
                month: date.getMonth(), // de 0 a 11
            },
            quantity: +quantity,
            card: card
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
                    <input name="concept" value={concept} onChange={handleChangeForm} type="text" id="text" placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="quantity">Cantidad<br /> </label>
                    <input name="quantity" value={quantity} onChange={handleChangeForm} type="number" id="quantity" placeholder="-123 || 123" />
                </div>
                <div className="form-control">
                    <label htmlFor="date">Fecha de Compra: </label>
                    <input name="date" min={"2023-01-01"} value={formDate} onChange={handleChangeForm} type="date" id="date" placeholder="" />
                </div>
                <button type="submit" className="btn">Add</button>
                <div className="checkbox_wrapper">
                    {cards.map((card) => (
                        <InputCard key={card.id} card_number={card.card_number} id={card.id} handleChangeForm={handleChangeForm} />
                    ))
                    }
                </div>
            </form>

        </div>
    )
}
