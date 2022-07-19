import { createAction, createReducer } from '@reduxjs/toolkit'

interface SubTransaction {
  title: string
}

interface Transaction {
  subTransactions: SubTransaction[]
  active: number
}

interface TransactionState {
  pendingTransaction?: Transaction
}

const initialState: TransactionState = {
  pendingTransaction: undefined,
}

export const addTransaction = createAction<Transaction>('TRANSACTION:ADD')

const transactionReducer = createReducer(initialState, (builder) => {
  builder.addCase(addTransaction, (state, action) => {
    state.pendingTransaction = action.payload
  })
})

export default transactionReducer
