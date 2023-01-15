import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    inputAmount: '',
    inputTitle: '',
    transactionsList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const UpdateTransactions = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({transactionsList: UpdateTransactions})
  }

  addTransaction = event => {
    event.preventDefault()
    const {inputAmount, inputTitle, optionId} = this.state

    const TypeOf = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )
    const {displayText} = TypeOf

    const newTransaction = {
      id: v4(),
      amount: parseInt(inputAmount),
      title: inputTitle,
      type: displayText,
    }

    this.setState(preState => ({
      transactionsList: [...preState.transactionsList, newTransaction],
      inputAmount: '',
      inputTitle: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  addAmount = event => {
    this.setState({inputAmount: event.target.value})
  }

  addTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  addType = event => {
    this.setState({optionId: event.target.value})
  }

  toGetExpanses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  toGetIncome = () => {
    const {transactionsList} = this.state

    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText)
        incomeAmount += eachTransaction.amount
    })
    return incomeAmount
  }

  toGetBalance = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    let incomeAmount = 0
    let balanceAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {inputAmount, inputTitle, optionId, transactionsList} = this.state
    const balanceAmount = this.toGetBalance()
    const incomeAmount = this.toGetIncome()
    const expensesAmount = this.toGetExpanses()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1>Hi,Richard</h1>
            <p>
              Welcome back to your<span>Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />

          <div className="transaction-details">
            <form className="transaction-form" onSubmit={this.addTransaction}>
              <h1>Add Transaction</h1>
              <label htmlFor="title">Title</label>

              <input
                id="title"
                type="text"
                className="input-label"
                onChange={this.addTitle}
                value={inputTitle}
                placeholder="Title"
              />

              <label htmlFor="income">Amount</label>
              <input
                id="income"
                className="input-label"
                onChange={this.addAmount}
                value={inputAmount}
                placeholder="AMOUNT"
              />

              <label htmlFor="submit">Type</label>

              <select id="submit" onChange={this.addType} value={optionId}>
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>

              <button type="submit">Add</button>
            </form>
            <div className="history-transactions">
              <div className="transactions-table-container">
                <h1>History</h1>
                <li className="table-header">
                  <p>Title</p>
                  <p>Amount</p>
                  <p>Type</p>
                  <p>{}</p>
                </li>
                <ul>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      transactionDetails={eachTransaction}
                      key={eachTransaction.id}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
