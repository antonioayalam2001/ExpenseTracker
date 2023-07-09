import { useContext } from "react"
import Swal from "sweetalert2"
import { SettingsContext } from "../context/SettingsProvider"

export const Header = () => {
  const { settings, addCard, changeColor } = useContext(SettingsContext)
  function showConfig() {
    Swal.fire({
      title: 'Configuracion',
      html: `
      <div class = "sweet_alert_container">
      <div class = "inputs_container">
        <div class = "input_container">
             <label for="card_number">Tarjeta</label>             
            <input type="number" id="card_number" class="swal2-input" placeholder="Tarjeta">
        </div>
        <div class = "input_container">
          <label label for="fecha_corte">Fecha de corte</label>             
          <input type="number" min="1" max="31" id="fecha_corte" class="swal2-input" placeholder="Dia de corte">
        </div>
        </div>
        <div class = "input_container">
              <label for="color">Color</label>
            <input type="color" id="color" class="color_select" value=${settings.color}>
        </div>
      </div>
      `,
      confirmButtonText: 'Guarda',
      focusConfirm: false,
      preConfirm: () => {
        const cardNumber = Swal.getPopup().querySelector('#card_number').value
        const limitPayDay = Swal.getPopup().querySelector('#fecha_corte').value
        const color = Swal.getPopup().querySelector('#color').value
        if (!limitPayDay) {
          Swal.showValidationMessage(`Please enter limitPayDay`)
        }
        return {
          fecha_corte: limitPayDay,
          card_number: cardNumber,
          color: color
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        addCard({
          id: Math.floor(Math.random() * 100000000),
          fecha_corte: result.value.fecha_corte,
          card_number: result.value.card_number
        })
        changeColor(result.value.color)
        Swal.fire({
          title: 'Configuracion guardada',
          icon: 'success',
          timer: 1500
        })
      }
    })
  }
  return (
    <div className="header">
      <h1 style={{ "--main-color": settings.color }}>Expense Tracker</h1>
      <button onClick={showConfig}>
        <span className="material-symbols-outlined">settings</span>
      </button>
    </div>
  )
}
