import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionProvider";
import { months } from "../helpers/constants";
import { useFilters } from "../hooks/useFilters";
import { SettingsContext } from "../context/SettingsProvider";

export default function Income() {
  const { transactions } = useContext(TransactionContext)
  const { settings: { cards } } = useContext(SettingsContext)
  const { filters, setFilters, filterDebts } = useFilters();

  const [primerPago, setPrimerPago] = useState({ mes: "", cantidad: 0 })
  const [segundoPago, setSegundoPago] = useState({ mes: "", cantidad: 0 })

  const handleMonthChange = ({ target }) => {
    setFilters({ ...filters, month: target.value })
  }
  const handleLimit = ({ target }) => {
    setFilters({ ...filters, card: target.value })
  }
  useEffect((() => {
    let fecha_corte = 0;
    if (filters.card === 'general') {
      fecha_corte = 10
    } else {
      fecha_corte = cards.find(card => card.card_number === filters.card).fecha_corte;
    }

    const transactionsFiltered = filterDebts(transactions)

    //Calculando el total de gasto para el mes actual
    const indexOfSelectedMonth = months.indexOf(filters.month);

    const firstTotalMonth = transactionsFiltered.filter(transaction => {
      return transaction.quantity > 0 && transaction.date.day < fecha_corte && transaction.date.month === indexOfSelectedMonth
    }).reduce((acc, transaction) => (acc += transaction.quantity), 0)
    //Obteniendo el mes que se paga
    const monthToPay = months.indexOf(filters.month) + 1 === 12 ? 0 : months.indexOf(filters.month) + 1;

    setPrimerPago({ mes: months[monthToPay], cantidad: firstTotalMonth })

    const secondTotalMonth = transactionsFiltered.filter(transaction => {
      return transaction.quantity > 0 && transaction.date.day > fecha_corte && transaction.date.month === indexOfSelectedMonth
    }).reduce((acc, transaction) => (acc += transaction.quantity), 0)
    
    let monthToPaySecond = "";
    if (filters.month === "December") {
      monthToPaySecond = 0 + 1;
    } else { 
      monthToPaySecond = months.indexOf(filters.month) + 2 ;
    }

    setSegundoPago({ mes: months[monthToPaySecond], cantidad: secondTotalMonth })

  }), [transactions, filters.month, cards, filters.card])

  return (
    <>
      <div className="select-form-control">
        <label htmlFor="month_select">Select a Month</label>
        <select className="select-styled" name="months" id="month_select" onChange={handleMonthChange} value={filters.month}>
          <option value="">--Please choose an option--</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <div className="select-form-control">
        <label htmlFor="card_select">Select a Card</label>
        <select className="select-styled" name="card" id="card_select" onChange={handleLimit} value={filters.card}>
          {/* Mapear las tarjetas que vienen de la configuración */}
          {cards.map((card, index) => (
            <option key={index} value={card.card_number}>{card.card_number}</option>
          ))}
          <option key={"general"} value={"general"}>{"general"}</option>
        </select>
      </div>
      {
        filters.card === "general" ?
        <div className="inc-exp-container">
        <div>
          <h4>Total</h4>
          <p id="money-plus" className="money plus">{primerPago.cantidad + segundoPago.cantidad}</p>
        </div>
      </div>
          :
          <div className="inc-exp-container">
          <div>
            <h4>{primerPago.mes}</h4>
            <p id="money-plus" className="money plus">{primerPago.cantidad}</p>
          </div>
          <div >
            <h4>{segundoPago.mes}</h4>
            <p id="money-minus" className="money minus">{segundoPago.cantidad}</p>
          </div>
        </div>

      }
    </>
  )
}
