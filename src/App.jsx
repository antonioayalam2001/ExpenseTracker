import './App.css'
import AddRecord from './components/AddRecord'
import { Header } from './components/Header'
import Income from './components/Income'
import TransactionList from './components/TransactionList'
import { FilterProvider } from './context/FilterProvider'
import TransactionProvider from './context/TransactionProvider'
import { useTransaction } from './hooks/useTransaction'

function App() {

  return (
    <>
      <div>
        <Header />
        <div className="container">
          <TransactionProvider>
            <FilterProvider>
              <Income />
              <TransactionList />
              <AddRecord />
            </FilterProvider>
          </TransactionProvider>
        </div>
      </div>
    </>
  )
}

export default App
