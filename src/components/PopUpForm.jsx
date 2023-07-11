import { useContext, useEffect, useRef } from 'react'
import { SettingsContext } from '../context/SettingsProvider'
import { useForm } from '../hooks/useForm'
import Card from './Card'

export default function PopUpForm({ showConfig }) {
    const { form, handleChangeForm } = useForm({
        card_number: "",
        fecha_corte: "",
    })
    const { settings, addCard, deleteCard } = useContext(SettingsContext)
    const outerContainerRef = useRef()
    const handleAddCard = () => {
        const card = {
            id: Math.floor(Math.random() * 100000000),
            card_number: form.card_number,
            fecha_corte: form.fecha_corte,
        }
        addCard(card)
        showConfig()
    }
    useEffect(() => {
        const outerContainer = outerContainerRef.current
        outerContainer.classList.add("active")
        const listener = (event) => {
            if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27 || event.target === outerContainer) {
                outerContainer.classList.add("animate__animated", "animate__fadeOut")
                setTimeout(() => {
                    showConfig()
                }, 900)

            }
        }
        window.addEventListener("keydown", listener)
        window.addEventListener("click", listener)
        return () => {
            window.removeEventListener("keydown", listener)
            window.removeEventListener("click", listener)
        }
    })

    //Listener para que al presionar esc o se de click afuera  se cierre el popup

    return (
        <div className="outer_container" ref={outerContainerRef}>
            <div className="form_container">
                <div className="inputs_container">
                    <div className="input_container">
                        <label htmlFor="card_number">Tarjeta</label>
                        <input
                            value={form.card_number}
                            name="card_number" type="text" id="card_number" className="swal2-input" placeholder="Tarjeta"
                            onChange={handleChangeForm} min={4} max={16}
                        />
                    </div>
                    <div className="input_container">
                        <label htmlFor="fecha_corte">Fecha</label>
                        <input
                            value={form.fecha_corte}
                            name="fecha_corte" type="number" min="1" max="31" id="fecha_corte" className="swal2-input" placeholder="Dia de corte"
                            onChange={handleChangeForm}
                        />
                    </div>
                    <button onClick={() => { handleAddCard() }} className="button_form" >Agregar</button>
                </div>
                {/* <div className="input_container">
            <label htmlFor="color">Color</label>
            <input name="color" type="color" id="color" className="color_select" value={settings.color} onChange={handleChangeForm} />
          </div> */}
                {/* Tarjetas disponibles */}
                <div className="cards_container">
                    <h3>Tarjetas disponibles</h3>
                    <div className="cards">
                        {settings.cards?.map(card => (
                            <Card key={card.id}  {...card} deleteCard={deleteCard} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
