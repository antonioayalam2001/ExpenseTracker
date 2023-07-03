import { useContext, useEffect, useState } from "react"
import { TransactionContext } from "../context/GlobalController"

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
  "October", "November", "December"]

export default function Income() {
  const { transactions } = useContext(TransactionContext)
  const [month, setMonth] = useState("January")
  const [primerPago, setPrimerPago] = useState({mes: "", cantidad: 0})
  const [segundoPago, setSegundoPago] = useState({mes: "", cantidad: 0})
  const fechaDeCorte9765 = 13;
  useEffect((() => {
    //Calculando el total de gasto para el mes actual
    const indexOfSelectedMonth = months.indexOf(month);

    const firstTotalMonth = transactions.filter(transaction => {
      return transaction.quantity > 0 && transaction.date.day < fechaDeCorte9765 && transaction.date.month === indexOfSelectedMonth
    }).reduce((acc, transaction) => (acc += transaction.quantity), 0)
    //Obteniendo el mes que se paga
    const monthToPay = months.indexOf(month) + 1 === 12 ? 0 : months.indexOf(month) + 1;

    setPrimerPago({mes: months[monthToPay], cantidad: firstTotalMonth})

    const secondTotalMonth = transactions.filter(transaction => {
      return transaction.quantity > 0 && transaction.date.day > fechaDeCorte9765 && transaction.date.month === indexOfSelectedMonth
    }).reduce((acc, transaction) => (acc += transaction.quantity), 0)

    const monthToPaySecond = months.indexOf(month) + 2 === 12 ? 0 : months.indexOf(month) + 2;
    setSegundoPago({mes: months[monthToPaySecond], cantidad: secondTotalMonth})

  }), [month, transactions,])

  return (
    <>
      <div className="form-control">
        <label htmlFor="month_select">Select a Month</label>
        <select name="months" id="month_select" onChange={e => setMonth(e.target.value)} value={month}>
          <option value="">--Please choose an option--</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>

      </div>
      <div className="inc-exp-container">
        <div>
          <h4>{ primerPago.mes}</h4>
          <p id="money-plus" className="money plus">{ primerPago.cantidad}</p>
        </div>
        <div >
          <h4>{ segundoPago.mes}</h4>
          <p id="money-minus" className="money minus">{ segundoPago.cantidad}</p>
        </div>
      </div>
    </>
  )
}
