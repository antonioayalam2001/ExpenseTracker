import { useContext } from "react";
import { FilterContext } from "../context/FilterProvider";
import { months } from "../helpers/constants";

export function useFilters() {
    const { filters, setFilters } = useContext(FilterContext);

    const filterDebts = (debts) => {
        return debts.filter(debt => debt.date.month === months.indexOf(filters.month) && (
            debt.card === filters.card
        ))
    }

    return {
        filters,
        setFilters,
        filterDebts,
    }
}