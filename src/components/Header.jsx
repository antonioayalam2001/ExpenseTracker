import { useState } from "react"
import PopUpForm from "./PopUpForm"

export const Header = () => {

  const [showForm, setShowForm] = useState(false)

  function showConfig() {
    setShowForm(!showForm)
  }

  return (
    <div className="header">
      <h1 >Expense Tracker</h1>
      <button className="config__button" onClick={showConfig}>
        <span className="material-symbols-outlined">settings</span>
      </button>
      {showForm && (<PopUpForm showConfig={showConfig} />)}
    </div>
  )
}
