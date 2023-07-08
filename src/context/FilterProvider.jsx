import { createContext, useState } from "react";
import PropTypes from 'prop-types'

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        month: "January",
        creditCard: "",
    })

    return (
        <FilterContext.Provider value={{filters,setFilters}} >
            {children}
        </FilterContext.Provider>
    )
}

//Agregando proptypes a TransactionProvider
FilterProvider.propTypes = {
    children: PropTypes.node.isRequired
}