
export const InputCard = ({ card_number, id, handleCheckboxChange, isChecked }) => {

    return (
        <div className={`checkbox ${isChecked ? ' selected' : ''}`}>
            <input type="checkbox" name={"card"} id={id} checked={isChecked} value={card_number}
                onChange={handleCheckboxChange}
            />
            <label htmlFor={id} className="checkmark">{card_number}</label>
        </div>
    )
}
