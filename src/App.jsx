import './App.css'
import AddRecord from './components/AddRecord'
import { Header } from './components/Header'
import Income from './components/Income'
import TransactionList from './components/TransactionList'
import { FilterProvider } from './context/FilterProvider'
import { SettingsProvider } from './context/SettingsProvider'
import TransactionProvider from './context/TransactionProvider'

function App() {

  return (
    <>
      <div>
        <TransactionProvider>
          <FilterProvider>
            <SettingsProvider>
              <Header />
              <div className="container">
                <Income />
                <TransactionList />
                <AddRecord />
              </div>
            </SettingsProvider>
          </FilterProvider>
        </TransactionProvider>
      </div>
    </>
  )
}

export default App
