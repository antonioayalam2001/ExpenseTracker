import { useState } from "react"

export const InputCard = ({ card_number, id, handleChangeForm }) => {
    const [checked, setChecked] = useState(false)
    return (
        <div className="checkbox">
            <input type="checkbox" name={"card"} id={id} checked={checked} value={card_number}
                onClick={() => setChecked(!checked)} onChange={handleChangeForm}
            />
            <label htmlFor={id} className="checkmark">{ card_number}</label>
        </div>
    )
}
