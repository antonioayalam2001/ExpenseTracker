import './App.css'
import AddRecord from './components/AddRecord'
import Card from './components/Card'
import { Header } from './components/Header'
import Income from './components/Income'
import TransactionList from './components/TransactionList'
import { FilterProvider } from './context/FilterProvider'
import { SettingsProvider } from './context/SettingsProvider'
import TransactionProvider from './context/TransactionProvider'

function App() {
  function clearLocalStorage() {
    localStorage.clear()
  }
  return (
    <>
      <div>
        {/* <Card /> */}
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
        <button onClick={clearLocalStorage}>Clear</button>
      </div>
    </>
  )
}

export default App
