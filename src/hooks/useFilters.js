import { useContext } from "react";
import { FilterContext } from "../context/FilterProvider";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
  "October", "November", "December"]
export function useFilters() {
    const { filters, setFilters } = useContext(FilterContext);

    const filterDebts = (debts) => {
        return debts.filter(debt => debt.date.month === months.indexOf(filters.month)  )
    }

    return {
        filters,
        setFilters,
        filterDebts,
    }
}