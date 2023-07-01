import './App.css'
import AddRecord from './components/AddRecord'
import Balance from './components/Balance'
import { Header } from './components/Header'
import Income from './components/Income'
import TransactionList from './components/TransactionList'
import TransactionProvider from './context/GlobalController'

function App() {
  return (
    <>
      <div>
        <Header />
        <div className="container">
          <TransactionProvider>
            <Balance />
            <Income />
            <TransactionList />
            <AddRecord />
          </TransactionProvider>
        </div>
      </div>
    </>
  )
}

export default App
