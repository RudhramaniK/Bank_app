import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AccountManagement = ({ updateBalance }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = location.state || {};
  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    if (amount) {
      const newBalance = account.balance + parseFloat(amount);
      updateBalance(account.id, newBalance);
      alert(`Deposited $${amount}. New balance: $${newBalance.toFixed(2)}`);
      navigate('/home');
    } else {
      alert('Please enter an amount to deposit.');
    }
  };

  const handleWithdraw = () => {
    if (amount) {
      const amountToWithdraw = parseFloat(amount);
      if (amountToWithdraw > account.balance) {
        alert('Insufficient balance.');
      } else {
        const newBalance = account.balance - amountToWithdraw;
        updateBalance(account.id, newBalance);
        alert(`Withdrew $${amount}. New balance: $${newBalance.toFixed(2)}`);
        navigate('/home');
      }
    } else {
      alert('Please enter an amount to withdraw.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Manage Account</h2>
      <h3>Account Holder: {account.name}</h3>
      <h4>Current Balance: ${account.balance.toFixed(2)}</h4>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleWithdraw}>Withdraw</button>
      <button onClick={() => navigate('/home')}>Back to Home</button>
    </div>
  );
};

export default AccountManagement;
