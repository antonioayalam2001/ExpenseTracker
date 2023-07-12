import Swal from 'sweetalert2'

export default function Card({ id, fecha_corte, card_number, deleteCard }) {
  function formatCardNumber(card) {
    let cardNumber = card.split('')
    if (cardNumber.length <= 4) {
      for (let i = 0; i < 12; i++) {
        if (i % 4 === 0 && i !== 0) cardNumber.unshift(' ')
        cardNumber.unshift('*')
      }
      return cardNumber.join('')
    }
    const cardNumberFormated = cardNumber.map((number, index) => {
      if (index > 11) {
        return number
      } else {
        if (index % 4 === 0 && index !== 0) { return ` *` }
        return '*'
      }
    })
    return cardNumberFormated.join('')
  }

  function removeCard() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esta accion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'Tu tarjeta ha sido eliminada.',
            'success'
          )
          deleteCard(id)
        }
      })
  }

  return (
    <div className='card' >
      <div className='card__header'>
        <h4 className='card__title'>{formatCardNumber(card_number)}</h4>
        <p className='card_limit'>Fecha de Corte : {fecha_corte}</p>
      </div>
      <div className='card__options'>
        <button className='card__btn' onClick={removeCard}>x</button>
      </div>
    </div>
  )
}
