import { useState } from "react"

export function useForm(initialFormValue = {}) {
    const [form, setForm] = useState(initialFormValue)

    const handleChangeForm = (e) => {
        const { target, target: { name } } = e
        const value = target.value
        if (target.type === 'checkbox' && target.checked === true) {
            setForm({ ...form, [name]: value })
            return
        }
        console.log(name);
        console.log(value);
        setForm({ ...form, [name]: value })
    }

    return {
        form,
        setForm,
        handleChangeForm
    }
}