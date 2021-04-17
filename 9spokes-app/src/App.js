import React from 'react';
import './App.css';
import data from './data/data.json';

function App() {
  const { data: dataList } = data;

  // calculate total revenue
  const totalRevenue = dataList
    .filter(({ account_category }) => account_category === 'revenue')
    .reduce((accumulator, { total_value }) => {
      return accumulator + total_value;
    }, 0);

  // calculate total expense
  const totalExpense = dataList
    .filter(({ account_category }) => account_category === 'expense')
    .reduce((accumulator, { total_value }) => {
      return accumulator + total_value;
    }, 0);

  // calculate gross profit margin
  const grossProfitMargin = dataList
    .filter(
      ({ account_type, value_type }) =>
        account_type === 'sales' && value_type === 'debit'
    )
    .reduce((accumulator, { total_value }) => {
      return accumulator + total_value;
    }, 0);

  // calculate net profit margin
  const netProfitMargin = (totalExpense - totalRevenue) / totalRevenue;

  // calculate assets
  const totalAssets =
    dataList
      .filter(
        ({ account_category, value_type, account_type }) =>
          account_category === 'assets' &&
          value_type === 'debit' &&
          (account_type === 'current' ||
            'bank' ||
            'current_accounts_receivable')
      )
      .reduce((accumulator, { total_value }) => {
        return accumulator + total_value;
      }, 0) -
    dataList
      .filter(
        ({ account_category, value_type, account_type }) =>
          account_category === 'assets' &&
          value_type === 'credit' &&
          (account_type === 'current' ||
            'bank' ||
            'current_accounts_receivable')
      )
      .reduce((accumulator, { total_value }) => {
        return accumulator + total_value;
      }, 0);

  // calculate liabilities
  const totalLiabilities =
    dataList
      .filter(
        ({ account_category, value_type, account_type }) =>
          account_category === 'liability' &&
          value_type === 'credit' &&
          (account_type === 'current' || 'current_accounts_payable')
      )
      .reduce((accumulator, { total_value }) => {
        return accumulator + total_value;
      }, 0) -
    dataList
      .filter(
        ({ account_category, value_type, account_type }) =>
          account_category === 'liability' &&
          value_type === 'debit' &&
          (account_type === 'current' || 'current_accounts_payable')
      )
      .reduce((accumulator, { total_value }) => {
        return accumulator + total_value;
      }, 0);

  // calculate working capital ratio
  const workingCapitalRatio = totalAssets / totalLiabilities;

  return (
    <div className="App">
      <header className="App-header">
        <h1>$ ./myChallenge</h1>
        <p>Revenue: {`$${totalRevenue.toLocaleString().split('.')[0]}`}</p>
        <p>Expenses: {`$${totalExpense.toLocaleString().split('.')[0]}`}</p>
        <p>
          Gross Profit Margin: {`${Math.round(grossProfitMargin * 10) / 10}%`}
        </p>
        <p>Net Profit Margin: {`${(netProfitMargin * 100).toFixed()}%`}</p>
        <p>
          Working Capital Ratio: {`${(workingCapitalRatio * 100).toFixed()}%`}
        </p>
      </header>
    </div>
  );
}

export default App;
