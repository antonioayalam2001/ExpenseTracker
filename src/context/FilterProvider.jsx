import { createContext, useState } from "react";
import PropTypes from 'prop-types'
import { months } from "../helpers/constants";

export const FilterContext = createContext();

const getCurrentMonth = () => {
    return months[new Date(window.Date.now()).getMonth()]
}


export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        month: getCurrentMonth(),
        card: "general",
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