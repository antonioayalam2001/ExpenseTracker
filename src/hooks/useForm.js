import { useState } from "react"

export function useForm(initialFormValue = {}) {
    const [form, setForm] = useState(initialFormValue)

    const handleChangeForm = (e) => {
        const { target, target: { name } } = e
        const value = target.value
        if (target.checked === false && target.name === 'card') {
            setForm({ ...form, [name]: '' })
            return
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const resetForm = () => {
        setForm(initialFormValue)
    }

    return {
        form,
        setForm,
        resetForm,
        handleChangeForm,
    }
}